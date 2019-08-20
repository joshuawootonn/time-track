

export interface ProjectTask extends BaseProjectTask {
  task: BaseTask;
  project: BaseProject
} 

export interface Activity extends BaseActivity {
  shift: BaseShift;
  projectTask: ProjectTask  
}

export interface NoActvities {
  type: 'NoActivities'
}

export interface LoadingActivities {
  type: 'LoadingActivities'
}

export interface None {
  type: 'None'
}

export interface ErrorActivities {
  type: 'ErrorActivities'
}

export type CompositeActivity = { values: Activity[]; type: 'Activites'} | NoActvities | LoadingActivities | None | ErrorActivities;


export interface ActivityState {
  activites: CompositeActivity;
}

export interface State {
  activitySection: ActivityState
}



export interface BaseProjectTask {
  estimateTime: number;
  id: number;
  projectId: number;
  quantity: number;
  taskId: number;
}

export interface BaseProject {
  date: string;
  id: number;
  isActive: number;
  name: string;
}

export interface BaseTask {
  id: number;
  isActive: number;
  name: string;
  subcategoryId: number;
}

export interface BaseEmployee {
  authorityId: number;
  crewId: number;
  firstName: string;
  id: number;
  isEmployed: number;
  isWorking: number;
  lastName:string;
  pin: number;
}

export interface BaseCrew {
  name: string;
  id: number;
}

export interface BaseAuthority {
  type: 'Admin' | 'Employee' | 'Manager';
  id: number;
}


export interface BaseCategory {
  type: string;
  id: number;
}


export interface BaseSubcategory {
  type: string;
  id: number;
  categoryId: number;
}

export interface BaseShift {
  clockInDate: string;
  clockOutDate: string;
  employeeId: number;
  id: number;
  length: number;
  lunch: number;
}


export interface BaseActivity{
  description: string;
  id: number;
  length: number;
  projectTaskId: number;
  shiftId: number;
}