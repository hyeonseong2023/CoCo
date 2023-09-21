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
