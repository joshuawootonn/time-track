module.exports = (Activity) => {
  // Activities created without a task (e.g. admin full shift) are assigned
  // their project's 'General' project task. projectId isn't an Activity column,
  // so this reads it from the request body before it gets dropped.
  Activity.beforeRemote('create', async (ctx) => {
    const app = require('../../server/server')
    const helpers = require('./helpers')
    const data = ctx.args.data

    if (!data || data.projectTaskId > 0 || data.projectId == null) {
      return
    }

    const generalTask = await helpers.getGeneralTask(app)

    // if there is no Task named "General" in DB, automatic task insert is impossible
    if (!generalTask) {
      const error = new Error("Task 'General' doesn't exist")
      error.status = 400
      throw error
    }

    const projectTask = await helpers.findOrCreateGeneralProjectTask(
      app,
      data.projectId,
      generalTask,
    )
    data.projectTaskId = projectTask.id
  })
}
