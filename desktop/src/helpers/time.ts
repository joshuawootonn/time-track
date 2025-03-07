import moment from 'moment'

export function minutesToString(minutes: number | null): string {
  if (minutes === 0 || !minutes) return `0:00`

  const isNegative = minutes < 0 ? true : false
  const m = Math.abs(Math.floor(minutes % 60))

  // wack fix for floor taking -1.5 to -2. use ceil for numbers less than 0
  const hoursString = Math.floor(Math.abs(minutes / 60))
  const minutesString = m < 10 && m > -10 ? `0` + m : m

  return `${isNegative ? `-` : ``}${hoursString}:${minutesString}`
}

export function minutesToDecimals(minutes: number | null): number {
  if (minutes === 0 || !minutes) return 0

  return minutes / 60
}

export function currentRoundedTime(): moment.Moment {
  return moment()
    .minute(Math.round(moment().minute() / 15) * 15)
    .second(0)
}

/**
 * makes sure minutes are rounded to 15 min increments
 * @param minutes
 * @returns
 */
export function minutesRoudedTime(minutes: number): number {
  return Math.round(minutes / 15) * 15
}
