import React from 'react';
import '../css/Main.css'
import Header from '../component/Header'
import Banner from '../component/Banner'
import Contents from './Contents'

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const handleLoginButtonClick = () => {
    console.log('로그인 버튼이 클릭되었습니다.');
  };

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <Contents />
    </div>
  );
};

export default Main;
