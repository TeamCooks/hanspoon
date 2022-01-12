import React from 'react';
import { useFormik } from 'formik';
import { signUpSchema } from '../../services';

export const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm:'',
      email: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <label htmlFor="passwordConfirm">Password Confirm</label>
      <input
        id="passwordConfirm"
        name="passwordConfirm"
        type="passwordConfirm"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.passwordConfirm}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
        <div>{formik.errors.passwordConfirm}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};