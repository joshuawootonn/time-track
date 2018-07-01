import { schema } from 'normalizr';

export const project = new schema.Entity('projects');
export const projectsArray = { projects: [project] };

export const user = new schema.Entity('User');
export const userArray = {users: [user]}