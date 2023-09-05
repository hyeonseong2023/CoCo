import React from 'react';
import '../css/Main.css'
import Header from '../component/Header'
import Banner from '../component/Banner'
import Contents from './Contents'
//메인 페이지 컴포넌트
type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const handleLoginButtonClick = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
  };

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <div id="main-Whitespace"/>
      <Contents />
    </div>
  );
};

export default Main;
