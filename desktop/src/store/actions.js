import * as userActions from './User/actions'
import * as shiftActions from './Shift/actions'
import * as snackActions from './Snack/actions'
import * as employeeActionsJS from './Employee/actions'
import * as employeeActionsTS from './employee.ts'
import * as authorityActions from './Authority/actions'
import * as crewActions from './Crew/actions'
import * as projectActions from './Project/actions'
import * as projectTaskActions from './ProjectTask/actions'
import * as taskActions from './Task/actions'
import * as tradeActions from './Trade/actions'
import * as activityActions from './Activity/actions'
import * as staticActions from './Static/actions'
import * as exportActions from './Export/actions'
import * as analyzeActions from './Analyze/actions'
import * as categoryActions from './Category/actions'
import * as subcategoryActions from './Subcategory/actions'
import * as dimensionActions from './Dimension/actions'
import * as modalActions from './Modal/actions'
import * as genericActions from './Generic/actions'
import * as foremanActions from './Foreman/actions'

const employeeActions = {
  ...employeeActionsJS,
  clockIn: employeeActionsTS.clockIn,
  clockOut: employeeActionsTS.clockOut,
}

export {
  userActions,
  shiftActions,
  snackActions,
  employeeActions,
  authorityActions,
  foremanActions,
  crewActions,
  projectActions,
  projectTaskActions,
  taskActions,
  activityActions,
  staticActions,
  exportActions,
  analyzeActions,
  categoryActions,
  subcategoryActions,
  dimensionActions,
  modalActions,
  genericActions,
  tradeActions,
}
