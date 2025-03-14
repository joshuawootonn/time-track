const loopback = require('loopback')

const baseError = {
  name: 'Error',
  status: 400,
  message: 'Message',
}

module.exports = (Employee) => {
  Employee.clockin = async (employeeId, time) => {
    const app = require('../../server/server')
    const helpers = require('./helpers')

    const Shift = app.models.Shift
    if (!employeeId) {
      return {
        ...baseError,
        message: 'employeeId is a required body value',
      }
    }

    const lastShift = await Shift.findOne({
      order: 'id DESC',
      where: { employeeId: employeeId },
    })
    const employee = await Employee.findOne({ where: { id: employeeId } })

    if (lastShift && !lastShift.clockOutDate) {
      return { ...baseError, message: 'Employee already has open shift' }
    } else if (!employee) {
      return { ...baseError, message: "Employee doesn't exist" }
    } else if (employee.isWorking) {
      return { ...baseError, message: 'Employee is Working' }
    }

    // check that employee !isWorking and doesn't have an open shift
    const shift = await Shift.create({
      clockInDate: helpers.calculateEffectiveClockInTime(time).toUTCString(),
      employeeId: employeeId,
    })
    console.log(employee, shift)
    await employee.updateAttribute('isWorking', true)

    return {
      message: `${employee.firstName} ${employee.lastName} is clocked in`,
    }
  }

  Employee.clockout = async (employeeId, shift, activities) => {
    const app = require('../../server/server')
    const Shift = app.models.Shift
    const Activity = app.models.Activity
    if (!employeeId) {
      return {
        ...baseError,
        message: 'employeeId is a required body value',
      }
    }
    const lastShift = await Shift.findOne({ where: { id: shift.id ?? '' } })
    const employee = await Employee.findOne({ where: { id: employeeId ?? '' } })

    if (lastShift == null) {
      return {
        ...baseError,
        message: `Shift ${shift.id} doesn't exist (employee ID: ${employeeId})`,
      }
    }

    if (lastShift.clockOutDate) {
      return {
        ...baseError,
        message: `Shift ${shift.id} is not open (employee ID: ${employeeId})`,
      }
    }

    if (employee == null) {
      return { ...baseError, message: `Employee ${employeeId} doesn't exist` }
    }

    if (!employee.isWorking) {
      return { ...baseError, message: `Employee ${employeeId} is not Working` }
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

    return {
      message: `${employee.firstName} ${employee.lastName} is clocked out`,
    }
  }

  Employee.remoteMethod('clockin', {
    accepts: [
      { arg: 'employeeId', type: 'number' },
      { arg: 'time', type: 'string' },
    ],
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
