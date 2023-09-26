import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import Login from './Login';
import JoinModel from './JoinModal';
import Cookies from 'js-cookie';
import CoCo from '../img/CoCo.png'
import profilePicture from '../img/profilePicture.png'
import axios from 'axios';

type HeaderProps = {
  onLoginButtonClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const custId = Cookies.get('CUST_ID');
  const custProfileImg = Cookies.get('CUST_IMG') //쿠키에서 저장한 이미지 
  const [isLoggedIn, setIsLoggedIn] = useState(!!(custId && custProfileImg !== "0" && custProfileImg !== null));
  const navigate = useNavigate();
  const [isJoinModal, setIsJoinModal] = useState(true);
  
  
  const [custImg, setCustImg] = useState(custProfileImg);

   //통신 (프로필 이미지)
   const fetchData = async () => {
    const url = `http://localhost:8099/profileimg?cust_id=${custId}`;
    try {
      const response = await axios.get(url);
      if(response.data.CUST_IMG == null){
        setCustImg(profilePicture);
      }else {
        setCustImg("data:image/;base64," + response.data.CUST_IMG); // 이미지파일 
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(()=>{
    isLoggedIn && setIsJoinModal(false)
  },[isLoggedIn])

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
      <div className="header-logo"><a href='/'><img src={CoCo} alt="" /></a></div>
      <div className="header-buttons">
        <div className='header-buttons-div'>
          <Link to="/write" className='writeicon'>
              <button>모집글 작성</button>
          </Link>
          {isLoggedIn ? ( 
            
            //로그인 후 
            <Link to="/mypage" className='mypageicon'>
              <img src={custImg} alt="" className='profileimage' />
            </Link>
          ) : (
            
            // 로그인 전 
            <button onClick={isModalOpen ? closeModal : openModal}>
              로그인
            </button>

          )}

          {isJoinModal && custImg === "0" && Cookies.get('coin') === "on" && (
            <JoinModel onClose={handleJoinModelClose} setIsJoinModal={setIsJoinModal} />
          )}
          
        </div>
      </div>
      {isModalOpen && (
        <Login onClose={closeModal} />
      )}

    </div>

    </div>
  );
};

export default Header;
