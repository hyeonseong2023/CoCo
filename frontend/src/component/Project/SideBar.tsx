import React, { useState } from 'react';
import PageList from './PageList';
import Members from './Members';
import coco from '../../img/CoCo.png';
import axios from 'axios';
import Cookies from 'js-cookie';

const SideBar = ({
  setSelectedMenu,
}: {
  setSelectedMenu: (e: string) => void;
}) => {
  const [toggleMembers, setToggleMembers] = useState(false);


  const BOARD_ID = 1;
  // 4000
  // const wrUrl = process.env.REACT_APP_URL_4000;
  const wrUrl = 'http://localhost:4000';

  // 제출 버튼 클릭 시 board_id Back으로 전송
  const handleClick = async () => {
    // http://localhost:8099/webrtc 로 요청
    axios.get(`${process.env.REACT_APP_URL_8099}/webrtc`, { params: { board_id: BOARD_ID } })
      .then(async (res) => {
        console.log("스프링 통신 완료");
        // res.data : 프로젝트 링크 uuid
        const roomName = res.data;
        console.log(roomName);
        // 임시 유저 이름, 후에 세션의 닉네임 받아서 넣어야 함
        const userName = Cookies.get('CUST_ID');
        const response = await axios.post(`${wrUrl}/saveData`, {
          roomName,
          userName,
        });
        // 클라이언트 측에서 서버로부터 받은 HTTP 응답의 상태 코드를 확인하는 부분
        // 200 : 성공
        if (response.status === 200) {
          console.log("노드 통신 완료");

          window.open(wrUrl, '_blank');
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
    <div className="pro-side-container">
      <div>
        <a href="/">
          <img className="pro-side-img-coco" src={coco} alt=""></img>
        </a>
      </div>
      <div>
        <div style={{ pointerEvents: 'auto', position: 'relative' }}>
          {toggleMembers && <Members setToggleMembers={setToggleMembers} />}
          <div
            style={{}}
            className="pro-side-menu-container"
            onClick={() => {
              setToggleMembers(true);
            }}
          >
            <img
              className="pro-side-img"
              src={process.env.PUBLIC_URL + '/projectImg/members.png'}
              alt=""
            ></img>
            <div>참여인원</div>
          </div>
        </div>
        <div
          className="pro-side-menu-container"
          onClick={() => {
            setSelectedMenu('Settings');
          }}
        >
          <img
            className="pro-side-img"
            src={process.env.PUBLIC_URL + '/projectImg/settings.png'}
            alt=""
          ></img>
          <div>설정</div>
        </div>
        <div
          className="pro-side-menu-container"
          onClick={() => {
            setSelectedMenu('Planner');
          }}
        >
          <img
            className="pro-side-img"
            src={process.env.PUBLIC_URL + '/projectImg/callendar.png'}
            alt=""
          ></img>
          <div>일정관리</div>
        </div>
        <div className="pro-side-menu-container" onClick={handleClick}>
          <img
            className="pro-side-img"
            src={process.env.PUBLIC_URL + '/projectImg/video.png'}
            alt=""
          ></img>
          <div>화상회의</div>
        </div>
        <div
          className="pro-side-document-container"
          onClick={() => {
            setSelectedMenu('Page');
          }}
        >
          <PageList></PageList>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
