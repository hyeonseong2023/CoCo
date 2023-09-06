import React, { useState, useEffect, useRef} from 'react';
import '../css/Main.css'
import Header from '../component/Header'
import Banner from '../component/Banner'
import Contents from './Contents'
import CategoryBox from './CategoryBox'
import { useLocation } from 'react-router-dom'; // useLocation 추가

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const prevCategoryDataRef = useRef<any[]>(); // 이전 categoryData 상태를 저장할 ref 생성

  const updateCategoryData = (data: any[]) => {
    prevCategoryDataRef.current = categoryData; // 현재 categoryData 상태를 이전 상태로 설정
    setCategoryData(data);
  };

  useEffect(() => {
    console.log('이전 categoryData:', prevCategoryDataRef.current); // 이전 categoryData 출력
  }, [categoryData]);
  const handleLoginButtonClick = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
  };

  // useLocation() 훅을 사용하여 현재 URL 정보 가져오기
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      console.log('로그인 성공:', token);
    }
  }, [location]);

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <div id="main-Whitespace"/>
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={categoryData} />
    </div>
  );
};

export default Main;
