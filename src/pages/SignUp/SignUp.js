import { useFormik } from 'formik';
import React from 'react';
import { FormikField, signUpSchema } from '../../services';

export const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikField fieldname="username" formik={formik} />
      <FormikField fieldname="email" formik={formik} />
      <FormikField fieldname="password" formik={formik} />
      <FormikField fieldname="passwordConfirm" formik={formik} />
      <button type="submit">Submit</button>
    </form>
  );
};
