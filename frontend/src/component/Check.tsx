import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Check: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/getUserData', { withCredentials: true })
      .then((response) => {
        const userData = response.data;
        console.log(response);
        if(userData.CUST_IMG == "0"){
          cookies.set('coin',"on", { path: '/' });
        }
        console.log("카카오코인" , cookies.get('coin'));
        
        if(cookies.get('CUST_ID') === null) {
          cookies.set('CUST_ID', userData.CUST_ID, { path: '/' });
          cookies.set('CUST_IMG', userData.CUST_IMG, { path: '/' });
          console.log("쿠키아이디" , cookies.get('CUST_ID'));
        } else{
          cookies.set('CUST_ID', cookies.get('CUST_ID'), { path: '/' });
          cookies.set('CUST_IMG', cookies.get('CUST_IMG'), { path: '/' });
        }

        navigate('/');
      })
      .catch((error) => {
        cookies.set('coin',"on", { path: '/' });
        console.error('Error fetching data:', error);
        navigate('/');
      });
  }, []);

  return (
    <div>

    </div>
  );
};

export default Check;
