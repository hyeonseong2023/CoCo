import React, { useState } from 'react';
import PageList from './PageList';
import Members from './Members';

const SideBar = ({
  setSelectedMenu,
}: {
  setSelectedMenu: (e: string) => void;
}) => {
  const [toggleMembers, setToggleMembers] = useState(false);
  return (
    <div>
      <div>홈</div>
      <div>
        <div style={{ pointerEvents: 'auto', position: 'relative' }}>
          {toggleMembers && <Members setToggleMembers={setToggleMembers} />}
          <div
            onClick={() => {
              setToggleMembers(true);
            }}
          >
            참여인원
          </div>
        </div>
        <div
          onClick={() => {
            setSelectedMenu('Settings');
          }}
        >
          설정
        </div>
        <div
          onClick={() => {
            setSelectedMenu('Planner');
          }}
        >
          일정관리
        </div>
        <div>화상회의</div>
        <div
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
