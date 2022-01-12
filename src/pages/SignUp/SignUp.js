import { useFormik } from 'formik';
import { useState } from 'react';
import { signUp } from '../../api/requestAuth';
import { FormikField, signUpSchema, AuthError } from '../../services';

export const SignUp = () => {
  const [hasAuthError, setAuthError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const user = await signUp(values);
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
      {hasAuthError ? <AuthError type="signup" /> : null}
      <form onSubmit={formik.handleSubmit}>
        <FormikField fieldname="username" formik={formik} />
        <FormikField fieldname="email" formik={formik} />
        <FormikField fieldname="password" formik={formik} />
        <FormikField fieldname="passwordConfirm" formik={formik} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
