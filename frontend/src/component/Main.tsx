import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import Header from './Header';
import Banner from './Banner';
import Contents from './Contents';
import CategoryBox from './CategoryBox';
import axios from 'axios';
import TopPosts from './TopPosts';

type MainProps = {};

const Main: React.FC<MainProps> = ({ }) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null); // 기본값을 null로 설정
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null); // 기본값을 null로 설정

  // 데이터 가져오는 함수
  const fetchData = async (requestData: any) => {
    try {
      const response = await axios.post('http://localhost:8099/select', requestData);

      const fetchedData = response.data.map((item: any) => {
        return {
          id: item.board_id,
          name: item.board_title,
          title: item.board_title,
          content: item.board_content,
          board_deadline: item.board_deadline,
          board_dt: item.board_dt,
          board_members: item.board_members,
          board_openlink: item.board_openlink,
          board_period: item.board_period,
          board_position: item.board_position,
          board_views: item.board_views,
          cust_id: item.cust_id,
          pro_img: item.pro_img,
          pro_link: item.pro_link,
          pro_title: item.pro_title,
          
        };
      });
      setCategoryData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData({
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: 1
    });
  }, []);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory); // 포지션도 같은 값을 사용하려면 이렇게 추가
  };

  function handleLoginButtonClick(): void {
  }
  console.log(categoryData);
  
  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <TopPosts />
      <CategoryBox
        onUpdateData={updateCategoryData}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedPosition={setSelectedPosition}
      />

      <Contents categoryData={categoryData} />
    </div>
  );
};

export default Main;
