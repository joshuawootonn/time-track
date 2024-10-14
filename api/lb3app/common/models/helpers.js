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
}
