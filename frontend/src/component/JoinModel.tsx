import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../css/JoinModel.css';

type FormData = {
  username: string;
  email: string;
  nickname: string;
  job: string;
  experience: string;
  interests: string;
};

type JoinModelProps = {
  onClose: () => void;
};

const JoinModel: React.FC<JoinModelProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    nickname: '',
    job: '',
    experience: '',
    interests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  Cookies.remove('coin');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Cookies.remove('CUST_ID');
    Cookies.remove('CUST_IMG');

    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>

          {/* 이메일 입력란 */}
          <label>
            이메일: {Cookies.get('CUST_ID')}
          </label>
          <br />

          {/* 닉네임 입력란 */}
          <label>
            닉네임: 
            <input
              name="nickname"
              className="select-field"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>
          <br />

          {/* 직무 선택 */}
          <label>
            직무: 
            <select
              name="job"
              className="select-field"
              value={formData.job}
              onChange={handleChange}
            >
              <option value="백엔드">백엔드</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="디자이너">디자이너</option>
              <option value="IOS">IOS</option>
              <option value="안드로이드">안드로이드</option>
              <option value="데브옵스">데브옵스</option>
              <option value="PM<">PM</option>
              <option value="기획자">기획자</option>
              {/* 다른 직무 옵션들 추가 */}
            </select>
          </label>
          <br />

          {/* 경력 선택 */}
          <label>
            경력: 
            <select
              name="experience"
              className="select-field"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="신입">신입</option>
              <option value="1년">1년</option>
              <option value="2년">2년</option>
              <option value="3년">3년</option>
              <option value="4년">4년</option>
              <option value="10년">5년 이상</option>
              {/* 다른 경력 옵션들 추가 */}
            </select>
          </label>
          <br />

          {/* 관심 스택 선택 */}
          <label>
            관심스택: 
            <select
              name="interests"
              className="select-field"
              value={formData.interests}
              onChange={handleChange}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="React">React</option>
              <option value="Spring">Spring</option>
              <option value="C">C</option>
            </select>
          </label>
          <br />

          <button type="submit">가입하기</button>
        </form>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default JoinModel;
