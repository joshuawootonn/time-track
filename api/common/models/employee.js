var loopback = require('loopback')

var baseError = {
  name: 'Error',
  status: 400,
  message: 'Message',
}

module.exports = (Employee) => {
  Employee.clockin = async (employeeId, cb) => {
    var app = require('../../server/server')
    const Shift = app.models.Shift
    if (!employeeId) {
      return cb({
        ...baseError,
        message: 'employeeId is a required body value',
      })
    }

    const lastShift = await Shift.findOne({
      order: 'id DESC',
      where: { employeeId: employeeId },
    })
    const employee = await Employee.findOne({ where: { id: employeeId } })

    if (lastShift && !lastShift.clockOutDate) {
      return cb({ ...baseError, message: 'Employee already has open shift' })
    } else if (!employee) {
      return cb({ ...baseError, message: "Employee doesn't exist" })
    } else if (employee.isWorking) {
      return cb({ ...baseError, message: 'Employee is Working' })
    }

    // check that employee !isWorking and doesn't have an open shift
    const s = await Shift.create({
      clockInDate: new Date().toUTCString(),
      employeeId: employeeId,
    })
    console.log(employee, s)
    await employee.updateAttribute('isWorking', true)

    cb(null, `${employee.firstName} ${employee.lastName} is clocked in`)
  }

  Employee.clockout = async (employeeId, shift, activities, cb) => {
    var app = require('../../server/server')
    const Shift = app.models.Shift
    const Activity = app.models.Activity
    if (!employeeId) {
      return cb({
        ...baseError,
        message: 'employeeId is a required body value',
      })
    }
    const lastShift = await Shift.findOne({
      order: 'id DESC',
      where: { employeeId: employeeId },
    })
    const employee = await Employee.findOne({ where: { id: employeeId } })

    if (lastShift && lastShift.clockOutDate) {
      return cb({ ...baseError, message: 'Employee has no open shift' })
    } else if (!employee) {
      return cb({ ...baseError, message: "Employee doesn't exist" })
    } else if (!employee.isWorking) {
      return cb({ ...baseError, message: 'Employee is not Working' })
    }

    for (const activity of activities) {
      const a = await Activity.create({
        ...activity,
        shiftId: lastShift.id,
      })
      console.log('Created activity: ', a)
    }

    // check that employee !isWorking and doesn't have an open shift
    const s = await lastShift.updateAttributes({
      ...lastShift,
      // this used to be generated on the server but this has the edge case of the employee clocking out
      // to quickly and maybe not getting their 3 minutes. no it is passed on the shift instead
      // the primary case of this ternary can be the only case in the next release
      clockOutDate: shift.clockOutDate
        ? shift.clockOutDate
        : new Date().toUTCString(),
      length: shift.length,
      lunch: shift.lunch,
    })
    console.log('Updated shift: ', s)
    const e = await employee.updateAttribute('isWorking', false)
    console.log('Updated employee: ', e)
    cb(null, `${employee.firstName} ${employee.lastName} is clocked out`)
  }

  Employee.remoteMethod('clockin', {
    accepts: { arg: 'employeeId', type: 'number' },
    returns: { arg: 'msg', type: 'string' },
  })
  Employee.remoteMethod('clockout', {
    accepts: [
      { arg: 'employeeId', type: 'number' },
      { arg: 'shift', type: 'any' },
      { arg: 'activities', type: 'any' },
    ],
    returns: { arg: 'msg', type: 'string' },
  })
}
