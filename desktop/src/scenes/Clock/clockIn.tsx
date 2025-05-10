import { Button, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Picker from 'react-mobile-picker'

import axios from '~/helpers/axios'
import { employeeSelectors } from '~/store/selectors'
import { employeeActions, snackActions } from '~/store/actions'
import Props from '~/containers/Account/accountActionContainer'
import Progress from '~/components/helpers/Progress'

function generateAllTimes(localTime: moment.Moment): {
  allTimes: PickerValue[]
  closestTime: PickerValue
} {
  const allTimes: PickerValue[] = []
  const todayMidnight = moment().local().format(`YYYY-MM-DD`)

  let closestTime = null
  let current = moment(todayMidnight)

  for (let i = 0; i < 96; i++) {
    const currentValue: PickerValue = {
      time: moment.utc(current).format(`YYYY-MM-DDTHH:mm:ssZ`),
      label: moment.utc(current).local().format(`h:mm A`),
    }

    allTimes.push(currentValue)

    if (localTime > moment.utc(currentValue.time).local().add(-15, 'minutes')) {
      closestTime = currentValue
    }

    current = moment(current).add(15, 'minutes')
  }

  if (closestTime == null) {
    closestTime = allTimes[0]
  }

  return { allTimes, closestTime }
}

type PickerValue = {
  // ideally should be moment.Moment, Picker does not support types other than string | number
  time: string

  label: string
}

type Props = {
  currentEmployee: { id: number }
  clockIn: (employeeId: number, time?: string) => Promise<void>
}

function ClockIn({ currentEmployee, clockIn }: Props) {
  const history = useHistory()
  const [currentTime, setCurrentTime] = useState<moment.Moment>(
    moment().local(),
  )
  const [allTimes, setAllTimes] = useState<PickerValue[]>([])
  const [pickerValue, setPickerValue] = useState<PickerValue | null>(null)

  useEffect(() => {
    axios.get('/now').then((response: any) => {
      const { now } = response.data
      const userTime = moment(now).utc().local()

      const { allTimes, closestTime } = generateAllTimes(userTime)
      setAllTimes(allTimes)
      setPickerValue(closestTime)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().local())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  async function submit() {
    await clockIn(currentEmployee.id, pickerValue?.time)
    history.push('/')
  }

  function cancel() {
    history.goBack()
  }

  if (pickerValue == null) {
    return (
      <div className="h-screen">
        <Progress variant="circular" fullWidth fullHeight />
      </div>
    )
  }

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: '100vh' }}
    >
      <Typography
        variant="h3"
        className="headerText"
        style={{ margin: '1rem', textAlign: 'center' }}
      >
        Scheduled Start Time
      </Typography>

      <div
        style={{
          maskImage:
            'linear-gradient(to top, transparent, transparent 5%, white 50%, white 50%, transparent 95%, transparent)',
        }}
      >
        <Picker
          value={pickerValue}
          height={300}
          itemHeight={100}
          onChange={setPickerValue}
          wheelMode="normal"
          style={{
            fontSize: '4rem',
            margin: '1rem',
            maskImage: 'unset',
          }}
        >
          <Picker.Column key={'time'} name={'time'}>
            {allTimes.map((value, i) => (
              <Picker.Item
                key={i}
                value={value.time}
                style={{
                  borderTop: '1px solid #d9d9d9',
                  borderBottom: '1px solid #d9d9d9',
                }}
              >
                {({ selected }) => (
                  <div
                    style={{
                      color: selected ? 'black' : 'gray',
                      fontSize: selected ? 'inherit' : '0.95em',
                      transition: 'ease-in 0.05s',
                    }}
                  >
                    {value.label}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>

      <div className="flex flex-row gap-7" style={{ margin: '2rem' }}>
        <Button
          onClick={submit}
          type="submit"
          color="primary"
          variant="contained"
          style={{ fontSize: '1.5rem' }}
        >
          Clock In
        </Button>
        <Button
          onClick={cancel}
          color="secondary"
          variant="text"
          style={{ fontSize: '1.5rem' }}
        >
          Cancel
        </Button>
      </div>

      <Typography variant="h5" className="p-1">
        Current Time {currentTime.format('h:mm A')}
      </Typography>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clockIn: (employeeId: number, time?: string) => {
      return dispatch(employeeActions.clockIn(employeeId, time))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentEmployee: employeeSelectors.getCurrentEmployee(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClockIn)
