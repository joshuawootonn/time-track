import { schema } from 'normalizr';

export const crewSchema = new schema.Entity('crews');
export const authoritySchema = new schema.Entity('authorities');
export const employeeSchema = new schema.Entity('employees');
export const shiftSchema = new schema.Entity('shifts');
export const activitySchema = new schema.Entity('activities');
export const projectTaskSchema = new schema.Entity('projectTasks');
export const projectSchema = new schema.Entity('projects');
export const taskSchema = new schema.Entity('tasks');
export const subcategorySchema = new schema.Entity('subcategory');
export const categorySchema = new schema.Entity('category');
export const dimensionSchema = new schema.Entity('dimension');

crewSchema.define({ employees: [employeeSchema] });

authoritySchema.define({ employees: [employeeSchema] });


employeeSchema.define({
  authority: authoritySchema,
  crew: crewSchema,
  shifts: [shiftSchema]
});

shiftSchema.define({
  employee: employeeSchema,
  activities: [activitySchema]
});

activitySchema.define({
  shift: shiftSchema,
  projectTask: projectTaskSchema
});

projectTaskSchema.define({
  activities: [activitySchema],
  project: projectSchema,
  task: taskSchema
});


projectSchema.define({ projectTasks: [projectTaskSchema] });

taskSchema.define({
  projectTasks: [projectTaskSchema],
  subcategory: subcategorySchema,
  dimension: dimensionSchema
});


subcategorySchema.define({
  tasks: [taskSchema],
  category: categorySchema
});

categorySchema.define({
  subcategories: [subcategorySchema]
});

dimensionSchema.define({
  tasks: [taskSchema]
});

export const crewArray = { crews: [crewSchema] };
export const authorityArray = { authorities: [authoritySchema] };
export const employeeArray = { employees: [employeeSchema] };
export const shiftArray = { shifts: [shiftSchema] };
export const activityArray = { activities: [activitySchema] };
export const projectArray = { projects: [projectSchema] };
export const taskArray = { tasks: [taskSchema] };
export const subcategoryArray = { subcategories: [subcategorySchema] };
export const categoryArray = { categories: [categorySchema] };
export const dimensionArray = { dimensions: [dimensionSchema] };
export const projectTaskArray = { projectTasks: [projectTaskSchema] };