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
        cookies.set('CUST_ID', userData.CUST_ID, { path: '/' });
        cookies.set('CUST_IMG', userData.CUST_IMG, { path: '/' });
        navigate('/');
      })
      .catch((error) => {
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
