import styles from './Header.module.scss';
import { SearchForm, Menu, Button, Logo } from '../../components';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { Auth } from '../Auth/Auth';
import { useAuthUser } from '../../contexts/AuthContext';
import lodash from 'lodash';

export function Header() {
  const authUser = useAuthUser();
  const [showDialog, setShowDialog] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const oldScrollTop = useRef(0);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleFocus = () => {
    setHideHeader(false);
  };

  const handleBlur = () => {
    setHideHeader(window.pageYOffset > 70);
  };

  const controlHeader = lodash.throttle(() => {
    const currentScrollTop = window.pageYOffset;
    setHideHeader(currentScrollTop > 70 && currentScrollTop > oldScrollTop.current);
    oldScrollTop.current = currentScrollTop;
  }, 300);

  useEffect(() => {
    document.addEventListener('scroll', controlHeader);
    return () => {
      document.removeEventListener('scroll', controlHeader);
    };
  }, []);

  return (
    <header
      className={classNames(styles.header, { [styles.hide]: hideHeader })}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Logo />
      <SearchForm />
      {authUser !== null ? (
        <Menu />
      ) : (
        <>
          <Button
            type="button"
            variant="text"
            aria-haspopup="dialog"
            aria-label="Open SignIn Dialog"
            title="Open SignIn Dialog"
            onClick={handleOpenDialog}
          >
            Sign In
          </Button>
          <Auth isVisible={showDialog} onClose={handleCloseDialog} />
        </>
      )}
    </header>
  );
}
