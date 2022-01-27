import { useRef, useEffect, useCallback } from 'react';
import { string, func, node, oneOf, oneOfType, any } from 'prop-types';
import { createPortal } from 'react-dom';
import { getTabbableElements } from '@utils';
import styles from './Dialog.module.scss';
import classNames from 'classnames';
import { IconButton } from '../Button/IconButton';
export function Dialog({ onClose, children, nodeId = 'dialog', label, img, className, ...restProps }) {
  const dialogRef = useRef(null);
  const openButtonRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose();
    openButtonRef.current.focus();
  }, [onClose]);

  useEffect(() => {
    openButtonRef.current = document.activeElement;

    const tabbableElements = getTabbableElements(dialogRef.current);
    const firstTabbableElement = tabbableElements[0];
    const lastTabbableElement = tabbableElements[tabbableElements.length - 1];

    firstTabbableElement.focus();
    let eventType = 'keydown';

    const eventListener = (e) => {
      const { key, shiftKey, target } = e;

      if (Object.is(target, firstTabbableElement) && shiftKey && key === 'Tab') {
        e.preventDefault();
        lastTabbableElement.focus();
      }

      if (Object.is(target, lastTabbableElement) && !shiftKey && key === 'Tab') {
        e.preventDefault();
        firstTabbableElement.focus();
      }

      if (key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener(eventType, eventListener);
    document.body.style['overflow-y'] = 'hidden';
    document.body.setAttribute('aria-hidden', 'true');

    return () => {
      document.removeEventListener(eventType, eventListener);
      document.body.removeAttribute('aria-hidden');
      document.body.style['overflow-y'] = '';
    };
  }, [handleClose, label]);

  return createPortal(
    <>
      <div
        ref={dialogRef}
        className={styles.container}
        role="dialog"
        aria-modal="true"
        aria-label={`${label} Dialog`}
        style={{ background: `center / cover no-repeat url(${img})`}}
        {...restProps}
      >
        <div className={classNames(className, styles.content)}>{children}</div>
        <Dialog.CloseButton onClose={handleClose} label={label} />
      </div>
    </>,
    document.getElementById(nodeId),
  );
}

Dialog.propTypes = {
  onClose: func.isRequired,
  children: node.isRequired,
  nodeId: string,
  img: string,
  label: string.isRequired,
  restProps: any,
};

/* -------------------------------------------------------------------------- */

Dialog.Dim = function DialogDim({ onClose }) {
  return <div role="presentation" className={styles.dim} onClick={onClose} />;
};

Dialog.Dim.propTypes = {
  onClose: oneOfType([func, oneOf([null, undefined])]),
};

/* -------------------------------------------------------------------------- */

Dialog.CloseButton = function DialogCloseButton({ onClose, label }) {
  return (
    <IconButton
      ariaLabel={`Close ${label} dialog.`}
      state="close"
      type="button"
      variant="default"
      color="white"
      size="large"
      className={styles.closeButton}
      onClick={onClose}
    />
  );
};

Dialog.CloseButton.propTypes = {
  onClose: func.isRequired,
  label: string.isRequired,
};
