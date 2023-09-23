import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import Header from './Header';
import Banner from './Banner';
import Contents from './Contents';
import CategoryBox from './CategoryBox';
import axios from 'axios';
import TopPosts from './TopPosts';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleNextPageClick = (): void => {
    if (currentPage < 10) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPageClick = (): void => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

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
          cust_nick: item.cust_nick
        };
      });
  
      if (fetchedData.length === 0) {
        // 응답 데이터가 비어있을 때
        console.warn("No data received.");
        // 원하는 처리를 여기에 추가 (예: 메시지 표시 등)
      } else {
        setCategoryData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
  
      setSelectedLanguage(null);
      setSelectedPosition(null);
      setCurrentPage(1);
  
      const requestData = {
        skill_name: null,
        board_position: null,
        endpoint: 1
      };
      fetchData(requestData);
    }
  };

  useEffect(() => {
    const requestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage
    };
    fetchData(requestData);
  }, [selectedLanguage, selectedPosition, currentPage]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
    setCurrentPage(1); 
  };

  const handleLoginButtonClick = (): void => {

  };

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
      <div>
        <button onClick={handlePrevPageClick} disabled={currentPage === 1}>
          이전 페이지
        </button>
        <button onClick={handleNextPageClick} disabled={currentPage === 5}>
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default Main;
