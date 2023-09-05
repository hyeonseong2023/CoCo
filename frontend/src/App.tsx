import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Write from './component/Write';
import Mypage from './component/Mypage'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className='main-div'>
        <Routes>
          <Route path="/write" element={<Write />} />
          <Route path="/" element={<Main />} /> {/* 기본 경로 */}
          <Route path="/Mypage" element={<Mypage />} /> {/* 기본 경로 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
