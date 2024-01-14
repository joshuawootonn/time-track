import { Component } from 'react'
import { shiftSelectors } from '~/store/selectors'
import { connect } from 'react-redux'
import moment from 'moment'
import { ArrowForward } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import ShiftCRUDmodal from '~/containers/Shift/shiftCRUDmodal'
import domain from '~/constants/domains'
import { analyzeActions } from '~/store/actions'

export class CrewMemberShiftCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
  }

  // select = (object) => {
  //   this.props.select(domain.SHIFT, object)
  // }

  handleEditButtonClick = async (shift) => {
    console.log('handleEditButtonClick')
    console.log(shift)
    Promise.all([this.props.select(domain.SHIFT, shift)]).then(() => {
      this.setState({ isModalOpen: true })
    })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { shifts, day, selectedCrew } = this.props

    return (
      <div className="flex flex-col items-center gap-4 m-4 ">
        {this.state.isModalOpen && <ShiftCRUDmodal onClose={this.closeModal} />}
        {Object.values(shifts)
          .filter((shift) => {
            const shiftDay = moment
              .utc(shift.clockInDate)
              .local()
              .format('YYYY-MM-DD')
            return (
              shiftDay === day && shift.employee.crew.name === selectedCrew.name
            )
          })
          .map((shift) => (
            <div
              key={shift.id}
              className="md:max-w-[900px] w-full flex flex-col flex-auto bg-slate-50 border border-slate-100 rounded-md p-4 md:p-8"
            >
              <div className="text-xl font-bold flex flex-row justify-between">
                <div>
                  {shift.employee.firstName + ' ' + shift.employee.lastName}
                </div>
                <Button
                  variant="contained"
                  onClick={() => this.handleEditButtonClick(shift.id)}
                >
                  Edit
                </Button>
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
                    {shift.lunch && (
                      <>
                        <div className="flex flex-col justify-end text-gray-700">
                          Lunch
                        </div>
                        <div className="flex flex-col justify-end text-gray-700">
                          {shift.lunch}m
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
                    {Math.round(
                      moment
                        .duration(
                          moment
                            .utc(shift.clockOutDate)
                            .local()
                            .diff(moment.utc(shift.clockInDate).local()),
                        )
                        .asHours(),
                    )}{' '}
                    hours)
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
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shifts: shiftSelectors.getAllShiftsInLastMonth(state),
})

const mapDispatchToProps = (dispatch) => ({
  select: (domain, payload) => dispatch(analyzeActions.select(domain, payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CrewMemberShiftCard)
