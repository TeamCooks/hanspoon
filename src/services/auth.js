import * as Yup from 'yup';

export const signInSchema = Yup.object({
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

export const signUpSchema = Yup.object({
  username: Yup.string().min(3, 'Must be 3 characters or more').required('Required'),
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

export function FormikField({ fieldname, formik }) {
  let type = 'text';
  switch (fieldname) {
    case 'password':
    case 'passwordConfirm':
      type = 'password';
      break;
    case 'email':
      type = 'email';
      break;
    default:
      type = 'text';
  }
  return (
    <>
      <label htmlFor={fieldname}>{fieldname.toUpperCase()}</label>
      <input
        id={fieldname}
        name={fieldname}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldname]}
      />
      {formik.touched[fieldname] && formik.errors[fieldname] ? <div>{formik.errors[fieldname]}</div> : null}
    </>
  );
};
