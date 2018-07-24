import * as Yup from 'yup';

export const auth = Yup.object().shape({
  username: Yup.string().required('Network is required'),
  password: Yup.string().required('Password is required'),
});
export const account = Yup.object().shape({
  pin: Yup.string()
    .min(6, 'Pins are 6 characters')
    .max(6, 'Pins are 6 characters')
    .required('Pin required'),
});
export const shift = Yup.object().shape({
  length: Yup.string().required('Length required')
})