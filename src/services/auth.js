import * as Yup from 'yup';
import { signIn, signUp } from '../api/requestAuth';


const TOGGLE_MESSAGE = {
  signin: 'Not registered yet? Sign up here!',
  signup: 'Already a member? Sign in here!',
};

const HEADING = {
  signin: 'Sign In',
  signup: 'Sign Up',
};

const INITIAL_VALUES = {
  signin: {
    password: '',
    email: '',
  },
  signup: {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  },
};

const SCHEMA = {
  signin: Yup.object({
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  }),
  signup: Yup.object({
    username: Yup.string().min(3, 'Must be 3 characters or more').required('Required'),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  })
}

const AUTH_ERROR_MSG = {
  signin: 'Log-in failed. Please try again.',
  signup: 'Sign-up failed. Please try again.',
};

const FIELDS = {
  signin: ['email', 'password'],
  signup: ['username', 'email', 'password', 'passwordConfirm']
}

const AUTH_FUNC = {
  signin: signIn,
  signup: signUp
}

export const signInSchema = Yup.object({
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const PLACEHOLDER = {
  username: 'Username',
  email: 'Email',
  password: 'Password',
  passwordConfirm: 'Confirm password'
}

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
}

export function AuthError({ type }) {
  return <div className="auth-error">{AUTH_ERROR_MSG[type]}</div>;
}

export { TOGGLE_MESSAGE, HEADING, INITIAL_VALUES, SCHEMA, AUTH_ERROR_MSG, AUTH_FUNC, FIELDS, PLACEHOLDER };

