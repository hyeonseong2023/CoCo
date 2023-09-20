import React from "react";

const SideBar = ({
  setSelectedMenu,
}: {
  setSelectedMenu: (e: string) => void;
}) => {
  return (
    <div>
      <div
        onClick={() => {
          setSelectedMenu("Page");
        }}
      >
        페이지
      </div>
      <div
        onClick={() => {
          setSelectedMenu("Planner");
        }}
      >
        일정관리
      </div>
    </div>
  );
};

export default SideBar;
