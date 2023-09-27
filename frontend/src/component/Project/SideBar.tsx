import React, { useState } from 'react';
import PageList from './PageList';
import Members from './Members';
import coco from '../../img/CoCo.png';

const SideBar = ({
  setSelectedMenu,
}: {
  setSelectedMenu: (e: string) => void;
}) => {
  const [toggleMembers, setToggleMembers] = useState(false);
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
        <div className="pro-side-menu-container">
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
