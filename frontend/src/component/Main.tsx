import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import Header from './Header';
import Banner from './Banner';
import Contents from './Contents';
import CategoryBox from './CategoryBox';
import axios from 'axios';
import TopPosts from './TopPosts';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { promises } from 'dns';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [newPageData, setNewPageData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); 
  const [IsMyPosts, setIsMyPosts] = useState<boolean>(false); 
  let pore = 0;
  const maxEndpoint = 99;
  const pageSize = 6;
  const initialLoad = useState<boolean>(false)[0];
  
  // 북마크 데이터를 저장할 상태 추가
  const [bookmarkData, setBookmarkData] = useState<any[]>([]);

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
    if (currentPage < maxEndpoint && !isRefreshing && !isApplied && !isBookmarked) {
      const nextPage = currentPage + 1;
      setIsRefreshing(true);
  
      const requestData = {
        skill_name: selectedLanguage,
        board_position: selectedPosition,
        endpoint: nextPage
      };
  
      try {
        requestData.endpoint *= pageSize;
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
          setCategoryData((prevData) => [...prevData, ...fetchedData]);
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
      } finally {
        setIsRefreshing(false);
      }
    }
  };
  
  useEffect(() => {
    const initialRequestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage
    };

    fetchData(initialRequestData);
    initialLoad && handleExpandPageClick();
  }, [selectedLanguage, selectedPosition, currentPage, initialLoad, isBookmarked, isApplied]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
    setCurrentPage(1);
    setCategoryData([]);
  };

  const handleLoginButtonClick = (): void => {

  };

  const fetchDataAndUpdateState = async (url: string, stateUpdater: (data: any) => void) => {
    try {
      const custId = Cookies.get('CUST_ID');
      const response = await axios.get(url + `?cust_id=${custId}`);
      if (response.status === 200) {
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
          stateUpdater(fetchedData);
        }
      } else {
        console.error("Data retrieval failed.");
      }
      console.log(response);
    } catch (error) {
      console.error("Data retrieval error:", error);
    }
  };

  const fetchData = async (requestData: any) => {
    try {
      requestData.endpoint *= pageSize;
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

  const handleMoreButtonClick = (): void => {
    handleExpandPageClick();
  };

  useEffect(() => {
    if (!isRefreshing) {
      const initialRequestData = {
        skill_name: selectedLanguage,
        board_position: selectedPosition,
        endpoint: currentPage
      };

      fetchData(initialRequestData);
      initialLoad && handleExpandPageClick();
    }
  }, [selectedLanguage, selectedPosition, currentPage, initialLoad, isBookmarked, isApplied, isRefreshing]);

  const handleBookmarkToggle = async (): Promise<void> => {
    setIsBookmarked(!isBookmarked);

    // 북마크 토글 시 북마크 데이터 업데이트 또는 초기화
    if (isBookmarked) {
      setBookmarkData([]);
    } else {
      await fetchDataAndUpdateState('http://localhost:8099/bookmark', setBookmarkData);
    }
  };

  const handleAppliedToggle = async (): Promise<void> => {
    setIsApplied(!isApplied);
    await fetchDataAndUpdateState('http://localhost:8099/apply', setCategoryData);
  };

  const onMyPostsToggle = async ():Promise<void> =>{
    setIsMyPosts(!IsMyPosts);
    await fetchDataAndUpdateState('http://localhost:8099/writelist', setCategoryData);
  }

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <TopPosts />
      <CategoryBox
        onUpdateData={updateCategoryData}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedPosition={setSelectedPosition}
        isBookmarked={isBookmarked}
        isApplied={isApplied}
        onBookmarkToggle={handleBookmarkToggle}
        onAppliedToggle={handleAppliedToggle}
        onMyPostsClick={onMyPostsToggle}
      />
      <div className="contents-container">

        <Contents categoryData={isBookmarked ? bookmarkData : categoryData} />
      </div>
      <div className="more-button-container">
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
