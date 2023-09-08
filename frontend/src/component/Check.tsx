import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Check: React.FC = () => {
  const cookies = new Cookies();
  const custId = cookies.get('CUST_ID');
  const custImg = cookies.get('CUST_IMG');
  
  useEffect(() => {

    // 서버에서 받은 데이터를 사용하여 쿠키 업데이트
    axios.get('/api/getUserData', { withCredentials: true })
      .then((response) => {
        const userData = response.data;
      
        // userData.CUST_ID와 userData.CUST_IMG를 사용하여 쿠키 업데이트
        cookies.set('CUST_ID', userData.CUST_ID, { path: '/' });
        cookies.set('CUST_IMG', userData.CUST_IMG, { path: '/' });
        
        // 업데이트된 쿠키 값을 사용하여 필요한 동작 수행
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, []);

  return (
    <div>

    </div>
  );
};

export default Check;
