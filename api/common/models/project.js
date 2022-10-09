var loopback = require("loopback");

var baseError = {
  name: "Error",
  status: 400,
  message: "Message"
};

module.exports = Project => {
  Project.summary = async (startTime, endTime, isActive, cb) => {
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

    if (isActive === undefined || typeof isActive !== "boolean") {
      return cb({
        ...baseError,
        message:
          "isActive is required in the queryString as 0 (false) or 1 (true)"
      });
    }

    const projects = await Project.find({
      include: { projectTasks: "activities" },
      where: {
        and: [
          { date: { gt: startTime } },
          { date: { lt: endTime } },
          { isActive }
        ]
      }
    });

    const newProjects = projects.map(project => {
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
                  return total + currentActivity.length;
                }, 0)
          };
        },
        { totalActual: 0, totalEstimate: 0 }
      );
      return {
        date: project.date,
        id: project.id,
        isActive: project.isActive,
        name: project.name,
        totalEstimate,
        totalActual
      };
    });
    // console.log(newProjects);
    return cb(null, newProjects);
  };

  Project.remoteMethod("summary", {
    http: {
      path: "/summary",
      verb: "get"
    },
    accepts: [
      { arg: "startTime", type: "date" },
      { arg: "endTime", type: "date" },
      { arg: "isActive", type: "boolean" }
    ],
    returns: { arg: "projects", type: "string" }
  });
};
