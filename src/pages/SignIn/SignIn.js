import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signIn } from '../../api/requestAuth';
import { signInSchema, FormikField } from '../../services';

export const SignIn = () => {
  const [hasAuthError, setAuthError] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const user = await signIn(values);
        console.log(user);
        setAuthError(false);
        // 여기에 auth 정보를 context에 update하기
      } catch (e) {
        setAuthError(true);
      }
    },
  });
  return (
    <>
    {hasAuthError ? <div className="authError">Login Failed. Please Try Again.</div> : null}
    <form onSubmit={formik.handleSubmit}>
      <FormikField fieldname={'email'} formik={formik} />
      <FormikField fieldname={'password'} formik={formik} />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

