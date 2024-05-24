import moment from "moment"
import { getShiftDuration } from "./shiftDuration"

function formatMoment(m: moment.Moment | null): string | null {
    if (m == null) {
        return null
    }

    return m.format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
}

describe('getShiftDuration', () => {
    it('returns length 0 and calculatedClockOut `null` when clockOut happens in less than 7:30 minutes since clockIn', () => {
        const { clockIn, lengthRounded: length, duration } = getShiftDuration(
            moment('2021-12-31 13:10:23.012'),
            moment('2021-12-31 13:17:45')
        )

        expect(length).toBe(0);
        expect(duration.toISOString()).toEqual('PT7M22S')
        expect(formatMoment(clockIn)).toBe('2021-12-31T13:10:23.000')
    })

    it('returns length 15 and calculatedClockOut as clockIn + length when clockOut happens after exactly 7:30 minutes since clockIn', () => {
        const { clockIn, lengthRounded: length, duration } = getShiftDuration(
            moment('2021-12-31 13:10:23.012'),
            moment('2021-12-31 13:17:53.012')
        )

        expect(length).toBe(15)
        expect(duration.toISOString()).toEqual('PT7M30S')
        expect(formatMoment(clockIn)).toBe('2021-12-31T13:10:23.000')
    })

    it('returns length as a 15 minutes blocks and calculatedClockOut as clockIn + length when clockOut happens after 7:30 minutes since clockIn', () => {
        const { clockIn, lengthRounded: length, duration } = getShiftDuration(
            moment('2021-12-31 13:10:23.012'),
            moment('2021-12-31 16:17:54')
        )

        // 3 hr and 7:31+ => 180 + 15
        expect(length).toBe(180 + 15)
        expect(duration.toISOString()).toEqual('PT3H7M31S')
        expect(formatMoment(clockIn)).toBe('2021-12-31T13:10:23.000')
    })
})


