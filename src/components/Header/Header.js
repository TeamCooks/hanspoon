import styles from './Header.module.scss';
import { SearchForm, Menu, Button, Logo, Auth, IconButton } from '..';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useAuthLoading, useAuthUser } from '../../contexts/AuthContext';
import lodash from 'lodash';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

export function Header() {
  const authLoading = useAuthLoading();
  const authUser = useAuthUser();
  const [showDialog, setShowDialog] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const oldScrollTop = useRef(0);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  const controlScrollToTop = lodash.debounce(() => {
    const currentScrollTop = window.pageYOffset;
    setShowScrollToTop(currentScrollTop > 500);
  }, 300);
  useEffect(() => {
    document.addEventListener('scroll', controlHeader);
    document.addEventListener('scroll', controlScrollToTop);
    return () => {
      document.removeEventListener('scroll', controlHeader);
      document.removeEventListener('scroll', controlScrollToTop);
    };
  }, []);

  return (
    <header
      className={classNames(styles.header, { [styles.hide]: authLoading || hideHeader })}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div>
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
        {showScrollToTop &&
          createPortal(
            <IconButton
              ariaLabel="Go to Top"
              state="up"
              type="button"
              variant="filled"
              color="green"
              size="large"
              shape="circle"
              style={{
                position: 'fixed',
                right: '20px',
                bottom: '20px',
                cursor: 'pointer',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            />,

            document.getElementById('root'),
          )}
      </div>
    </header>
  );
}
