import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import logoimg from '../img/Logo.png';
import Login from './Login';
import JoinModel from './JoinModel';
import Cookies from 'js-cookie';

type HeaderProps = {
  onLoginButtonClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const custId = Cookies.get('CUST_ID');
  const custImg = Cookies.get('CUST_IMG');
  const [isLoggedIn, setIsLoggedIn] = useState(!!(custId && custImg !== "0"));
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
    setIsLoggedIn(false);
  };

  const handleJoinModelClose = () => {
    navigate('/');
    setIsModalOpen(false);
  };

  const handleWriteClick = () => {
    if (isLoggedIn) {
      // 이미 로그인되어 있으면 글쓰기 페이지로 이동
      navigate('/write');
    } else {
      openModal();
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo"><a href='/'><img src={logoimg} alt="" /></a></div>
      <div className="header-buttons">
        <button className='writeButton' onClick={handleWriteClick}>글쓰기</button>
        {isLoggedIn ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button id="login-button" onClick={isModalOpen ? closeModal : openModal}>
            로그인
          </button>
        )}
        {custImg === "0" && Cookies.get('coin') === "on" && (
          <JoinModel onClose={handleJoinModelClose} />
        )}
      </div>
      {isModalOpen && (
        <Login onClose={closeModal} />
      )}
    </div>
  );
};

export default Header;
