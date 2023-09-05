// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import logoimg from '../img/Logo.png';
import Login from './Login';

type HeaderProps = {
  onLoginButtonClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="header-container">
      <div className="header-logo"><img src={logoimg} alt="" /></div>
      <div className="header-buttons">
        <Link to="/write">글쓰기</Link>
        <button onClick={isModalOpen ? closeModal : openModal}>
          로그인
        </button>
      </div>
      {isModalOpen && (
        <Login onClose={closeModal} />
      )}
    </div>
  );
};

export default Header;
