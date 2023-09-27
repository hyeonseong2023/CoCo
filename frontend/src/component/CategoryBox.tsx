import React, { useState } from 'react';
import Select from 'react-select';
import '../css/Category.css';
import bookmarkIconon from '../img/Bookmarkon.png'
import bookmarkIconoff from '../img/Bookmarkoff.png'
import Cookies from 'js-cookie';

interface CategoryOption {
  value: any;
  label: string;
}

interface CategoryBoxProps {
  onUpdateData: (selectedCategory: string | null) => void;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPosition: React.Dispatch<React.SetStateAction<string | null>>;
  isBookmarked: boolean;
  isApplied: boolean;
  onBookmarkToggle: () => void;
  onAppliedToggle: () => void;
  onMyPostsClick: () => void;
}

const custId = Cookies.get('CUST_ID');

const CategoryBox: React.FC<CategoryBoxProps> = ({
  setSelectedLanguage,
  setSelectedPosition,
  isBookmarked,
  isApplied,
  onBookmarkToggle,
  onAppliedToggle,
  onMyPostsClick,
}) => {

  const [viewState, setViewState] = useState<string | null>(null);

  const handleButtonClick = (stateName: string) => {
    if (viewState === stateName) {
      setViewState(null);
    } else {
      setViewState(stateName);
    }
  };

  const categoryOptions1: CategoryOption[] = [
    { label: "javascript", value: "javascript" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "React", value: "React" },
    { label: "Angular", value: "Angular" },
    { label: "Vue", value: "Vue" },
    { label: "Sass", value: "Sass" },
    { value: "Spring", label: "Spring" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "java", label: "Java" },
    { value: "Go", label: "Go" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "kotlin", label: "kotlin" },
    { value: "MySQL", label: "MySQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "php", label: "php" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "ebase", label: "ebase" },
    { value: "aws", label: "AWS" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Docker", label: "Docker" },
    { value: "Git", label: "Git" },
    { value: "Figma", label: "Figma" },
    { value: "Zeplin", label: "Zeplin" }

  ];

  const categoryOptions2: CategoryOption[] = [
    { value: "백엔드", label: "백엔드" },
    { value: "프론트엔드", label: "프론트엔드" },
    { value: "디자이너", label: "디자이너" },
    { value: "IOS", label: "IOS안드로이드" },
    { value: "안드로이드", label: "안드로이드" },
    { value: "데브옵스", label: "데브옵스" },
    { value: "PM", label: "PM" },
    { value: "기획자", label: "기획자" }
  ];


  const handleSelectChange1 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedLanguage(selectedOption.value);
    }
  };

  const handleSelectChange2 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedPosition(selectedOption.value);
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 200,
    }),

  };
  return (
    <div className='category_main'>
      <div className='category_titlemain'>
        <h1>분야별 프로젝트</h1>
        <h5>분야별 함께할 팀원을 모집해 보세요.</h5>
      </div>
      <div className='category_titleseb'>
        <div className='category_titlesec'>
          <div className='category_sub1'>
            <Select
              options={categoryOptions1}
              onChange={(selectedOption) => handleSelectChange1(selectedOption)}
              className="select-box category1"
              styles={customStyles}
              placeholder="기술스택"
            />
            <Select
              options={categoryOptions2}
              onChange={(selectedOption) => handleSelectChange2(selectedOption)}
              className="select-box category2"
              styles={customStyles}
              placeholder="포지션"
            />
          </div>
          <div className='category_sub2'>
            {custId && (
              <>
                <label>
                  <button>
                    <img
                      src={viewState === 'bookmark' ? bookmarkIconon : bookmarkIconoff}
                      alt="북마크 아이콘"
                      className='imgbtnbox'
                      onClick={() => { handleButtonClick('bookmark'); onBookmarkToggle(); }}
                    />
                  </button>
                </label>
                <label className='labelselect1'>
                  <button
                    onClick={() => { handleButtonClick('applied'); onAppliedToggle();  }}
                  >
                    지원한 게시글 보기
                  </button>
                </label>
                <label className='labelselect1'>
                  <button onClick={() => { handleButtonClick('myposts'); onMyPostsClick(); }}>
                    내가 쓴 게시물 보기
                  </button>
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBox;
