import * as Yup from 'yup';

export const auth = Yup.object().shape({
  username: Yup.string().required('Network is required'),
  password: Yup.string().required('Password is required')
});
export const account = Yup.object().shape({
  pin: Yup.string()
    .min(6, 'Pins are 6 characters')
    .max(6, 'Pins are 6 characters')
    .required('Pin required')
});
export const shift = Yup.object().shape({
  activites: Yup.array().of(
    Yup.object().shape({
      length: Yup.number()
        .positive()
        .required('Time selection required'),
      projectId: Yup.number()
        .positive()
        .required('Project selection required'),
      projectTaskId: Yup.number()
        .positive()
        .required('Task selection required'),
      description: Yup.string()
    }),
  )
});
export const exportValidation = Yup.object().shape({
  exportCategory: Yup.number().min(0, 'Invalid export category'),
  start: Yup.date().required('Invalid start date'),
  end: Yup.date().required('Invalid end date'),
 
  fileLocation: Yup.string()
    .required('File location is required')
    .matches(
      new RegExp(/\.(xls|xlsx)$/i),
      'File locaiton must be an Xls or Xlsx file',
    )
});
