import React from 'react';
import { useFormik } from 'formik';
import { signIn } from '../../api/requestAuth';
import { signInSchema } from '../../services';

export const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        const user = await signIn(values);
        console.log(user);
        // 여기에 auth 정보를 context에 update하기
      } catch (e) {
        window.alert('API 호출 후 인증 실패 에러메시지를 노출해야합니다.');
      }
    },
  });
  console.log(formik);
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
      {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};
