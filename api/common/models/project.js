var loopback = require('loopback')

var baseError = {
  name: 'Error',
  status: 400,
  message: 'Message',
}

module.exports = (Project) => {
  Project.summary = async (startTime, endTime, isActive, cb) => {
    var app = require('../../server/server')

    if (!startTime) {
      return cb({
        ...baseError,
        message: 'startTime is required in the queryString as UTC date',
      })
    }
    if (!endTime) {
      return cb({
        ...baseError,
        message: 'endTime is required in the queryString as UTC date',
      })
    }

    if (isActive === undefined || typeof isActive !== 'boolean') {
      return cb({
        ...baseError,
        message:
          'isActive is required in the queryString as 0 (false) or 1 (true)',
      })
    }

    const projects = await Project.find({
      include: { projectTasks: 'activities' },
      where: {
        and: [
          { date: { gt: startTime } },
          { date: { lt: endTime } },
          { isActive },
        ],
      },
    })

    const newProjects = projects.map((project) => {
      // console.log(project, project.projectTasks)
      const { totalEstimate, totalActual } = project.projectTasks().reduce(
        ({ totalEstimate, totalActual }, currentProjectTask) => {
          return {
            totalEstimate: totalEstimate + currentProjectTask.estimateTime * 60,
            totalActual:
              totalActual +
              currentProjectTask
                .activities()
                .reduce((total, currentActivity) => {
                  return total + currentActivity.length
                }, 0),
          }
        },
        { totalActual: 0, totalEstimate: 0 },
      )
      return {
        date: project.date,
        id: project.id,
        isActive: project.isActive,
        name: project.name,
        totalEstimate,
        totalActual,
      }
    })
    return cb(null, newProjects)
  }

  // Used for getting all the data for the Project tab of foreman view
  Project['foreman-summary'] = async (isActive, cb) => {
    var app = require('../../server/server')

    var today = new Date(Date.now())
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)
    var twoSundaysAgo = new Date(today.valueOf())
    twoSundaysAgo.setDate(twoSundaysAgo.getDate() - twoSundaysAgo.getDay() - 7)

    if (isActive === undefined || typeof isActive !== 'boolean') {
      return cb({
        ...baseError,
        message:
          'isActive is required in the queryString as 0 (false) or 1 (true)',
      })
    }

    const projects = await Project.find({
      where: {
        and: [
          { isActive },
          // { name: 'Office'} // here to limit results for testing
        ],
      },
      include: {
        projectTasks: 'activities',
      },
    })

    var shifts = await app.models.Shift.find({
      where: {
        and: [
          { clockInDate: { gt: twoSundaysAgo } },
          { clockInDate: { lt: today } },
        ],
      },
      include: {
        relation: 'activities',
      },
    })

    var newProjects = projects.map((project) => {
      // console.log(project, project.projectTasks)
      var projectTaskIds = []
      var hoursWorkedLastWeek = 0
      var hoursWorkedThisWeek = 0
      var hoursWorkedYesterday = 0
      const { totalEstimate, totalActual } = project.projectTasks().reduce(
        ({ totalEstimate, totalActual }, currentProjectTask) => {
          projectTaskIds.push(currentProjectTask.id)
          return {
            totalEstimate: totalEstimate + currentProjectTask.estimateTime * 60,
            totalActual:
              totalActual +
              currentProjectTask
                .activities()
                .reduce((total, currentActivity) => {
                  return total + currentActivity.length
                }, 0),
          }
        },
        { totalActual: 0, totalEstimate: 0 },
      )
      return {
        date: project.date,
        id: project.id,
        isActive: project.isActive,
        name: project.name,
        projectTaskIds,
        totalEstimate,
        totalActual,
        hoursWorkedLastWeek,
        hoursWorkedThisWeek,
        hoursWorkedYesterday,
      }
    })

    const startOfThisWeek = new Date(twoSundaysAgo.valueOf() + 6048e5)
    // console.log('start of this week: ' + startOfThisWeek)

    var startOfYesterday = new Date(Date.now() - 864e5)
    startOfYesterday.setMilliseconds(0)
    startOfYesterday.setSeconds(0)
    startOfYesterday.setMinutes(0)
    startOfYesterday.setHours(0)
    // console.log('start of yesterday: ' + startOfYesterday)

    shifts.map((shift) => {
      if (shift.clockInDate >= startOfThisWeek) {
        if (shift.clockInDate >= startOfYesterday) {
          shift.activities().map((activity) => {
            newProjects.find((newProject) =>
              newProject.projectTaskIds.includes(activity.projectTaskId),
            ).hoursWorkedYesterday += activity.length / 60 // convert activity.length to hours
          })
        } else {
          shift.activities().map((activity) => {
            newProjects.find((newProject) =>
              newProject.projectTaskIds.includes(activity.projectTaskId),
            ).hoursWorkedThisWeek += activity.length / 60 // convert activity.length to hours
          })
        }
      } else {
        shift.activities().map((activity) => {
          newProjects.find((newProject) =>
            newProject.projectTaskIds.includes(activity.projectTaskId),
          ).hoursWorkedLastWeek += activity.length / 60 // convert activity.length to hours
        })
      }
    })

    newProjects.forEach((project) => {
      project.hoursWorkedThisWeek += project.hoursWorkedYesterday
      delete project.projectTaskIds
    })

    return cb(null, newProjects)
  }

  Project.remoteMethod('summary', {
    http: {
      path: '/summary',
      verb: 'get',
    },
    accepts: [
      { arg: 'startTime', type: 'date' },
      { arg: 'endTime', type: 'date' },
      { arg: 'isActive', type: 'boolean' },
    ],
    returns: { arg: 'projects', type: 'string' },
  })

  Project.remoteMethod('foreman-summary', {
    http: {
      path: '/foreman-summary',
      verb: 'get',
    },
    accepts: [
      // { arg: "startTime", type: "date" },
      { arg: 'isActive', type: 'boolean' },
    ],
    returns: { arg: 'projects', type: 'string' },
  })
}
