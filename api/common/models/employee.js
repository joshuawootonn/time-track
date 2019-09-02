var loopback = require("loopback");
const moment = require("moment");

var baseError = {
  name: "Error",
  status: 400,
  message: "Message"
};

module.exports = Employee => {
  var app = require("../../server/server");
  const Shift = app.models.Shift;
  const Activity = app.models.Activity;

  Employee.clockin = async (employeeId, cb) => {
    if (!employeeId) {
      return cb({
        ...baseError,
        message: "employeeId is a required body value"
      });
    }

    const lastShift = await Shift.findOne({
      order: { id: "DESC" },
      where: { employeeId: employeeId }
    });
    const employee = await Employee.findOne({ where: { id: employeeId } });

    if (lastShift && !lastShift.clockOutDate) {
      return cb({ ...baseError, message: "Employee already has open shift" });
    } else if (!employee) {
      return cb({ ...baseError, message: "Employee doesn't exist" });
    } else if (employee.isWorking) {
      return cb({ ...baseError, message: "Employee is Working" });
    }

    // check that employee !isWorking and doesn't have an open shift
    const s = await Shift.create({
      clockInDate: new Date().toUTCString(),
      employeeId: employeeId
    });
    console.log(employee, s);
    await employee.updateAttribute("isWorking", true);

    cb(null, `${employee.firstName} ${employee.lastName} is clocked in`);
  };

  Employee.clockout = async (employeeId, shift, activities, cb) => {
    if (!employeeId) {
      return cb({
        ...baseError,
        message: "employeeId is a required body value"
      });
    }

    console.log(employeeId, shift, activities);
    const lastShift = await Shift.findOne({
      order: { id: "DESC" },
      where: { employeeId: employeeId }
    });
    const employee = await Employee.findOne({ where: { id: employeeId } });

    if (lastShift && lastShift.clockOutDate) {
      return cb({ ...baseError, message: "Employee has no open shift" });
    } else if (!employee) {
      return cb({ ...baseError, message: "Employee doesn't exist" });
    } else if (!employee.isWorking) {
      return cb({ ...baseError, message: "Employee is not Working" });
    }
    // activities.forEach( async activity => {
    //   const a = Activity.create({
    //     ...activity
    //   })
    //   console.log('Created activity: ', a);
    // });

    // // check that employee !isWorking and doesn't have an open shift
    // const s = await lastShift.updateAttributes({
    //   clockOutDate: moment().toString(),
    //   length: moment.duration(moment().diff(moment(lastShift.clockInDate))),
    //   lunch: shift.lunch,
    // });
    // console.log('Updated shift: ', s);
    // const e = await employee.updateAttribute("isWorking", false);
    // console.log('Updated employee: ', e);
    cb(null, `${employee.firstName} ${employee.lastName} is clocked in`);
  };

  Employee.remoteMethod("clockin", {
    accepts: { arg: "employeeId", type: "number" },
    returns: { arg: "msg", type: "string" }
  });
  Employee.remoteMethod("clockout", {
    accepts: [
      { arg: "employeeId", type: "number" },
      { arg: "shift", type: "number" },
      { arg: "activities", type: "number" }
    ],
    returns: { arg: "msg", type: "string" }
  });
};
