import React, { useState } from 'react';
import Select from 'react-select';
import '../css/Category.css';

interface CategoryOption {
  value: any;
  label: string;
}

interface CategoryBoxProps {
  onUpdateData: (data: string) => void;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | null>>; 
  setSelectedPosition: React.Dispatch<React.SetStateAction<string | null>>; 
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ setSelectedLanguage, setSelectedPosition }) => {
  const [selectedLanguage, setSelectedLanguageLocal] = useState<CategoryOption | null>(null);
  const [selectedPosition, setSelectedPositionLocal] = useState<CategoryOption | null>(null);

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
      setSelectedLanguageLocal(selectedOption);
      setSelectedLanguage(selectedOption.value); // setSelectedLanguage를 업데이트
    }
  };

  const handleSelectChange2 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedPositionLocal(selectedOption);
      setSelectedPosition(selectedOption.value); // setSelectedPosition을 업데이트
    }
  };
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: 200, // 원하는 너비로 설정하세요.
    }),
  };
  return (
    <div className='category_main'>
      <div className='category_main_sub'><div className='category_titlemain'>분야별 프로젝트</div> <div className='category_titleseb'>분야별 함께할 팀원을 모집해 보세요.</div></div>
      <div className='category_sub1'>
        <Select
          options={categoryOptions1}
          value={selectedLanguage}
          onChange={(selectedOption) => handleSelectChange1(selectedOption)}
          className="select-box category1"
          styles={customStyles} // 커스텀 스타일을 적용합니다.
        />
        <Select
          options={categoryOptions2}
          value={selectedPosition}
          onChange={(selectedOption) => handleSelectChange2(selectedOption)}
          className="select-box category2"
          styles={customStyles} // 커스텀 스타일을 적용합니다.
        />
      </div>
    </div>
  );
};

export default CategoryBox;