import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Check: React.FC = () => {
  const cookies = new Cookies();
  const custId = cookies.get('CUST_ID');
  const custImg = cookies.get('CUST_IMG');
  const navigate = useNavigate(); 
  
  useEffect(() => {

    axios.get('/api/getUserData', { withCredentials: true })
      .then((response) => {
        const userData = response.data;

        cookies.set('CUST_ID', userData.CUST_ID, { path: '/' });
        cookies.set('CUST_IMG', userData.CUST_IMG, { path: '/' });
        

        navigate('/');
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, [navigate]); 

  return (
    <div>

    </div>
  );
};

export default Check;
