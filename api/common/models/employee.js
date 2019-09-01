var baseError = {
  name: "Error",
  status: 400,
  message: "Message"
};

module.exports = Employee => {
  Employee.clockin = async (employeeId, cb) => {
    var app = require("../../server/server");
    const Shift = app.models.Shift;

    if(!employeeId){ 
      return cb({...baseError, message: "employeeId is a required body value"});
    }

    const lastShift = await Shift.findOne({
      where: { employeeId: employeeId }
    });
    const employee = await Employee.findOne({ where: { id: employeeId } });

    if (lastShift && !lastShift.clockOutDate) {
      return cb({...baseError, message: "Employee already has open shift"});
    } else if(!employee){
      return cb({...baseError, message: "Employee doesn't exist"}); 
    }else if ( employee.isWorking) {
      return cb({...baseError, message: "Employee isWorking"});
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

  Employee.remoteMethod("clockin", {
    accepts: { arg: "employeeId", type: "number" },
    returns: { arg: "msg", type: "string" }
  });
};
