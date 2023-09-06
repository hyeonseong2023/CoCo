// Login.js
import React, { useState, useEffect } from 'react';
import '../css/Login.css';
import logoimg from '../img/Logo.png';
type LoginProps = {
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    onClose(); // 로그인이 완료되면 팝업을 닫습니다.
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직을 처리합니다.
    // 로그인이 성공하면 이벤트 핸들러 내에서 원하는 주소로 이동할 수 있습니다.
    // 예: Google 로그인 후 홈 페이지로 이동
    window.location.href = "http://localhost:8099/login/getGoogleAuthUrl"; // 변경하려는 주소로 수정하세요.
  };
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직을 처리합니다.
    // 로그인이 성공하면 closePopup()을 호출하여 팝업을 닫습니다.
  };

  // 컴포넌트가 처음 렌더링될 때 바로 팝업 열기
  useEffect(() => {
    openPopup();
  }, []);

function Login() {
  return (
    <div id='logbox'>
      {isPopupOpen && (
        <div className="modal-overlay">
          
          <div className="modal-content">
          <div id='logbox-container'><img src={logoimg} alt="" /><button className="close-button" onClick={closePopup}>X</button></div>
          <div id='loginbox-container'>
          <h2>COCO에 오신 것을 환영합니다!</h2>
            <div className="popup">
              <div>
              <button onClick={handleGoogleLogin} id='googlelogin'>
              <svg width="50" height="50" fill="none" viewBox="0 0 20 20"><path fill="#4285F4" d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33z"></path><path fill="#34A853" d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.256 5.122 5.492 9.11 5.492z"></path><path fill="#FBBC05" d="M4.398 11.937a6.008 6.008 0 0 1-.34-1.971c0-.687.125-1.351.329-1.971l-.006-.132-3.188-2.42-.104.05A9.79 9.79 0 0 0 .001 9.965a9.79 9.79 0 0 0 1.088 4.473l3.309-2.502z"></path><path fill="#EB4335" d="M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853z"></path></svg>
              
              </button>
              Google 로그인
              </div>
              <div>
              <button onClick={handleKakaoLogin} id='kakaologin'>
              <svg id="Bold" enable-background="new 0 0 24 24" width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.462 9.306-.692 1.951h1.383z"></path><path d="m12 1c-6.627 0-12 4.208-12 9.399 0 3.356 2.246 6.301 5.625 7.963-1.299 4.45-1.333 4.47-1.113 4.599.276.161.634-.005 5.357-3.311.692.097 1.404.148 2.131.148 6.627 0 12-4.208 12-9.399s-5.373-9.399-12-9.399zm-5.942 12.023c0 .362-.311.657-.692.657s-.692-.295-.692-.657v-4.086h-1.08c-.375 0-.679-.302-.679-.673s.303-.674.678-.674h3.545c.375 0 .679.302.679.673s-.305.674-.679.674h-1.08zm5.378.648c-.72 0-.587-.565-.919-1.195h-2.111c-.329.625-.2 1.195-.919 1.195-.693.001-.815-.421-.604-1.071l1.656-4.33c.117-.33.471-.669.922-.679.452.01.807.349.923.679 1.093 3.39 2.654 5.402 1.052 5.401zm3.939-.092h-2.221c-1.159 0-.454-1.565-.663-5.301 0-.379.317-.688.707-.688s.707.308.707.688v4.04h1.471c.366 0 .663.283.663.63-.001.348-.298.631-.664.631zm5.419-.518c-.025.181-.122.344-.269.454-.955.721-1.661-1.381-2.593-2.271l-.24.239v1.5c0 .38-.31.688-.693.688-.382 0-.692-.308-.692-.688v-4.705c0-.379.31-.688.692-.688s.692.308.692.688v1.478c1.277-.958 1.985-2.67 2.792-1.869.792.786-.848 1.474-1.527 2.422 1.604 2.212 1.909 2.267 1.838 2.752z"></path></svg>
              </button>
              Kakao 로그인
              </div>
            </div>
          </div>
          </div>
         
        </div>
      )}
    </div>
  );
};
}

export default Login