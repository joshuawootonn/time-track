module.exports = {
  calculateEffectiveClockInTime: function (time) {
    if (!time) {
      console.log(
        'calculateEffectiveClockInTime fallback, user time was not provided',
      )
      return new Date()
    }

    const now = new Date()
    const userSelectedTime = new Date(Date.parse(time))

    if (now < userSelectedTime) {
      return userSelectedTime
    }

    return now
  },

  //looks up if a task named 'General' exists in DB
  getGeneralTask: function (app) {
    return app.models.Task.findOne({ where: { name: 'General' } })
  },

  // find the project's 'General' project task, create it if it doesn't exist
  findOrCreateGeneralProjectTask: async function (app, projectId, generalTask) {
    const ProjectTask = app.models.ProjectTask

    //looks up a projectTask for a provided project that has a task 'General'
    const projectTask = await ProjectTask.findOne({
      where: { projectId: projectId, taskId: generalTask.id },
    })
    if (projectTask) {
      return projectTask
    }

    //if none was found, create one for this project
    return ProjectTask.create({ projectId: projectId, taskId: generalTask.id })
  },
}
