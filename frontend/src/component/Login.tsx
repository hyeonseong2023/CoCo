import React, { useState } from 'react';

type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  // 로그인 관련 로직 및 UI 구현

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>로그인</h2>
        {/* 로그인 관련 폼 및 UI 요소들을 여기에 추가 */}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Login;
