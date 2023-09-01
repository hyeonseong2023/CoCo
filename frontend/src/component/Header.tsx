import React, { useState } from 'react';
import '../css/Header.css';

type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  return(
    // 리턴용 컨테이너는 건드리지 말것
    <div>
      <div>
        <div>
          <div>로고</div>
          <div>
            <div>글쓰기</div>
            <div>로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
