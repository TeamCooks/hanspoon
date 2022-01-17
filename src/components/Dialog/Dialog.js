import { useRef, useEffect, useCallback } from 'react';
import { string, bool, func, node, oneOf, oneOfType, any } from 'prop-types';
import { createPortal } from 'react-dom';
import { getTabbableElements } from '../../utils';
import styles from './Dialog.module.scss';
import classNames from 'classnames';
import { IconButton } from '../Button/IconButton';
export function Dialog({ isVisible, onClose, children, nodeId = 'dialog', label, img, className, ...restProps }) {
  const scrollY = useRef(window.scrollY);
  const dialogRef = useRef(null);
  const openButtonRef = useRef(null);

  // 이벤트 리스너
  const handleClose = useCallback(() => {
    onClose();
    openButtonRef.current.focus();
  }, [onClose]);

  // 사이드 이펙트 관리
  useEffect(() => {
    // 모달 다이얼로그 오프너 버튼 current 값에 참조
    openButtonRef.current = document.activeElement;

    // tabbable 요소들 찾기
    const tabbableElements = getTabbableElements(dialogRef.current);
    const firstTabbableElement = tabbableElements[0];
    const lastTabbableElement = tabbableElements[tabbableElements.length - 1];

    // 첫번째 탭 이동 가능한 요소에 포커싱
    firstTabbableElement.focus();
    // 이벤트 타입
    let eventType = 'keydown';

    // 이벤트 리스너 정의
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

    // 이벤트 구독
    document.addEventListener(eventType, eventListener);

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY.current}px`;

    // 이펙트 클린업(정리) 함수
    return () => {
      // 이벤트 구독 취소
      document.removeEventListener(eventType, eventListener);

      // unmount 시 원래 스크롤 위치로 보내기
      scrollY.current = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY.current || '0') * -1);
    };
  }, [handleClose, label]);

  return createPortal(
    <>
      <div
        ref={dialogRef}
        className={styles.container}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isVisible}
        aria-label={`${label} Dialog`}
        {...restProps}
      >
        <div className={classNames(className, styles.content)}>{children}</div>
        <Dialog.CloseButton onClose={handleClose} label={label} />
      </div>
      {img ? <Dialog.Image img={img} /> : null}
    </>,
    document.getElementById(nodeId),
  );
}

Dialog.propTypes = {
  isVisible: bool.isRequired,
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
  return <IconButton ariaLabel={`Close ${label} dialog.`} state="close" type="button" variant="default" color="white" size="large" className={styles.closeButton} onClick={onClose} />
};

Dialog.CloseButton.propTypes = {
  onClose: func.isRequired,
  label: string.isRequired,
};

/* -------------------------------------------------------------------------- */

Dialog.Image = function DialogImage({ img: src }) {
  return <img className={styles.backgroundImage} src={src} role="none" alt="" />;
};

Dialog.Image.propTypes = {
  img: string,
};
