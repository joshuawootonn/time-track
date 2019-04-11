import * as Yup from 'yup';

export const auth = Yup.object().shape({
  username: Yup.string().required(`Network is required`),
  password: Yup.string().required(`Password is required`)
});

export const authorityValidation = Yup.object().shape({
  type: Yup.string().required(`Type is required`)
});
export const crewValidation = Yup.object().shape({
  name: Yup.string().required(`Type is required`)
});
export const categoryValidation = Yup.object().shape({
  type: Yup.string().required(`Type is required`)
});
export const subcategoryValidation = Yup.object().shape({
  type: Yup.string().required(`Type is required`),
  categoryId: Yup.number()
    .positive(`Category selection required`)
    .required(`Category selection required`)
});
export const account = Yup.object().shape({
  pin: Yup.string()
    .min(6, `Pins are 6 characters`)
    .max(6, `Pins are 6 characters`)
    .required(`Pin required`)
});
export const clockout = Yup.object().shape({
  activities: Yup.array()
    .of(
      Yup.object().shape({
        length: Yup.number()
          .min(1, `Time must be specified`)
          .required(`Time selection required`),
        projectId: Yup.number()
          .positive(`Project selection required`)
          .required(`Project selection required`),
        projectTaskId: Yup.number()
          .positive(`Task selection required`)
          .required(`Task selection required`),
        description: Yup.string()
      })
    )
    .required(`Activity selection required`)
});

export const shift = Yup.object().shape({
  employeeId: Yup.number()
    .positive(`Employee selection required`)
    .required(`Employee selection required`),
  clockInDate: Yup.date().required(`Invalid clock in date`),
  clockOutDate: Yup.date().required(`Invalid clock out date`),
  activities: Yup.array()
    .of(
      Yup.object().shape({
        length: Yup.number()
          .min(1, `Time must be specified`)
          .required(`Time selection required`),
        projectId: Yup.number()
          .positive(`Project selection required`)
          .required(`Project selection required`),
        projectTaskId: Yup.number()
          .positive(`Task selection required`)
          .required(`Task selection required`),
        description: Yup.string()
      })
    )
    .required(`Activity selection required`)
});

export const halfShift = Yup.object().shape({
  employeeId: Yup.number()
    .positive(`Employee selection required`)
    .required(`Employee selection required`),
  clockInDate: Yup.date().required(`Invalid clock in date`)  
});

export const exportValidation = Yup.object().shape({
  exportCategory: Yup.number().min(0, `Invalid export category`),
  start: Yup.date().required(`Invalid start date`),
  fileLocation: Yup.string()
    .required(`File location is required`)
    .matches(
      new RegExp(/\.(xls|xlsx)$/i),
      `File location must be an Xls or Xlsx file`
    )
});

export const employeeValidation = Yup.object().shape({
  firstName: Yup.string()
    .required(`First Name is required`)
    .matches(new RegExp(/[a-zA-Z]{2,}/), `First Name format is invalid`),
  lastName: Yup.string()
    .required(`Last Name is required`)
    .matches(
      new RegExp(/[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/),
      `Last Name format is invalid`
    ),
  authorityId: Yup.number()
    .positive(`Authority selection is required`)
    .required(`Authority selection is required`),
  crewId: Yup.number()
    .positive(`Crew selection is required`)
    .required(`Crew selection is required`),
  pin: Yup.string()
    .required(`Pin is required`)
    .matches(new RegExp(/\b(\d{6})\b/), `Pin format is invalid`),
  isEmployed: Yup.boolean(),
  isWorking: Yup.boolean()
});

export const taskValidation = Yup.object().shape({
  name: Yup.string()
    .required(`Name is required`)
    .matches(new RegExp(/[a-zA-Z-_0-9]{4,}/), `Name format is invalid`),
  categoryId: Yup.number()
    .positive(`Category selection is required`)
    .required(`Category selection is required`),
  subcategoryId: Yup.number()
    .positive(`Subcategory selection is required`)
    .required(`Subcategory selection is required`),
  isActive: Yup.boolean()
});

export const projectValidation = Yup.object().shape({
  name: Yup.string()
    .required(`Name is required`)
    .matches(new RegExp(/[a-zA-Z-_0-9]{4,}/), `Name format is invalid`),
  date: Yup.date().required(`Invalid date`),
  isActive: Yup.boolean(),
  projectTasks: Yup.array()
    .of(
      Yup.object().shape({
        categoryId: Yup.number()
          .min(1, `Selection required`)
          .required(`Selection required`),
        subcategoryId: Yup.number()
          .positive(`Selection required`)
          .required(`Selection required`),
        taskId: Yup.number()
          .positive(`Selection required`)
          .required(`Selection required`),
        estimateTime: Yup.number()
          .positive(`Postive numbers only`)
          .required(`Postive numbers only`),
        quantity: Yup.number()
          .positive(`Postive numbers only`)
          .required(`Postive numbers only`)
      })
    )
});

