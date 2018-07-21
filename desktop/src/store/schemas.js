import { schema } from 'normalizr';

export const shift = new schema.Entity('shifts');
export const shiftArray = { shifts: [shift] };

export const employee = new schema.Entity('employees');
export const employeeArray = { employees: [employee] };
