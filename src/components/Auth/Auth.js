import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Dialog, Heading } from '..';
import { useFormik } from 'formik';
import styles from './Auth.module.scss';
import classNames from 'classnames';
import imgUrl from '@assets/default.jpg';
import { TOGGLE_MESSAGE, HEADING, INITIAL_VALUES, SCHEMA, AUTH_ERROR_MSG, PLACEHOLDER } from '../../services';
import { useSignIn, useSignUp } from '../../contexts/AuthContext';
import { Button } from '..';
export function Auth({ isVisible, onClose }) {
  const [currentForm, setCurrentForm] = useState('signin');

  const toggleCurrentForm = (e) => {
    e.preventDefault();
    setCurrentForm(currentForm === 'signin' ? 'signup' : 'signin');
  };

  useEffect(() => {
    return () => {
      setCurrentForm('signin');
    };
  }, [isVisible]);

  return isVisible ? (
    <Dialog
      isVisible={isVisible}
      onClose={onClose}
      nodeId="dialog"
      img={imgUrl}
      label={currentForm}
      className={styles.memberDialog}
    >
      <Heading as="h2" className={styles.heading}>
        {HEADING[currentForm]}
      </Heading>
      {currentForm === 'signin' ? (
        <Auth.SignIn onClose={onClose} />
      ) : (
        <Auth.SignUp onClose={onClose} onSignUp={() => setCurrentForm('signin')} />
      )}
      <button className={styles.toggle} onClick={toggleCurrentForm}>
        {TOGGLE_MESSAGE[currentForm]}
      </button>
    </Dialog>
  ) : null;
}

Auth.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Auth.SignIn = function SignIn({ onClose }) {
  const [hasAuthError, setAuthError] = useState(false);
  const signIn = useSignIn();
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
      <Auth.Error className={classNames({ [styles.show]: hasAuthError })}>
        {hasAuthError ? AUTH_ERROR_MSG.signin : null}
      </Auth.Error>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Auth.Field fieldName={'email'} formik={formik} />
        <Auth.Field fieldName={'password'} formik={formik} />
        <Button
          // style={{ padding: ' 24%' }}
          shape="round"
          variant="filled"
          color="green"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

Auth.SignIn.propTypes = {
  onClose: PropTypes.func.isRequired,
};

Auth.SignUp = function SignUp({ onClose, onSignUp }) {
  const [hasAuthError, setAuthError] = useState(false);
  const signUp = useSignUp();
  const formik = useFormik({
    initialValues: INITIAL_VALUES.signup,
    validationSchema: SCHEMA.signup,
    onSubmit: async (values) => {
      try {
        const user = await signUp(values);
        setAuthError(false);
        window.alert('Signed up successfully. Please sign in.');
        onSignUp();
        // onClose();
      } catch (e) {
        setAuthError(true);
      }
    },
  });
  return (
    <>
      <Auth.Error className={classNames({ [styles.show]: hasAuthError })}>
        {hasAuthError ? AUTH_ERROR_MSG.signup : null}
      </Auth.Error>
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
Auth.Error = function Error({ className, ...restProps }) {
  return <div className={classNames(className, styles.authError)} {...restProps} />;
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
        className={classNames({ [styles.invalid]: formik.touched[fieldName] && formik.errors[fieldName] })}
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
