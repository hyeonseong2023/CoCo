import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoLogin from './component/Kakao/KakaoLogin';
import KakaoCallback from './component/Kakao/KakaoCallback';
import KakaoJoin from './component/Kakao/KakaoJoin';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className='main-div'>
        <Routes>
          
          {/* 카카오 로그인과 관련된 라우트 추가 */}
          <Route path='/auth/kakao' element={<KakaoLogin />} />
          <Route path='/auth/kakao/callback' element={<KakaoCallback />} />
          <Route path='/join' element={<KakaoJoin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
