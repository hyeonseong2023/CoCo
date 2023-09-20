import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Write from "./component/Write";
import Mypage from "./component/Mypage";
import Check from "./component/Check";

import KakaoCallback from "./component/Kakao/KakaoCallback";
import "./App.css";
import ProjectPage from "./component/Project/ProjectPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="main-div">
        <Routes>
          <Route path="/write" element={<Write />} />
          <Route path="/" element={<Main />} /> {/* 기본 경로 */}
          <Route path="/Mypage" element={<Mypage />} /> {/* 마이페이지 경로 */}
          <Route path="/callback/*" element={<Main />} /> {/* 기본 경로 */}
          <Route path="/Check" element={<Check />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/pp" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
