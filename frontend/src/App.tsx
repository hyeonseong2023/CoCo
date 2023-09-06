import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Write from './component/Write';
import Mypage from './component/Mypage';

import KakaoCallback from './component/Kakao/KakaoCallback';
import KakaoJoin from './component/Kakao/KakaoJoin';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className='main-div'>
        <Routes>
          <Route path="/write" element={<Write />} />
          <Route path="/" element={<Main />} /> {/* 기본 경로 */}
          <Route path="/Mypage" element={<Mypage />} /> {/* 마이페이지 경로 */}
          <Route path="/callback/*" element={<Main />} /> {/* 기본 경로 */}
          {/* 카카오 로그인과 관련된 라우트 추가 */}

          <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
          <Route path='/join' element={<KakaoJoin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
