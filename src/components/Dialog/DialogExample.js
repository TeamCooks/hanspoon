import React, { useState } from 'react';
import { Dialog } from './Dialog';
import imgUrl from '@assets/images/default.jpg';

function Example() {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenDialog = () => {
    setIsVisible(true);
  };

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div>
        이곳은 모달과 관계없는 본문입니다. 예시를 위해 넣어두었습니다.
      </div>
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
      <div>
        이곳 또한 모달과 관계없는 본문입니다. 예시를 위해 넣어두었습니다.
      </div>
      {isVisible && (
        <Dialog
          isVisible={isVisible}
          onClose={handleCloseDialog}
          nodeId="dialog"
          img={imgUrl}
        >
          <h2>모달 안의 내용입니다. content div안에 들어가므로 별도의 container없이 바로 요소들을 넣으시면 됩니다.</h2>
          <p>
            이 곳에 키보드 트래핑이 처리되어있으므로 <button>tabbable elements</button>들을 넣을 수 있습니다.
            <a href="#here">링크</a>도 넣을 수 있습니다.
          </p>
        </Dialog>
      )}
    </>
  );
}

export default Example;
