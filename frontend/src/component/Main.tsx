// Main.tsx
import React, { useState } from 'react';
import '../css/Main.css'
import Header from '../component/Header'
import Banner from '../component/Banner'
import Contents from './Contents'
import CategoryBox from './CategoryBox'

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]); // 카테고리 데이터를 저장할 상태

  // 카테고리 박스에서 데이터를 업데이트하는 함수
  const updateCategoryData = (data: any[]) => {
    setCategoryData(data);
  };

  const handleLoginButtonClick = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
  };

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
