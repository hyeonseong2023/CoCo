import { useEffect, useState } from 'react'

import Header from '../Header'
import User from './User'
import Side from './Side'

import '../../css/Mypage.css';
import Logout from '../../img/Logout.png'
import axios from 'axios'
import Cookies from 'js-cookie'

const Mypage = () => {

  const [data, SetData] = useState();

  //const custId = data.CUST_ID ; // 마이페이지 아이디 
  const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디 

  //초기 렌더링 시 유저 정보 , 포트폴리오 , 프로젝트 데이터 받아오기 
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/mypage?cust_id=${loginUserId}`;
    //const url = `http://localhost:8099/mypage?cust_id=${loginUserId}`;
    try {
      const response = await axios.get(url);

      SetData(response.data); // 나중에 바꾸겠음
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [data]);



  return (
    <div>
      <Header />
      <div className='mypage-container'>
        <div className='mypage-user'>{data && <User data={data} />}</div>
        <div className='mypgae-side'>{data && <Side data={data} />}</div>
      </div>
    </div>
  )
}

export default Mypage