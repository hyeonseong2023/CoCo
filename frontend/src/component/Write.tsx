import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import '../css/Write.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Write = () => {
  const [formData, setFormData] = useState(new FormData());

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes("recruitmentInfo")) {
      // 모집 정보 입력 필드의 경우
      const [parentName, childName] = name.split(".");
      formData.append(name, value);
    } else {
      // 다른 입력 필드의 경우
      formData.append(name, value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8099/postsaveinfor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('게시글이 성공적으로 저장되었습니다.');
      } else {
        console.error('게시글 저장 실패');
      }
    } catch (error) {
      console.error('오류 발생: ', error);
    }
  };

  return (
    <div className="write-container">
      <Header />

      <form className="write-form" onSubmit={handleSubmit}>
        <div className='write-submitSet'>
          <h2>게시글 작성</h2>
          <button type="submit" className="submit-button">
            작성
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.get("title") as string}
            onChange={handleInputChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <h3>모집 정보</h3>
          <div className="form-subgroup">
            <label htmlFor="recruitmentCount">모집 인원:</label>
            <input
              type="number"
              id="recruitmentCount"
              name="recruitmentInfo.recruitmentCount"
              value={formData.get("recruitmentInfo.recruitmentCount") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="techStack">기술 스택:</label>
            <input
              type="text"
              id="techStack"
              name="recruitmentInfo.techStack"
              value={formData.get("recruitmentInfo.techStack") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="duration">진행 기간:</label>
            <input
              type="text"
              id="duration"
              name="recruitmentInfo.duration"
              value={formData.get("recruitmentInfo.duration") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="position">포지션:</label>
            <input
              type="text"
              id="position"
              name="recruitmentInfo.position"
              value={formData.get("recruitmentInfo.position") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="startDate">시작일:</label>
            <input
              type="text"
              id="startDate"
              name="recruitmentInfo.startDate"
              value={formData.get("recruitmentInfo.startDate") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="openTalkLink">오픈톡 링크:</label>
            <input
              type="text"
              id="openTalkLink"
              name="recruitmentInfo.openTalkLink"
              value={formData.get("recruitmentInfo.openTalkLink") as string}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <br />
          <br />
          <div className="form-subgroup"></div>
          <div className="form-group">
            <label htmlFor="content">내용:</label>
            <textarea
              id="content"
              name="content"
              value={formData.get("content") as string}
              onChange={handleInputChange}
              required
              className="textarea-field"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
