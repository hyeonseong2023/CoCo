import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import logoimg from '../img/cocoLogo.png';
import Login from './Login';
import JoinModel from './JoinModal';
import Cookies from 'js-cookie';
import img from '../img/normal.png'
import write from '../img/writeA.png'
import CoCo from '../img/CoCo.png'
import profilePicture from '../img/profilePicture.png'

import login from '../img/Login.png'
import axios from 'axios';

type HeaderProps = {
  onLoginButtonClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginButtonClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const custProfileImg = Cookies.get('CUST_IMG')
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('CUST_ID') != null && Cookies.get('CUST_IMG') != "0");
  const navigate = useNavigate();
  const [isJoinModal, setIsJoinModal] = useState(false);
<<<<<<< HEAD
=======
  console.log(custProfileImg);
>>>>>>> parent of 83ed442 (Merge branch 'main' into lhs)
  const [custImg, setCustImg] = useState(custProfileImg);


<<<<<<< HEAD

  //통신 (프로필 이미지)
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/profileimg?cust_id=${Cookies.get('CUST_ID')}`;
    try {
      const response = await axios.get(url);
      if (response.data.CUST_IMG == null) {
        setCustImg(profilePicture);
        cookies.set('CUST_IMG', profilePicture, { path: '/' });
      } else {
        setCustImg("data:image/;base64," + response.data.CUST_IMG); // 이미지파일 
        cookies.set('CUST_IMG', "data:image/;base64," + response.data.CUST_IMG, { path: '/' });
      }
=======
  //통신 (프로필 이미지)
  const fetchData = async () => {
    const url = `http://localhost:8099/profileimg?cust_id=${Cookies.get('CUST_ID')}`;
    try {
      const response = await axios.get(url);
      setCustImg("data:image/;base64," + response.data.CUST_IMG); // 이미지파일 

>>>>>>> parent of 83ed442 (Merge branch 'main' into lhs)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
<<<<<<< HEAD
    fetchData();
  }, [])


=======
    if (custImg == null) { //지정안했으면 기본사진 
      setCustImg(profilePicture)
    } else {
      setCustImg(custProfileImg)
    }
  }, [custProfileImg])


  // console.log(custProfileImg);


>>>>>>> parent of 83ed442 (Merge branch 'main' into lhs)
  useEffect(() => {
    setIsJoinModal(true)
  }, [isLoggedIn])

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
    <div className="header-containerH">
      <div className="header-container">
        <div className="header-logo"><a href='/'><img src={CoCo} alt="" /></a></div>
        <div className="header-buttons">
          <div className='header-buttons-div'>
            {isLoggedIn == true ? ( //로그인 후 
              <div>
                <Link to="/write" className='writeicon'>
                  <button>모집글 작성</button>
                </Link>
                <Link to="/mypage" className='mypageicon'>
                  <img src={custImg} alt="" className='profileimage' />
                </Link>
              </div>
            ) : (
              <div className='header-buttons-div-div'>
                <button onClick={isModalOpen ? closeModal : openModal} className='writeicon'>
                  모집글 작성
                </button>
                <button onClick={isModalOpen ? closeModal : openModal} className='login'>
                  로그인
                </button>
              </div>

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
