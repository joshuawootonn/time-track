module.exports = (Activity) => {
  Activity.beforeRemote('create', async (ctx) => {
    const app = require('../../server/server')
    const helpers = require('./helpers')
    const data = ctx.args.data

    if (!data || data.projectTaskId > 0 || data.projectId == null) {
      return
    }

    const generalTask = await helpers.getGeneralTask(app)

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
