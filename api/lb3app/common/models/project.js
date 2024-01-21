var loopback = require('loopback')

var baseError = {
  name: 'Error',
  status: 400,
  message: 'Message',
}

module.exports = (Project) => {
  Project.summary = async (startTime, endTime, isActive) => {
    var app = require('../../server/server')

    if (!startTime) {
      return {
        ...baseError,
        message: 'startTime is required in the queryString as UTC date',
      }
    }
    if (!endTime) {
      return {
        ...baseError,
        message: 'endTime is required in the queryString as UTC date',
      }
    }

    if (isActive === undefined || typeof isActive !== 'boolean') {
      return {
        ...baseError,
        message:
          'isActive is required in the queryString as 0 (false) or 1 (true)',
      }
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
    return newProjects
  }

  // Used for getting all the data for the Project tab of foreman view
  Project['foreman-summary'] = async (isActive) => {
    var app = require('../../server/server')

    var today = new Date(Date.now())
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)
    var twoSundaysAgo = new Date(today.valueOf())
    twoSundaysAgo.setDate(twoSundaysAgo.getDate() - twoSundaysAgo.getDay() - 7)

    if (isActive === undefined || typeof isActive !== 'boolean') {
      return {
        ...baseError,
        message:
          'isActive is required in the queryString as 0 (false) or 1 (true)',
      }
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
      var projectTaskIds = []
      var minutesWorkedLastWeek = 0
      var minutesWorkedThisWeek = 0
      var minutesWorkedYesterday = 0
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
        minutesWorkedLastWeek: minutesWorkedLastWeek,
        minutesWorkedThisWeek: minutesWorkedThisWeek,
        minutesWorkedYesterday: minutesWorkedYesterday,
      }
    })

    const startOfThisWeek = new Date(twoSundaysAgo.valueOf() + 6048e5)

    var startOfYesterday = new Date(today.valueOf() - 864e5)

    shifts.map((shift) => {
      if (shift.clockInDate >= startOfThisWeek) {
        if (shift.clockInDate >= startOfYesterday) {
          shift.activities().map((activity) => {
            try {
              newProjects.find((newProject) =>
                newProject.projectTaskIds.includes(activity.projectTaskId),
              ).minutesWorkedYesterday += activity.length
            } catch (error) {
              console.log('activity not found:')
              console.log(activity)
            }
          })
        } else {
          shift.activities().map((activity) => {
            try {
              newProjects.find((newProject) =>
                newProject.projectTaskIds.includes(activity.projectTaskId),
              ).minutesWorkedThisWeek += activity.length
            } catch (error) {
              console.log('activity not found:')
              console.log(activity)
            }
          })
        }
      } else {
        shift.activities().map((activity) => {
          try {
            newProjects.find((newProject) =>
              newProject.projectTaskIds.includes(activity.projectTaskId),
            ).minutesWorkedLastWeek += activity.length
          } catch (error) {
            console.log('activity not found:')
            console.log(activity)
          }
        })
      }
    })

    newProjects.forEach((project) => {
      project.minutesWorkedThisWeek += project.minutesWorkedYesterday
      delete project.projectTaskIds
    })

    // for debugging hours being categorized incorrectly
    // console.log('two sundays ago: '+twoSundaysAgo)
    // console.log('start of this week: ' +startOfThisWeek)
    // console.log('start of yesterday: '+startOfYesterday)
    // console.log('today: '+today)

    return newProjects
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
