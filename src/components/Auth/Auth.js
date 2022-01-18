import PropTypes from 'prop-types';
import { useState } from 'react';
import { Dialog } from '..';
import { useFormik } from 'formik';
import styles from './Auth.module.scss';
import imgUrl from '@assets/default.jpg';
import {
  TOGGLE_MESSAGE,
  HEADING,
  INITIAL_VALUES,
  SCHEMA,
  AUTH_ERROR_MSG,
  AUTH_FUNC,
  PLACEHOLDER,
} from '../../services';
import { useAuth } from '../../Hooks';

export function Auth({ isVisible, onClose }) {
  const [currentForm, setCurrentForm] = useState('signin');

  const toggleCurrentForm = (e) => {
    e.preventDefault();
    setCurrentForm(currentForm === 'signin' ? 'signup' : 'signin');
  };

  return isVisible ? (
    <Dialog
      isVisible={isVisible}
      onClose={onClose}
      nodeId="dialog"
      img={imgUrl}
      label={currentForm}
      className={styles.memberDialog}
    >
      <h2 className={styles.heading}>{HEADING[currentForm]}</h2>
      {currentForm === 'signin' ? <Auth.SignIn onClose={onClose} /> : <Auth.SignUp onClose={onClose} />}
      <a href="#" role="button" onClick={toggleCurrentForm}>
        {TOGGLE_MESSAGE[currentForm]}
      </a>
    </Dialog>
  ) : null;
}

Auth.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Auth.SignIn = function SignIn({ onClose }) {
  const [hasAuthError, setAuthError] = useState(false);
  const {signIn} = useAuth();
  const formik = useFormik({
    initialValues: INITIAL_VALUES.signin,
    validationSchema: SCHEMA.signin,
    onSubmit: async (values) => {
      try {
        const user = await signIn(values);
        setAuthError(false);
        onClose();
        // 여기에 auth 정보를 context에 update하기
      } catch (e) {
        setAuthError(true);
      }
    },
  });
  return (
    <>
      <Auth.Error>{hasAuthError ? AUTH_ERROR_MSG.signin : null} </Auth.Error>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Auth.Field fieldName={'email'} formik={formik} />
        <Auth.Field fieldName={'password'} formik={formik} />
        <button type="submit" disabled={!formik.dirty || !formik.isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

Auth.SignIn.propTypes = {
  onClose: PropTypes.func.isRequired,
};

Auth.SignUp = function SignUp({ onClose }) {
  const [hasAuthError, setAuthError] = useState(false);
  const {signUp} = useAuth();

  const formik = useFormik({
    initialValues: INITIAL_VALUES.signup,
    validationSchema: SCHEMA.signup,
    onSubmit: async (values) => {
      try {
        const user = await signUp(values);
        setAuthError(false);
        onClose();
        // 여기에 auth 정보를 context에 update하기
      } catch (e) {
        setAuthError(true);
      }
    },
  });
  return (
    <>
      <Auth.Error>{hasAuthError ? AUTH_ERROR_MSG.signup : null}</Auth.Error>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Auth.Field fieldName={'username'} formik={formik} />
        <Auth.Field fieldName={'email'} formik={formik} />
        <Auth.Field fieldName={'password'} formik={formik} />
        <Auth.Field fieldName={'passwordConfirm'} formik={formik} />
        <button type="submit" disabled={!formik.dirty || !formik.isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

Auth.SignUp.propTypes = {
  onClose: PropTypes.func.isRequired,
};
Auth.Error = function Error({ ...restProps }) {
  return <div className={styles.authError} {...restProps} />;
};

Auth.Error.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Auth.Field = function Field({ fieldName, formik }) {
  let type = 'text';
  switch (fieldName) {
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
      <label className="a11y-hidden" htmlFor={fieldName}>
        {fieldName.toUpperCase()}
      </label>
      <input
        id={fieldName}
        name={fieldName}
        placeholder={PLACEHOLDER[fieldName]}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldName] || ''}
        autoComplete={fieldName === 'password' ? 'current-password' : 'username'}
      />
      <div className={styles.fieldError}>{formik.touched[fieldName] && formik.errors[fieldName]}</div>
    </>
  );
};

Auth.Field.propTypes = {
  fieldName: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
};
