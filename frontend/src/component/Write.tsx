import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Header from './Header';
import Select from 'react-select';
import '../css/Write.css';
import Cookies from 'js-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 임포트
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const boardData = location?.state as any;
  const initialContent = boardData === null ? {
    recruitmentCount: 1,
    techStack: [] as string[],
    duration: 1,
    position: '',
    startDate: new Date(),
    endDate: new Date(),
    openTalkLink: '',
    deadline: '',
    recruitmentType: '프로젝트',
  } : {
    recruitmentCount: boardData?.TB_BOARD.board_members,
    techStack: boardData?.TB_BOARD_SKILL,
    duration: boardData?.TB_BOARD.board_period,
    position: boardData?.TB_BOARD.board_position.split(",").map((item:string)=>{ return {label:item, value:item}}),
    startDate: boardData?.TB_BOARD.board_deadline,
    endDate: boardData?.board_deadline,
    openTalkLink: boardData?.TB_BOARD.board_openlink,
    deadline: boardData?.TB_BOARD.board_deadline,
    recruitmentType: '프로젝트',
  };
  console.log(initialContent);

  const [selectedPosition, setSelectedPosition] = useState(initialContent.position);

  const [title, setTitle] = useState(boardData === null ? '' : boardData.TB_BOARD.board_title );
  const [content, setContent] = useState(boardData === null ? '' : boardData.TB_BOARD.board_content);
  const [files, setFiles] = useState<File[]>([]);
  const [insertedImages, setInsertedImages] = useState<string[]>([]);
  const [recruitmentInfo, setRecruitmentInfo] = useState(initialContent);

  const modules = {
    toolbar: {
      container: [
        ['image'],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'underline'],
      ],
    },
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleRecruitmentInfoChange = (name: string, value: any) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      [name]: value,
    });
  };

  const [selectedTechStack, setSelectedTechStack] = useState<string[]>(initialContent.techStack);

  const handleDurationChange = (value: number) => {
    setRecruitmentInfo({
      ...recruitmentInfo,
      duration: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cust_id', Cookies.get('CUST_ID') || '');
    formData.append('board_members', recruitmentInfo.recruitmentCount.toString());
    formData.append('board_period', recruitmentInfo.duration.toString());
    formData.append('board_title', title);
    formData.append('board_content', content);
    formData.append('board_openlink', recruitmentInfo.openTalkLink);
    formData.append('board_position', recruitmentInfo.position);
    formData.append('pro_title', 'Project Title');
    formData.append('pro_link', recruitmentInfo.openTalkLink);
    formData.append('board_deadline', recruitmentInfo.deadline);
    formData.append('board_views', '0');
    formData.append('SKILL_NAME', selectedTechStack.join(', '));
    formData.append('BOARD_IMG', '');

    try {
      const response = await fetch('http://localhost:8099/postsaveinfor', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        console.log('게시글이 성공적으로 저장되었습니다.');
        navigate('/');
      } else {
        alert('게시글 작성 실패');
      }
    } catch (error) {
      console.error('오류 발생: ', error);
      alert('오류 발생, 다시 시도하세요.');
    }
  };

  const techStackOptions = [
    { label: "Spring", value: "Spring" },
    { label: "JavaScript", value: "javaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Vue", value: "Vue" },
  ];

  const positionOptions = [
    { label: '백엔드', value: '백엔드' },
    { label: '프론트엔드', value: '프론트엔드' },
    { label: '디자이너', value: '디자이너' },
    { label: 'IOS', value: 'IOS안드로이드' },
    { label: '안드로이드', value: '안드로이드' },
    { label: '데브옵스', value: '데브옵스' },
    { label: 'PM', value: 'PM' },
    { label: '기획자', value: '기획자' },
  ];

  const handlePositionChange = (selectedOptions : any) => {
    if (selectedOptions.length <= 3) {
      setSelectedPosition(selectedOptions);
    }
  };

  return (
    <div className="write-container">
      <Header />
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-container-box">
          <div className="write-submitSet">
            <h2>게시글 작성</h2>
          </div>

          <div className="form-group form-group-spacing">
            <label htmlFor="title">게시글 제목</label>
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
              <label htmlFor="recruitmentCount">모집 인원</label>
              <select
                id="recruitmentCount"
                name="recruitmentCount"
                value={recruitmentInfo.recruitmentCount}
                onChange={(e) =>
                  handleRecruitmentInfoChange(e.target.name, parseInt(e.target.value))
                }
                className="input-field"
              >
                <option value={1}>1명</option>
                <option value={2}>2명</option>
                <option value={3}>3명</option>
                <option value={4}>4명</option>
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
                  console.log(selectedTechStack);
                  if (selectedOptions.length <= 3) {
                    setSelectedTechStack(
                      selectedOptions.map((option: any) => option.value)
                    );
                  }
                }}
                className="custom-select"
              />
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="duration">진행 기간</label>
              <select
                id="duration"
                name="duration"
                value={recruitmentInfo.duration}
                onChange={(e) => handleDurationChange(parseInt(e.target.value))}
                className="input-field"
              >
                <option value={1}>1개월</option>
                <option value={2}>2개월</option>
                <option value={3}>3개월</option>
                <option value={4}>4개월</option>
                <option value={5}>5개월</option>
                <option value={6}>6개월</option>
                <option value={7}>7개월</option>
              </select>
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="deadline">모집 마감일</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={recruitmentInfo.deadline}
                onChange={(e) =>
                  handleRecruitmentInfoChange(e.target.name, e.target.value)
                }
                className="input-field"
              />
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="position">포지션</label>
              <Select
                id="position"
                name="position"
                options={positionOptions}
                isMulti
                value={selectedPosition}
                onChange={handlePositionChange}
                className="custom-select"
              />
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="openTalkLink"> 오픈톡 링크</label>
              <input
                type="text"
                id="openTalkLink"
                name="openTalkLink"
                value={recruitmentInfo.openTalkLink}
                onChange={(e) =>
                  handleRecruitmentInfoChange(e.target.name, e.target.value)
                }
                className="input-field"
              />
            </div>
          </div>
          <div className="form-group form-group-spacing">
            <label htmlFor="content">내용</label>
            <ReactQuill
              style={{ width: '800px', height: '600px' }}
              modules={modules}
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div className="cancel-submit-buttons">
            <Link to={'/'}>
              <button type="button" className="cancel-button">
                작성 취소
              </button>
            </Link>
            <button type="submit" className="submit-button">
              작성
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
