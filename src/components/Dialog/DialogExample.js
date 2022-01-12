import React, { useState } from 'react';
import { Dialog } from './Dialog';
function Example() {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenDialog = () => {
    setIsVisible(true);
  };

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  return (
    <div className="container">
      <span>이곳에는 다른 내용들이 들어갑니다.</span>
      <button
        type="button"
        className="openDialogButton"
        aria-haspopup="dialog"
        aria-label="모달 다이얼로그 열기"
        title="모달 다이얼로그 열기"
        onClick={handleOpenDialog}
      >
        모달을 여는 버튼입니다.
      </button>

      {isVisible && (
        <Dialog isVisible={isVisible} onClose={handleCloseDialog} nodeId="dialog">
          <Dialog.Content>
            <div>이곳에 내용이 들어가면 됩니다.</div>
          </Dialog.Content>
        </Dialog>
      )}
    </div>
  );
}

export default Example;
