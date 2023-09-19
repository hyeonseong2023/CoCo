import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import Header from './Header';
import Banner from './Banner';
import Contents from './Contents';
import CategoryBox from './CategoryBox';
import axios from 'axios';
import TopPosts from './TopPosts';

type MainProps = {};

const Main: React.FC<MainProps> = ({}) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("javascript");

  // 데이터 가져오는 함수
  const fetchData = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:8099/recent?endpoint=1&category=${category}`);

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

      setCategoryData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // 페이지 로딩 시 기본 카테고리로 데이터 가져오기
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const updateCategoryData = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  function handleLoginButtonClick(): void {
    // 로그인 버튼 클릭 처리
  }

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <TopPosts />
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={categoryData} />
    </div>
  );
};

export default Main;
