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
<<<<<<< HEAD
  console.log("boardData!!!!!!", boardData);

=======
>>>>>>> parent of 83ed442 (Merge branch 'main' into lhs)
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
    position: boardData?.TB_BOARD.board_position.split(",").map((item: string) => { return { label: item, value: item } }),
    startDate: boardData?.TB_BOARD.board_deadline,
    endDate: boardData?.board_deadline,
    openTalkLink: boardData?.TB_BOARD.board_openlink,
    deadline: boardData?.TB_BOARD.board_deadline,
    recruitmentType: '프로젝트',
  };
  console.log(initialContent);

  const [selectedPosition, setSelectedPosition] = useState(initialContent.position);

  const [title, setTitle] = useState(boardData === null ? '' : boardData.TB_BOARD.board_title);
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

    // 기술 스택을 쉼표로 구분된 문자열로 변환
    const positionString = selectedPosition.join(', ');

    const url = boardData
      ? `${process.env.REACT_APP_URL_8099}/postupdateinfor`
      : `${process.env.REACT_APP_URL_8099}/postsaveinfor`;

    const formData = new FormData();
    formData.append('cust_id', Cookies.get('CUST_ID') || '');
    formData.append('board_members', recruitmentInfo.recruitmentCount.toString());
    formData.append('board_period', recruitmentInfo.duration.toString());
    formData.append('board_title', title);
    formData.append('board_content', content);
    formData.append('board_openlink', recruitmentInfo.openTalkLink);
    formData.append('board_position', positionString); // 변환한 값을 추가
    formData.append('pro_title', 'Project Title');
    formData.append('pro_link', recruitmentInfo.openTalkLink);
    formData.append('board_deadline', recruitmentInfo.deadline);
    formData.append('board_views', '0');
    formData.append('SKILL_NAME', selectedTechStack.join(','));
    formData.append('BOARD_IMG', '');
    boardData && formData.append('board_id', boardData.TB_BOARD.board_id);


    try {
      const response = await fetch(url, {
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
    { label: "AWS", value: "AWS" },
    { label: "C", value: "C" },
    { label: "Django", value: "Django" },
    { label: "Docker", value: "Docker" },
    { label: "Express", value: "Express" },
    { label: "Figma", value: "Figma" },
    { label: "Firebase", value: "Firebase" },
    { label: "Flutter", value: "Flutter" },
    { label: "Git", value: "Git" },
    { label: "Go", value: "Go" },
    { label: "GraphQL", value: "GraphQL" },
    { label: "Java", value: "Java" },
    { label: "JavaScript", value: "javaScript" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "Kubernetes", value: "Kubernetes" },
    { label: "MongoDB", value: "MongoDB" },
    { label: "MySQL", value: "MySQL" },
    { label: "Nestjs", value: "Nestjs" },
    { label: "Nextjs", value: "Nextjs" },
    { label: "Nodejs", value: "Nodejs" },
    { label: "php", value: "php" },
    { label: "Python", value: "Python" },
    { label: "ReactNative", value: "ReactNative" },
    { label: "Spring", value: "Spring" },
    { label: "Swift", value: "Swift" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Unity", value: "Unity" },
    { label: "Vue", value: "Vue" },
    { label: "Zeplin", value: "Zeplin" }
  ];

  const positionOptions = [
    { label: '백엔드', value: '백엔드' },
    { label: '프론트엔드', value: '프론트엔드' },
    { label: '디자이너', value: '디자이너' },
    { label: 'IOS안드로이드', value: 'IOS안드로이드' },
    { label: '안드로이드', value: '안드로이드' },
    { label: '데브옵스', value: '데브옵스' },
    { label: 'PM', value: 'PM' },
    { label: '기획자', value: '기획자' },
  ];

  const handlePositionChange = (selectedOptions: any) => {
    if (selectedOptions.length <= 3) {
      setSelectedPosition(selectedOptions.map((option: any) => option.value));
    }
  };

  return (
    <div className="write-container">
      <Header />
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-container-box">
          <div className="write-submitSet">
            <h1>1. 프로젝트 기본 정보를 입력해주세요</h1>
          </div>

          <div className="form-group form-group-spacing">
            <label htmlFor="title" className='titlesub1'>게시글 제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="input-field"
            />
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
                placeholder=""
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
                value={selectedPosition && selectedPosition.map((value: any) => ({
                  label: value,
                  value: value,
                }))}
                onChange={handlePositionChange}
                className="custom-select"
                placeholder = ""
              />
            </div>
            <div className="form-subgroup form-subgroup-spacing">
              <label htmlFor="openTalkLink" > 오픈톡 링크</label>
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
            <label htmlFor="content" className='writesub2'>2. 프로젝트에 대해 소개해주세요</label>
            <ReactQuill
              style={{ width: '800px', height: '600px' }}
              modules={modules}
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div className="cancel-submit-buttons">
            <button type="submit" className="submit-button">
              등록
            </button>
            <Link to={'/'}>
              <button type="button" className="cancel-button">
                취소
              </button>
            </Link>
          </div>
          <div className='writespace'></div>
        </div>
      </form>
    </div>
  );
};

export default Write;