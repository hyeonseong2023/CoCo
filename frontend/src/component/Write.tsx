import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import '../css/Write.css';
import Cookies from 'js-cookie';
const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recruitmentInfo, setRecruitmentInfo] = useState({
    recruitmentCount: 0,
    techStack: '',
    duration: '',
    position: '',
    startDate: '',
    openTalkLink: '',
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleRecruitmentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecruitmentInfo({
      ...recruitmentInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      CUST_ID: Cookies.get('CUST_ID'), // Replace with actual user ID
      BOARD_MEMBERS: recruitmentInfo.recruitmentCount,
      BOARD_PERIOD: recruitmentInfo.duration,
      BOARD_DEADLINE: recruitmentInfo.startDate,
      BOARD_TITLE: title,
      BOARD_CONTENT: content, // 컨텐츠 내용 추가
      BOARD_OPENTALK: recruitmentInfo.openTalkLink,
      BOARD_POSITION: recruitmentInfo.position,
      PRO_TITLE: 'Project Title', 
      PRO_LINK: recruitmentInfo.openTalkLink,
      PRO_IMG: 'project-image.jpg', 
      SKILL_ID: '1', // Replace with actual skill ID
      BOARD_IMG: 'board-image.jpg', // Replace with actual image
    };

    try {
      const response = await fetch('http://localhost:8099/postsaveinfor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 200) {
        console.log('게시글이 성공적으로 저장되었습니다.');
      } else {
        console.error('게시글 저장 실패');
      }
    } catch (error) {
      console.error('오류 발생: ', error);
    }

    setTitle('');
    setContent('');
    setRecruitmentInfo({
      recruitmentCount: 0,
      techStack: '',
      duration: '',
      position: '',
      startDate: '',
      openTalkLink: '',
    });
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
            value={title}
            onChange={handleTitleChange}
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
              name="recruitmentCount"
              value={recruitmentInfo.recruitmentCount}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="techStack">기술 스택:</label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={recruitmentInfo.techStack}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="duration">진행 기간:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={recruitmentInfo.duration}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="position">포지션:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={recruitmentInfo.position}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="startDate">시작일:</label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              value={recruitmentInfo.startDate}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="openTalkLink">오픈톡 링크:</label>
            <input
              type="text"
              id="openTalkLink"
              name="openTalkLink"
              value={recruitmentInfo.openTalkLink}
              onChange={handleRecruitmentInfoChange}
              className="input-field"
            />
          </div>
        <br/>
        <br/>
          <div className="form-subgroup"></div>
          <div className="form-group">
            <label htmlFor="content">내용:</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
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
