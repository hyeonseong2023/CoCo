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
  // <<<<<<< HEAD
  //   const prevCategoryDataRef = useRef<any[]>([]);
  //   const [newData, setNewData] = useState<any[]>([]); // 사용할 데이터 상태

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:8099/recent?endpoint=1");

  //         const fetchedData = response.data.map((item: { recentList: any }) => {
  //           const recentListData = item.recentList;
  //           return {
  //             id: recentListData.board_id,
  //             name: recentListData.board_title,
  //             title: recentListData.board_title,
  //             content: recentListData.board_content,
  //             board_deadline: recentListData.board_deadline,
  //             board_dt: recentListData.board_dt,
  //             board_members: recentListData.board_members,
  //             board_openlink: recentListData.board_openlink,
  //             board_period: recentListData.board_period,
  //             board_position: recentListData.board_position,
  //             board_views: recentListData.board_views,
  //             cust_id: recentListData.cust_id,
  //             pro_img: recentListData.pro_img,
  //             pro_link: recentListData.pro_link,
  //             pro_title: recentListData.pro_title,
  //           };
  //         });
  //         setNewData(fetchedData); // 데이터 상태 업데이트
  //       } catch (error) {
  //       }
  //     };

  //     fetchData();
  //   }, []);
  //   const updateCategoryData = (data: any[]) => {
  //     prevCategoryDataRef.current = categoryData;
  //   };

  //   const handleLoginButtonClick = () => {
  //   };

  //@@@@@@@@@@@@ webrtc 시작

  // 임시로 board_id 설정
  const BOARD_ID = 1;
  const wrUrl = 'http://localhost:4000/';

  // 제출 버튼 클릭 시 board_id Back으로 전송
  const handleClick = async () => {
    // http://localhost:8099/webrtc 로 요청
    // 보낼 때 board_id도 같이 보내야 함
    axios.get('http://localhost:8099/webrtc', { params: { board_id: BOARD_ID } })
      .then(async (res) => {
        // res.data : 프로젝트 링크 uuid
        const roomName = res.data;
        // 임시 유저 이름, 후에 세션의 닉네임 받아서 넣어야 함
        const userName = "user1";
        const response = await axios.post(`${wrUrl}saveData`, {
          roomName,
          userName,
        });
        // 클라이언트 측에서 서버로부터 받은 HTTP 응답의 상태 코드를 확인하는 부분
        // 200 : 성공
        if (response.status === 200) {
          window.location.href = wrUrl;
        } else {
          console.error("Failed to save data");
        }
      })
      .catch((error) => {
        console.log('' + error);
      });
  };

  //@@@@@@@@@@@@ webrtc 끝

  // =======
  const [selectedCategory, setSelectedCategory] = useState("javascript");

  // 데이터 가져오는 함수
  const fetchData = async (category: string) => {
    try {
      const response = await axios.get(`http://localhost:8099/recent?endpoint=1`);

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
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const updateCategoryData = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  function handleLoginButtonClick(): void {
  }
  console.log(selectedCategory);

  // >>>>>>> main
  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <Banner />
      <TopPosts />
      <button onClick={handleClick}>webrtc</button>
      {/* <<<<<<< HEAD */}
      <div id="main-Whitespace" />
      {/* >>>>>>> main */}
      <CategoryBox onUpdateData={updateCategoryData} />
      <Contents categoryData={categoryData} />
    </div>
  );
};

export default Main;
