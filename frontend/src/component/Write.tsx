import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { components } from 'react-select'; // react-select 추가
import '../css/Write.css';
import Cookies from 'js-cookie';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [recruitmentInfo, setRecruitmentInfo] = useState({
    recruitmentCount: '1',
    techStack: [] as string[], // 초기값을 빈 문자열 배열로 설정
    duration: '1',
    position: '',
    startDate: new Date(),
    endDate: new Date(),
    openTalkLink: '',
    deadline: '',
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleRecruitmentInfoChange = (name: string, value: any) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      [name]: value,
    });
  };

  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = Array.from(files);
      setImages([...images, ...selectedImages]);
      const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...imageUrls]);
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);
  };

  const handleDurationChange = (value: string) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      duration: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDateStr = recruitmentInfo.startDate.toISOString().split('T')[0];
    const endDateStr = recruitmentInfo.endDate.toISOString().split('T')[0];
    const period = `${startDateStr}~${endDateStr}`;

    const formData = new FormData();
    formData.append('CUST_ID', Cookies.get('CUST_ID') || '');
    formData.append('BOARD_MEMBERS', recruitmentInfo.recruitmentCount);
    formData.append('BOARD_PERIOD', period);
    formData.append('BOARD_TITLE', title);
    formData.append('BOARD_CONTENT', content);
    formData.append('BOARD_OPENTALK', recruitmentInfo.openTalkLink);
    formData.append('BOARD_POSITION', recruitmentInfo.position);
    formData.append('PRO_TITLE', 'Project Title');
    formData.append('PRO_LINK', recruitmentInfo.openTalkLink);
    formData.append('SKILL_ID', '1');
    formData.append('BOARD_DEADLINE', recruitmentInfo.deadline);
    formData.append('BOARD_VIEWS', '0');
    formData.append('SKILL_NAME', recruitmentInfo.techStack.join(', '));

    images.forEach((file) => {
      formData.append('BOARD_IMG', file);
    });

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
      recruitmentCount: '1',
      techStack: [],
      duration: '1',
      position: '',
      startDate: new Date(),
      endDate: new Date(),
      openTalkLink: '',
      deadline: '',
    });
    setImages([]);
    setPreviewImages([]);
  };

  const techStackOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'React', label: 'React' },
    { value: 'Spring', label: 'Spring' },
    { value: 'C', label: 'C' },
  ];
  const limitedTechStackOptions = techStackOptions.slice(0, 3);
  return (
    <div className="write-container">
      <Header />

      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-container-box">
          <div className="write-submitSet">
            <h2>게시글 작성</h2>
          </div>

          <div className="form-group form-group-spacing">
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
          <div id="write-division">
            <h3>모집 정보</h3>
          </div>
          <div className="form-group-form-groups">
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="recruitmentCount">모집 인원:</label>
              <select
                id="recruitmentCount"
                name="recruitmentCount"
                value={recruitmentInfo.recruitmentCount}
                onChange={(e) => handleRecruitmentInfoChange(e.target.name, e.target.value)}
                className="input-field"
              >
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
              </select>
            </div>
            <div className="form-subgroup form-subgroup-spacing">
          <label htmlFor="techStack">기술 스택</label>
          <Select
  id="techStack"
  name="techStack"
  options={techStackOptions}
  isMulti
  value={techStackOptions.filter((option) =>
    selectedTechStack.includes(option.value)
  )}
  onChange={(selectedOptions: any) => {
    if (selectedOptions.length <= 3) {
      setSelectedTechStack(
        selectedOptions.map((option: any) => option.value)
      );
    }
  }}
  className="custom-select" // 커스텀 클래스 이름을 추가합니다.
/>
        </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="duration">진행 기간</label>
              <select
                id="duration"
                name="duration"
                value={recruitmentInfo.duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="input-field"
              >
                <option value="1">1개월</option>
                <option value="2">2개월</option>
                <option value="3">3개월</option>
                <option value="4">4개월</option>
                <option value="5">5개월</option>
                <option value="6">6개월</option>
                <option value="7">7개월</option>
              </select>
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="deadline">모집 마감일</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={recruitmentInfo.deadline}
                onChange={(e) => handleRecruitmentInfoChange(e.target.name, e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="openTalkLink">오픈톡 링크</label>
              <input
                type="text"
                id="openTalkLink"
                name="openTalkLink"
                value={recruitmentInfo.openTalkLink}
                onChange={(e) => handleRecruitmentInfoChange(e.target.name, e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-subgroup form-subgroup-spacing">
            <label htmlFor="image">이미지 업로드</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="input-field"
              multiple
            />
          </div>
          {previewImages.length > 0 && (
            <div className="image-preview form-group-spacing">
              {previewImages.map((imageUrl, index) => (
                <div key={index} className="image-preview-item">
                  <img className="testimg" src={imageUrl} alt={`미리 보기 ${index}`} />
                  <button onClick={() => handleImageRemove(index)}>삭제</button>
                </div>
              ))}
            </div>
          )}

          <div className="form-group form-group-spacing">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              required
              className="textarea-field"
            />
          </div>

          <button type="submit" className="submit-button">
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
