import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import logoimg from '../img/Logo.png';
import Login from './Login';
import JoinModel from './JoinModal';
import Cookies from 'js-cookie';
import img from '../img/normal.png'
import write from '../img/writeA.png'

import login from '../img/Login.png'

type HeaderProps = {
  onLoginButtonClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const custId = Cookies.get('CUST_ID');
  const custImg = Cookies.get('CUST_IMG');
  const [isLoggedIn, setIsLoggedIn] = useState(!!(custId && custImg !== "0" && custImg !== null));
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
      navigate('/write');
    } else {
      openModal();
    }
  };

  return (
    <div  className="header-containerH">
    <div className="header-container">
      <div className="header-logo"><a href='/'><img src={logoimg} alt="" /></a></div>
      <div className="header-buttons">
        <div className='header-buttons-div'>
          <Link to="/write" className='writeicon'>
              <button>모집글 작성</button>
          </Link>
          {isLoggedIn ? (
            <Link to="/mypage" className='mypageicon'>
              <img src={img} alt="" className='profileimage' />
            </Link>
          ) : (
            <button id="login-button" onClick={isModalOpen ? closeModal : openModal}>
              <img src={login} alt="" className='profileimage' />
            </button>

          )}
          {custImg === "0" && Cookies.get('coin') === "on" && (
            <JoinModel onClose={handleJoinModelClose} />
          )}
          
        </div>
      </div>
      {isModalOpen && (
        <Login onClose={closeModal} />
      )}

    </div>
    <hr className='main-hr'/>
    </div>
  );
};

export default Header;
