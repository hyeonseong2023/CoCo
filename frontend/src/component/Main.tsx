import React, { useState, useEffect, useRef } from 'react';
import '../css/Main.css'
import Header from './Header'
import Banner from './Banner'
import Contents from './Contents'
import CategoryBox from './CategoryBox'
import { useLocation } from 'react-router-dom';
import Join from './Join'; // JoinModal 컴포넌트를 import

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const prevCategoryDataRef = useRef<any[]>();

  // 카테고리 테스트 데이터
  const initialCategoryData = [
    {
      id: 1,
      name: "카테고리 1",
      title: "카테고리 1 제목",
      content: "카테고리 1 내용 가져올 공간",
    },
    {
      id: 2,
      name: "카테고리 2",
      title: "카테고리 2 제목",
      content: "카테고리 2 내용 가져올 공간",
    },
  ];

  const updateCategoryData = (data: any[]) => {
    prevCategoryDataRef.current = categoryData;
  };

  useEffect(() => {
    console.log('이전 categoryData:', prevCategoryDataRef.current); 
  }, [categoryData]);

  const handleLoginButtonClick = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      console.log('로그인 성공:', token);
    }
  }, [location]);

  // 세션 데이터 상태
  const [sessionData, setSessionData] = useState<{ CUST_ID: string; CUST_IMG: string } | null>(null);

  useEffect(() => {
    // 세션 데이터를 가져오는 함수
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/api/api/getUserData', {
          method: 'get',
          credentials: 'include', // 세션 쿠키를 전송하기 위한 옵션
        });
        console.log(response);
        
        if (response.ok) {
          const data = await response.json();
          console.log('세션 데이터:', data);

          // 세션 데이터 설정
          setSessionData(data);

          // 서버에서 받은 세션 데이터를 헤더에 추가해서 보낼 수 있습니다.
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${data.token}`); // 예시: 토큰을 인증 헤더에 추가

          // 이후 헤더 정보를 사용하여 API 요청을 보낼 수 있습니다.
          // 예시: fetch('/api/someEndpoint', { headers, method: 'GET' });

        } else {
          console.error('세션 데이터 요청 실패');
        }
      } catch (error) {
        console.error('세션 데이터 요청 중 오류 발생', error);
      }
    };

    fetchSessionData();
  }, [location]);

  // 모달 열기 함수
  const openJoinModal = () => {
    setJoinModalOpen(true);
  };

  // 모달 닫기 함수
  const closeJoinModal = () => {
    setJoinModalOpen(false);
  };

  // 모달 열림 상태를 저장하는 상태 변수
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <div id="main-Whitespace"/>
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={initialCategoryData} />

      {/* 회원 가입 모달 */}
      {isJoinModalOpen && <Join />}
      
      <button onClick={openJoinModal}>회원 가입</button>
    </div>
  );
};

export default Main;
