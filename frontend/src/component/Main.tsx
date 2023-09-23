import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import Header from './Header';
import Banner from './Banner';
import Contents from './Contents';
import CategoryBox from './CategoryBox';
import axios from 'axios';
import TopPosts from './TopPosts';
import Footer from './Footer';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const maxEndpoint = 99; // 최대 endpoint 값

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleNextPageClick = (): void => {
    if (currentPage < maxEndpoint) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPageClick = (): void => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleExpandPageClick = async (): Promise<void> => {
    if (currentPage < maxEndpoint) {
      const nextPage = currentPage + 1;
      const requestData = {
        skill_name: selectedLanguage,
        board_position: selectedPosition,
        endpoint: nextPage
      };

      try {
        requestData.endpoint *= 6;
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
          console.warn("No data received.");
        } else {
          // 기존 데이터와 새로운 페이지 데이터를 합칩니다.
          setCategoryData([...categoryData, ...fetchedData]);
          setCurrentPage(nextPage);
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
    }
  };

  useEffect(() => {
    const initialRequestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage
    };

    // 초기 데이터를 가져오기 위해 fetchData 함수 호출
    fetchData(initialRequestData);
  }, [selectedLanguage, selectedPosition, currentPage]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
    setCurrentPage(1); 
  };

  const handleLoginButtonClick = (): void => {
    // 로그인 버튼 클릭 시 로직 추가
  };

  // fetchData 함수 정의
  const fetchData = async (requestData: any) => {
    try {
      requestData.endpoint *= 6;
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
        console.warn("No data received.");
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

  // "더 보기" 버튼 클릭 핸들러 함수
  const handleMoreButtonClick = (): void => {
    handleExpandPageClick();
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
        <button
          onClick={handleMoreButtonClick}
          disabled={currentPage === maxEndpoint}
          className="more-button"
        >
          더 보기
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
