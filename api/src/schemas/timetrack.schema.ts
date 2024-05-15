import {
  mysqlSchema,
  int,
  varchar,
  tinyint,
  datetime,
  index,
  uniqueIndex,
  mysqlTable,
} from 'drizzle-orm/mysql-core'

// Define the schema
export const timetrack = mysqlSchema('timetrack')

// Authority Table
export const authority = timetrack.table(
  'authority',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    type: varchar('type', { length: 45 }).notNull(),
  },
  (table) => {
    return {
      type_UNIQUE: uniqueIndex('type_UNIQUE').on(table.type),
    }
  },
)

// Crew Table
export const crew = timetrack.table(
  'crew',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    name: varchar('name', { length: 45 }).notNull(),
  },
  (table) => {
    return {
      name_UNIQUE: uniqueIndex('name_UNIQUE').on(table.name),
    }
  },
)

// Employee Table
export const employee = timetrack.table(
  'employee',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }).notNull(),
    pin: int('pin').notNull().unique('pin_UNIQUE'),
    isEmployed: tinyint('is_employed').notNull().default(1),
    isWorking: tinyint('is_working').notNull(),
    authorityId: int('authority_id')
      .notNull()
      .references(() => authority.id),
    crewId: int('crew_id')
      .notNull()
      .references(() => crew.id),
  },
  (table) => {
    return {
      fkEmployeeAuthority1Idx: index('fk_employee_authority1_idx').on(
        table.authorityId,
      ),
      fkEmployeeCrew1Idx: index('fk_employee_crew1_idx').on(table.crewId),
    }
  },
)

// Shift Table
export const shift = timetrack.table(
  'shift',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    clockInDate: datetime('clock_in_date'),
    clockOutDate: datetime('clock_out_date'),
    length: int('length'),
    employeeId: int('employee_id')
      .notNull()
      .references(() => employee.id),
  },
  (table) => {
    return {
      fkShiftEmployee1Idx: index('fk_shift_employee1_idx').on(table.employeeId),
    }
  },
)

// Category Table
export const category = timetrack.table(
  'category',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    type: varchar('type', { length: 45 }).notNull(),
  },
  (table) => {
    return {
      type_UNIQUE: uniqueIndex('type_UNIQUE').on(table.type),
    }
  },
)

// Dimension Table
export const dimension = timetrack.table(
  'dimension',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    type: varchar('type', { length: 45 }).notNull(),
  },
  (table) => {
    return {
      type_UNIQUE: uniqueIndex('type_UNIQUE').on(table.type),
    }
  },
)

// Subcategory Table
export const subcategory = timetrack.table(
  'subcategory',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    type: varchar('type', { length: 45 }).notNull(),
    categoryId: int('category_id')
      .notNull()
      .references(() => category.id),
    dimensionId: int('dimension_id')
      .notNull()
      .references(() => dimension.id),
  },
  (table) => {
    return {
      fk_subcategory_category1_idx: index('fk_subcategory_category1_idx').on(
        table.categoryId,
      ),
      fk_subcategory_dimension1_idx: index('fk_subcategory_dimension1_idx').on(
        table.dimensionId,
      ),
      type_UNIQUE: uniqueIndex('type_UNIQUE').on(table.type),
    }
  },
)

// Task Table
export const task = timetrack.table(
  'task',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    name: varchar('name', { length: 45 }).notNull(),
    isActive: tinyint('is_active').notNull().default(1),
    subcategoryId: int('subcategory_id')
      .notNull()
      .references(() => subcategory.id),
  },
  (table) => {
    return {
      fk_task_subcategory1_idx: index('fk_task_subcategory1_idx').on(
        table.subcategoryId,
      ),
    }
  },
)

// Project Table
export const project = timetrack.table('project', {
  id: int('id').notNull().primaryKey().autoincrement(),
  name: varchar('name', { length: 45 }).notNull(),
  isActive: tinyint('is_active').notNull().default(1),
  date: datetime('date').notNull(),
})

// Project Task Table
export const projectTask = timetrack.table(
  'project_task',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    taskId: int('task_id')
      .notNull()
      .references(() => task.id),
    projectId: int('project_id')
      .notNull()
      .references(() => project.id),
    quantity: int('quantity'),
    estimateTime: int('estimate_time'),
  },
  (table) => {
    return {
      fk_project_task_project1_idx: index('fk_project_task_project1_idx').on(
        table.projectId,
      ),
      fk_project_task_task1_idx: index('fk_project_task_task1_idx').on(
        table.taskId,
      ),
    }
  },
)

// Activity Table
export const activity = timetrack.table(
  'activity',
  {
    id: int('id').notNull().primaryKey().autoincrement(),
    length: int('length').notNull(),
    description: varchar('description', { length: 45 }),
    shiftId: int('shift_id')
      .notNull()
      .references(() => shift.id),
    projectTaskId: int('project_task_id')
      .notNull()
      .references(() => projectTask.id),
  },
  (table) => {
    return {
      fk_activity_shift1_idx: index('fk_activity_shift1_idx').on(table.shiftId),
      fk_activity_project_task1_idx: index('fk_activity_project_task1_idx').on(
        table.projectTaskId,
      ),
    }
  },
)
