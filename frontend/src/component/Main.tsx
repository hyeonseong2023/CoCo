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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isMyPosts, setIsMyPosts] = useState<boolean>(false);
<<<<<<< HEAD
  const maxEndpoint = 99;
  const pageSize = 0;
  const initialLoad = useState<boolean>(false)[0];

  
=======
  const pageSize = 0;
>>>>>>> parent of a15318a (더보기 1차 수정)

  // 북마크 데이터를 저장할 상태 추가
  const [bookmarkData, setBookmarkData] = useState<any[]>([]);
  const [Data1, setData1] = useState<any[]>([]);
  const [Data2, setData2] = useState<any[]>([]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const handleExpandPageClick = async (): Promise<void> => {
    if (currentPage < maxEndpoint && !isRefreshing && !isApplied && !isBookmarked && !isMyPosts) {
      const nextPage = currentPage + 6;
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
          // 새로운 데이터를 현재 데이터에 추가
          setCategoryData((prevData) => [...prevData, ...fetchedData]);
          setCurrentPage(nextPage); // 페이지 번호를 업데이트
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
<<<<<<< HEAD
  
=======

  const fetchData = async (requestData: { skill_name?: string | null; board_position?: string | null; endpoint: any; cust_id?: any; }) => {
    try {
      requestData.endpoint = requestData.endpoint * pageSize;
      requestData.cust_id = Cookies.get('CUST_ID');
      const response = await axios.post('http://localhost:8099/select', requestData);

      const fetchedData = response.data.map(mapData);

      if (fetchedData.length === 0) {
        console.warn("No data received.");
      } else {
        setCategoryData((prevData) => [...prevData, ...fetchedData]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

>>>>>>> parent of a15318a (더보기 1차 수정)
  useEffect(() => {
    const initialRequestData = {
      skill_name: selectedLanguage,
      board_position: selectedPosition,
      endpoint: currentPage
    };

    fetchData(initialRequestData);
    initialLoad && handleExpandPageClick();
  }, [selectedLanguage, selectedPosition, currentPage, initialLoad, isBookmarked, isApplied, isMyPosts]);

  const updateCategoryData = (selectedCategory: string | null) => {
    setSelectedLanguage(selectedCategory);
    setSelectedPosition(selectedCategory);
    setCurrentPage(1);
    setCategoryData([]);
  };

  const handleLoginButtonClick = (): void => {
    // 로그인 버튼 클릭 핸들러
  };

  const fetchDataAndUpdateState = async (url: string, stateUpdater: (data: any) => void) => {
    try {
      const custId = Cookies.get('CUST_ID');
      const response = await axios.get(url + `?cust_id=${custId}`);
      if (response.status === 200) {
        let fetchedData;
        if (url.includes('bookmark')) {
          // 북마크로 가져올 때는 데이터가 data에 바로 들어감
          fetchedData = response.data;
        } else {
          // 다른 토글 버튼으로 가져올 때는 data.data에 데이터가 들어감
          fetchedData = response.data;
        }
        if (fetchedData && fetchedData.length === 0) {
          console.warn("No data received.");
        } else if (fetchedData) { // fetchedData가 유효한 경우에만 처리
          const processedData = fetchedData.map((item: any) => {
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
          stateUpdater(processedData);

        }
      } else {
        console.error("Data retrieval failed.");
      }

    } catch (error) {
      console.error("Data retrieval error:", error);
    }
  };

  const fetchData = async (requestData: any) => {
    try {
      requestData.endpoint *= pageSize;
      requestData.cust_id = Cookies.get('CUST_ID');
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
          cust_nick: item.cust_nick,
          skill_names: item.skill_names,
          cust_img: item.cust_img,
          bmkimg: item.bmkimg
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
      try {
        const custId = Cookies.get('CUST_ID');
        const response = await axios.get(`http://localhost:8099/apply?cust_id=${custId}`);
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
              cust_nick: item.cust_nick,
              cust_img: item.cust_img,
              bmkimg: item.bmkimg
              
            };
          });
          
          if (fetchedData.length === 0) {
            console.warn("No data received.");
          } else {
            setData1(fetchedData);
          }
        } else {
          console.error("Data retrieval failed.");
        }
      } catch (error) {
        console.error("Data retrieval error:", error);
      }
    }
  };

  const onMyPostsToggle = async (): Promise<void> => {
    setIsMyPosts(!isMyPosts);
    setIsApplied(false);
    setIsBookmarked(false);

    if (isMyPosts) {
      setData2([]);
    } else {
      try {
        const custId = Cookies.get('CUST_ID');
        const response = await axios.get(`http://localhost:8099/writelist?cust_id=${custId}`);
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
              cust_nick: item.cust_nick,
              cust_img: item.cust_img,
              bmkimg: item.bmkimg
            };
          });

          if (fetchedData.length === 0) {
            console.warn("No data received.");
          } else {
            setData2(fetchedData);
          }
        } else {
          console.error("Data retrieval failed.");
        }
      } catch (error) {
        console.error("Data retrieval error:", error);
      }
    }
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
