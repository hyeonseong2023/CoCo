import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

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
      <div className="header-logo">로고</div>
      <div className="header-buttons">
        <Link to="/write">글쓰기</Link>
        <button onClick={isModalOpen ? closeModal : openModal}>
          {isModalOpen ? "닫기" : "로그인"}
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="popup">
              <h2>로그인</h2>
              {/* 로그인 폼 및 UI 요소들을 여기에 추가 */}
              <div className="popup-buttons">
                <button>구글</button>
                <button>카카오</button>
              </div>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
