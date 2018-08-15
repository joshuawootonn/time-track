import { schema } from 'normalizr';



export const shift = new schema.Entity('shifts');
export const employee = new schema.Entity('employees');
export const crew = new schema.Entity('crew');
export const authority = new schema.Entity('authorities');
export const project = new schema.Entity('project');
export const task = new schema.Entity('task');
export const projectTask = new schema.Entity('projectTask');

export const shiftArray = { shifts: [shift] };
export const employeeArray = { employees: [employee] };
export const crewArray = { crews: [crew] }
export const authorityArray = { authorities: [authority] };
export const projectArray = { projects: [project] }
export const taskArray = { tasks: [task] }
export const projectTaskArray = { projectTask: [projectTask]}