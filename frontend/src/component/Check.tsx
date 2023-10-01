import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Check: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getUserData', { withCredentials: true });

        if (response.data.CUST_IMG === "0") {
          cookies.set('coin', "on", { path: '/' });
        }
        cookies.set('CUST_ID', response.data.CUST_ID, { path: '/' });
        cookies.set('CUST_IMG', response.data.CUST_IMG, { path: '/' });

        navigate('/');
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate, cookies]);

<<<<<<< HEAD
  return <div></div>;
=======
  return (
    <div>
      {}
    </div>
  );
>>>>>>> f7e15b56d6847266bcaf1240ce72a9f2042560aa
};

export default Check;
