import React, { useState } from 'react';

type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  // 로그인 관련 로직 및 UI 구현
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>로그인</button>
      {isPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>로그인</h2>
            <div className="popup">
              <button>구글</button>
              <button>카카오</button>
            </div>
            <button onClick={closePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
