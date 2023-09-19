import React, { useState, useEffect, useRef } from 'react';
import '../css/Main.css'
import Header from './Header'
import Banner from './Banner'
import Contents from './Contents'
import CategoryBox from './CategoryBox'
import axios from 'axios';
import TopPosts from './TopPosts';

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const prevCategoryDataRef = useRef<any[]>([]);
  const [newData, setNewData] = useState<any[]>([]); // 사용할 데이터 상태
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8099/recent?endpoint=1");
  
        const fetchedData = response.data.map((item: { recentList: any }) => {
          const recentListData = item.recentList;
          return {
            id: recentListData.board_id,
            name: recentListData.board_title,
            title: recentListData.board_title,
            content: recentListData.board_content,
            board_deadline: recentListData.board_deadline,
            board_dt: recentListData.board_dt,
            board_members: recentListData.board_members,
            board_openlink: recentListData.board_openlink,
            board_period: recentListData.board_period,
            board_position: recentListData.board_position,
            board_views: recentListData.board_views,
            cust_id: recentListData.cust_id,
            pro_img: recentListData.pro_img,
            pro_link: recentListData.pro_link,
            pro_title: recentListData.pro_title,
          };
        });
        setNewData(fetchedData); // 데이터 상태 업데이트
      } catch (error) {
      }
    };
    console.log(newData);
    
    fetchData();
  }, []);
  const updateCategoryData = (data: any[]) => {
    prevCategoryDataRef.current = categoryData;
  };

  const handleLoginButtonClick = () => {
  };

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <TopPosts />
      <div id="main-Whitespace"/>
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={newData} />
    </div>
  );
};

export default Main;
