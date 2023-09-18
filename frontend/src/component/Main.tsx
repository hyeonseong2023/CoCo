import React, { useState, useEffect, useRef } from 'react';
import '../css/Main.css'
import Header from './Header'
import Banner from './Banner'
import Contents from './Contents'
import CategoryBox from './CategoryBox'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const prevCategoryDataRef = useRef<any[]>();

  const fetchData = async () => {
    try {
        const res = await axios.post(`/recent`);
        console.log(res);
        

    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  } , []);

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

  const handleLoginButtonClick = () => {
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      console.log('로그인 성공:', token);
    }
  }, [location]);
  const [sessionData, setSessionData] = useState<{ CUST_ID: string; CUST_IMG: string } | null>(null);


  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  console.log();
  
  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <div id="main-Whitespace"/>
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={initialCategoryData} />
    </div>
  );
};

export default Main;
