import moment from "moment";
import { minutesRoudedTime, minutesToString } from "./time";

describe('minutesToString', () => {
    test('works', () => expect(minutesToString(10)).toBe('0:10'))
    test('formats minutes if null', () => expect(minutesToString(null)).toBe('0:00'))
    test('formats minutes if 0', () => expect(minutesToString(0)).toBe('0:00'))
    test('formats hours', () => expect(minutesToString(61)).toBe('1:01'))
    test('formats negatives', () => expect(minutesToString(-61)).toBe('-1:01'))
});

describe('minutesRoudedTime', () => {
    test('works', () => {
        const clockInMoment = moment('2024-05-27T07:30:00')
        const clockOutMoment = moment('2024-05-27T07:39:01')

        const shiftDuration = moment.duration(
            clockOutMoment.diff(clockInMoment),
        )

        const length = minutesRoudedTime(Math.floor(shiftDuration.asMinutes()))
        expect(length).toBe(15)
    })
})


