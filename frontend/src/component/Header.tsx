import React, { useState } from 'react';
import '../css/Header.css';
import Logo from '../img/Logo.png';
import LoginImg from '../img/Login.png';
import Login from './Login';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

const openLoginModal = () => {
  setLoginModalOpen(true);
  document.body.classList.add('modal-open'); // 페이지 스크롤 막기
};

const closeLoginModal = () => {
  setLoginModalOpen(false);
  document.body.classList.remove('modal-open'); // 페이지 스크롤 복구
};

  return (
    <div id="header-container">
      <div id="header-logo-box">
        <img src={Logo} alt="로고" />
      </div>
      <div id='header-white-space'>
        <div id="header-login-container">
          <button id='header-write'> 모집글 작성 </button>
          <button id='header-login' onClick={openLoginModal}>
            <img src={LoginImg} alt="로그인" />
          </button>
        </div>
      </div>

      {isLoginModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-content">
              <Login onClose={closeLoginModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
