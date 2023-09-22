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
    if (currentPage < 5) {
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
        };
      });

      console.log(response);

      setCategoryData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const requestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: 0
    };
    fetchData(requestData);
  }, [selectedLanguage, selectedPosition]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
  };

  const handleLoginButtonClick = (): void => {

  };

  useEffect(() => {
    const requestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage // 현재 페이지에 따라 endpoint 값을 설정
    };
    fetchData(requestData);
  }, [selectedLanguage, selectedPosition, currentPage]);

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
