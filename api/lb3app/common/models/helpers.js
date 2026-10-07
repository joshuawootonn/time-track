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

  getGeneralTask: function (app) {
    return app.models.Task.findOne({ where: { name: 'General' } })
  },

  findOrCreateGeneralProjectTask: async function (app, projectId, generalTask) {
    const ProjectTask = app.models.ProjectTask

    const projectTask = await ProjectTask.findOne({
      where: { projectId: projectId, taskId: generalTask.id },
    })
    if (projectTask) {
      return projectTask
    }

    return ProjectTask.create({
      projectId: projectId,
      taskId: generalTask.id,
      quantity: 1,
      estimateTime: 1,
    })
  },
}
