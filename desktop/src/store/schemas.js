import { schema } from 'normalizr';

export const shift = new schema.Entity('shifts');
export const shiftArray = { shifts: [shift] };

export const employee = new schema.Entity('employees');
export const employeeArray = { employees: [employee] };

export const authority = new schema.Entity('authorities');
export const authorityArray = { authorities: [authority] };

export const crew = new schema.Entity('crew');
export const crewArray = { crews: [crew] }