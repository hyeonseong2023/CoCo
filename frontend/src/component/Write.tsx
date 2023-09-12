import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
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
    startDate: new Date(), // 시작일 기본값 설정
    endDate: new Date(),   // 종료일 기본값 설정
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

  const handleStartDateChange = (date: Date) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      startDate: date,
    });
  };

  const handleEndDateChange = (date: Date) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      endDate: date,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // startDate와 endDate 합치기
    const startDateStr = recruitmentInfo.startDate.toISOString().split('T')[0];
    const endDateStr = recruitmentInfo.endDate.toISOString().split('T')[0];
    const period = `${startDateStr}~${endDateStr}`;

    const formData = new FormData();
    formData.append('CUST_ID', Cookies.get('CUST_ID') || ""); // Replace with actual user ID
    formData.append('BOARD_MEMBERS', String(recruitmentInfo.recruitmentCount)); // 숫자를 문자열로 변환
    formData.append('BOARD_PERIOD', period); // 시작일과 종료일 합친 문자열
    formData.append('BOARD_TITLE', title);
    formData.append('BOARD_CONTENT', content); // 컨텐츠 내용 추가
    formData.append('BOARD_OPENTALK', recruitmentInfo.openTalkLink);
    formData.append('BOARD_POSITION', recruitmentInfo.position);
    formData.append('PRO_TITLE', 'Project Title');
    formData.append('PRO_LINK', recruitmentInfo.openTalkLink);
    formData.append('PRO_IMG', 'project-image.jpg');
    formData.append('SKILL_ID', '1'); // Replace with actual skill ID
    formData.append('BOARD_DEADLINE', `${startDateStr}`)
    formData.append('BOARD_VIEWS', '0');
    formData.append('SKILL_NAME', recruitmentInfo.techStack);
    try {
      const response = await fetch('http://localhost:8099/postsaveinfor', {
        method: 'POST',
        body: formData,
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
      startDate: new Date(),
      endDate: new Date(),
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
            <label htmlFor="startDate">시작일:</label>
            <DatePicker // 시작일을 선택할 수 있는 달력
              selected={recruitmentInfo.startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              id="startDate"
              className="input-field"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="endDate">종료일:</label>
            <DatePicker // 종료일을 선택할 수 있는 달력
              selected={recruitmentInfo.endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              id="endDate"
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
