import moment from 'moment'
import { minutesRoudedTime } from './time'

export function getShiftDuration(clockIn: moment.Moment, clockOut: moment.Moment): {
    lengthRounded: number
    duration: moment.Duration
    clockIn: moment.Moment
} {
    const clockInFormatted = moment(clockIn.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS))
    const clockOutFormatted = moment(clockOut.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS))

    const duration = moment.duration(clockOutFormatted.diff(clockInFormatted))
    const lengthRounded = minutesRoudedTime(duration.asMinutes())

    return { lengthRounded, duration, clockIn: clockInFormatted }
}
