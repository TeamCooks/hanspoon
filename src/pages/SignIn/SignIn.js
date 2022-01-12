import React from 'react';
import { useFormik } from 'formik';
import { signIn } from '../../api/requestAuth';
import { signInSchema, FormikField } from '../../services';

export const SignIn = () => {
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
        // 여기에 auth 정보를 context에 update하기
      } catch (e) {
        window.alert('API 호출 후 인증 실패 에러메시지를 노출해야합니다.');
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikField fieldname={'email'} formik={formik} />
      <FormikField fieldname={'password'} formik={formik} />
      <button type="submit">Submit</button>
    </form>
  );
};

