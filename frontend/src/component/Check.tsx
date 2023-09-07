import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Join from './Join'; // 조인 모달 컴포넌트를 import

const Check: React.FC = () => {
  const cookies = new Cookies();
  const custId = cookies.get('CUST_ID');
  const custImg = cookies.get('CUST_IMG');
  const navigate = useNavigate();

  const [showJoinModal, setShowJoinModal] = useState(false); // 모달 표시 여부 상태 변수

  useEffect(() => {
    console.log('CUST_ID:', custId);
    console.log('CUST_IMG:', custImg);

    if (custImg === '0') {
      // 이미지 값이 '0'인 경우, 모달을 표시하도록 상태 변수를 업데이트합니다.
      setShowJoinModal(true);
    }
  }, [custId, custImg]);

  useEffect(() => {
    console.log("확인완료");

    // 원하는 조건에 따라 리디렉션
    if (!showJoinModal) {
      navigate('/');
    }
  }, [navigate, showJoinModal]);

  return null; // 리턴 부분은 필요하지 않습니다.
};

export default Check;
