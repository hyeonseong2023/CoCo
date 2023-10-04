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

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isMyPosts, setIsMyPosts] = useState<boolean>(false);
  const pageSize = 6;
  const [bookmarkData, setBookmarkData] = useState<any[]>([]);
  const [Data1, setData1] = useState<any[]>([]);
  const [Data2, setData2] = useState<any[]>([]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const fetchDataAndUpdateState = async (url: string, stateUpdater: (data: any[]) => void) => {
    try {
      const custId = Cookies.get('CUST_ID');
      const response = await axios.get(`${url}?cust_id=${custId}`);
      if (response.status === 200) {
        const fetchedData = response.data;

        if (fetchedData.length === 0) {
          console.warn("No data received.");
        } else {
          const processedData = fetchedData.map(mapData);
          stateUpdater(processedData);
        }
      } else {
        console.error("Data retrieval failed.");
      }
    } catch (error) {
      console.error("Data retrieval error:", error);
    }
  };

  const fetchData = async (requestData: { skill_name?: string | null; board_position?: string | null; endpoint: any; cust_id?: any; }) => {
    try {
      requestData.endpoint = requestData.endpoint * pageSize;
      requestData.skill_name = selectedLanguage;
      requestData.board_position = selectedPosition;
      requestData.cust_id = Cookies.get('CUST_ID');
      const response = await axios.post('http://localhost:8099/select', requestData);

      const fetchedData = response.data.map(mapData);

      if (fetchedData.length === 0) {
        console.warn("No data received.");
      } else {
        setCategoryData((prevData) => [...prevData, ...fetchedData]);
      }

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);

    const requestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage + 1,
    };

    fetchData(requestData);
  };

  useEffect(() => {
    if (selectedLanguage || selectedPosition) {
      setCategoryData([]);
      setCurrentPage(0);
    }

    const initialRequestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage
    };

    fetchData(initialRequestData);
  }, [selectedLanguage, selectedPosition, currentPage, isBookmarked, isApplied, isMyPosts]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
    setCurrentPage(1);
    setCategoryData([]);
  };

  const mapData = (item: any) => ({
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
    cust_nick: item.cust_nick,
    bmkimg: item.bmkimg,
    cust_img: item.cust_img
  });

  const handleBookmarkToggle = async (): Promise<void> => {
    setIsBookmarked(!isBookmarked);
    setIsApplied(false);
    setIsMyPosts(false);

    if (isBookmarked) {
      setBookmarkData([]);
    } else {
      await fetchDataAndUpdateState('http://localhost:8099/bookmark', setBookmarkData);
    }
  };

  const handleAppliedToggle = async (): Promise<void> => {
    setIsApplied(!isApplied);
    setIsBookmarked(false);
    setIsMyPosts(false);

    if (isApplied) {
      setData1([]);
    } else {
      await fetchDataAndUpdateState('http://localhost:8099/apply', setData1);
    }
  };

  const onMyPostsToggle = async (): Promise<void> => {
    setIsMyPosts(!isMyPosts);
    setIsApplied(false);
    setIsBookmarked(false);

    if (isMyPosts) {
      setData2([]);
    } else {
      await fetchDataAndUpdateState('http://localhost:8099/writelist', setData2);
    }
  };

  return (
    <div>
      <Header />
      <Banner />
      <TopPosts />
      <CategoryBox
        onUpdateData={updateCategoryData}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedPosition={setSelectedPosition}
        isBookmarked={isBookmarked}
        isApplied={isApplied}
        isMyPosts={isMyPosts}
        onBookmarkToggle={handleBookmarkToggle}
        onAppliedToggle={handleAppliedToggle}
        onMyPostsClick={onMyPostsToggle}
      />
      <div className="contents-container">
        <Contents categoryData={
          isMyPosts ? Data2 : (isBookmarked ? bookmarkData : (isApplied ? Data1 : categoryData))
        } />
      </div>
      <div className={`more-button-container ${isMyPosts || isBookmarked || isApplied ? 'hidden' : ''}`}>
        <button className="more-button" onClick={handleLoadMore}>
          더 보기
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Main;
