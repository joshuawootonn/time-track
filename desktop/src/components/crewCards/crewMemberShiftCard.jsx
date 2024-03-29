import { Component } from 'react'
import { shiftSelectors } from '~/store/selectors'
import { connect } from 'react-redux'
import moment from 'moment'
import { ArrowForward } from '@material-ui/icons'

export class CrewMemberShiftCard extends Component {
  render() {
    const { shifts, day, selectedCrew } = this.props
    const filteredShifts = Object.values(shifts).filter((shift) => {
      const shiftDay = moment
        .utc(shift.clockInDate)
        .local()
        .format('YYYY-MM-DD')
      return shiftDay === day && shift.employee.crew.name === selectedCrew.name
    })
    return (
      <div className="flex flex-col items-center gap-4 m-4 ">
        {filteredShifts.length === 0 ? (
          <div>No Shifts found for selected date and crew</div>
        ) : (
          filteredShifts.map((shift) => (
            <div
              key={shift.id}
              className="md:max-w-[900px] w-full flex flex-col flex-auto bg-slate-50 border border-slate-100 rounded-md p-4 md:p-8"
            >
              <div className="text-xl font-bold">
                {shift.employee.firstName + ' ' + shift.employee.lastName}
              </div>
              <div className="py-2 w-full">
                {Object.values(shift.activities).map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex flex-row flex-wrap w-full"
                  >
                    {index == 0 ||
                    !(
                      Object.values(shift.activities).at(index - 1).projectTask
                        .project.name == activity.projectTask.project.name
                    ) ? (
                      <div className="md:grow-1 md:shrink-0 md:basis-1/2 basis-full flex flex-col pt-2 md:pr-4 font-lg font-semibold">
                        {activity.projectTask.project.name}
                      </div>
                    ) : (
                      <div className="md:flex-1 basis-full flex flex-col md:pt-2 "></div>
                    )}
                    <div className="grow-1 shrink-1 md:basis-1/2 basis-full flex justify-between pl-4 md:pl-0 ">
                      <div className="flex flex-col justify-end text-gray-700 font-md">
                        {activity.projectTask.task.name}
                      </div>
                      <div className="flex flex-col justify-end text-gray-700">
                        {Math.floor(activity.length / 60)}h{' '}
                        {String(activity.length % 60)}m
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-row flex-wrap w-full">
                  <div className="md:flex-1 basis-full flex flex-col md:pt-2 "></div>
                  <div className="flex-1 flex justify-between ">
                    {shift.lunch != null && (
                      <>
                        <div className="flex flex-col justify-end text-gray-700">
                          Lunch
                        </div>
                        <div className="flex flex-col justify-end text-gray-700">
                          {Math.floor(shift.lunch / 60)}h{' '}
                          {String(shift.lunch % 60)}m
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-end text-lg ">
                {moment.utc(shift.clockInDate).local().format('h:mm a')}{' '}
                <ArrowForward />{' '}
                {shift.clockOutDate ? (
                  <>
                    {moment.utc(shift.clockOutDate).local().format('h:mm a')} (
                    {Math.floor(shift.length / 60)}h {String(shift.length % 60)}
                    m)
                  </>
                ) : (
                  <>
                    Now (
                    {Math.round(
                      moment
                        .duration(moment.utc().local().diff(shift.clockInDate))
                        .asHours() * 10,
                    ) / 10}{' '}
                    hours)
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shifts: shiftSelectors.getAllShiftsInLastMonth(state),
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CrewMemberShiftCard)
