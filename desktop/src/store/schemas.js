import { schema } from 'normalizr';

export const shift = new schema.Entity('shifts');
export const shiftArray = { shifts: [shift] };

export const user = new schema.Entity('User');
export const userArray = { users: [user] };