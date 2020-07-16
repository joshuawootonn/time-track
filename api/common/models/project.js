var loopback = require("loopback");

var baseError = {
  name: "Error",
  status: 400,
  message: "Message"
};

module.exports = Project => {
  Project.projectSummary = async (startTime, endTime, cb) => {
    var app = require("../../server/server");

    if (!startTime) {
      return cb({
        ...baseError,
        message: "startTime is required in the queryString as UTC date"
      });
    }
    if (!endTime) {
      return cb({
        ...baseError,
        message: "endTime is required in the queryString as UTC date"
      });
    }

    const projects = await Project.find({include: {projectTasks: 'activities'}, where: {and: [{date: {gt: startTime}}, {date: {lt: endTime}}]}});

    const newProjects = projects.map(project => {
      // console.log(project, project.projectTasks)
      const {totalEstimate, totalActual} = project.projectTasks().reduce(({totalEstimate, totalActual}, currentProjectTask) => {
        return {
          totalEstimate: totalEstimate + currentProjectTask.estimateTime ,
          totalActual: totalActual + currentProjectTask.activities().reduce((total, currentActivity) => {
              return total + currentActivity.length;
            },0)
        }
      }, {totalActual: 0, totalEstimate: 0} )
      return {
        date: project.date,
        id: project.id,
        isActive: project.isActive,
        name: project.name,
        totalEstimate,
        totalActual
      }
    })
    // console.log(newProjects);
    cb(null, newProjects);
  };

  Project.remoteMethod("projectSummary", {
    http: {
      path: '/projectSummary',
      verb: 'get',
    },
    accepts: [{ arg: "startTime", type: "date" },{ arg: "endTime", type: "date" }],
    returns: { arg: "msg", type: "string" }
  });
};
