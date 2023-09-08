import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRecruitmentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecruitmentInfo({
      ...recruitmentInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      selectedCategory,
      recruitmentInfo, // 모집 정보도 전송
      // 이곳에 이미지 파일 업로드 관련 정보를 추가할 수 있습니다.
    };

    // 게시글 데이터를 서버로 전송하거나 필요한 작업을 수행하세요.

    setTitle('');
    setContent('');
    setSelectedCategory('');
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
    <div>
      <Header />

      <form onSubmit={handleSubmit}>
        <h2>게시글 작성</h2>
        <button type="submit">작성</button>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <h3>카테고리 선택</h3>
          {/* 이하 카테고리 선택 부분 */}
        </div>
        <div>
          <h3>모집 정보</h3>
          <div>
            <label htmlFor="recruitmentCount">모집 인원:</label>
            <input
              type="number"
              id="recruitmentCount"
              name="recruitmentCount"
              value={recruitmentInfo.recruitmentCount}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
          <div>
            <label htmlFor="techStack">기술 스택:</label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={recruitmentInfo.techStack}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
          <div>
            <label htmlFor="duration">진행 기간:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={recruitmentInfo.duration}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
          <div>
            <label htmlFor="position">포지션:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={recruitmentInfo.position}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
          <div>
            <label htmlFor="startDate">시작일:</label>
            <input
              type="text"
              id="startDate"
              name="startDate"
              value={recruitmentInfo.startDate}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
          <div>
            <label htmlFor="openTalkLink">오픈톡 링크:</label>
            <input
              type="text"
              id="openTalkLink"
              name="openTalkLink"
              value={recruitmentInfo.openTalkLink}
              onChange={handleRecruitmentInfoChange}
            />
          </div>
        </div>
        <div>
          {/* 이미지 파일 업로드 필드를 추가하세요 */}
        </div>
      </form>
    </div>
  );
};

export default Write;
