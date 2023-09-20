import React, { useState } from 'react';
import Select from 'react-select';
import '../css/Category.css'

interface CategoryOption {
  value: string;
  label: string;
}

interface CategoryBoxProps {
  onUpdateData: (data: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onUpdateData }) => {
  const [selectedCategory1, setSelectedCategory1] = useState<CategoryOption>({ value: "전체", label: "전체" });
  const [selectedCategory2, setSelectedCategory2] = useState<CategoryOption>({ value: "언어옵션", label: "언어옵션" });

  const categoryOptions1: CategoryOption[] = [
    { label: "프론트", value: "프론트" },
    { label: "javascript", value: "javascript" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "React", value: "React" },
    { label: "Angular", value: "Angular" },
    { label: "Vue", value: "Vue" },
    { label: "Sass", value: "Sass" },

  ];
  

  const categoryOptions2: CategoryOption[] = [
    { value: "언어옵션", label: "전체" },
    { value: "Spring", label: "Spring" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "Java", label: "Java" },
    { value: "Go", label: "Go" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "kotlin", label: "kotlin" },
    { value: "MySQL", label: "MySQL" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "php", label: "php" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "ebase", label: "ebase" },
    { value: "AWS", label: "AWS" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Docker", label: "Docker" },
    { value: "Git", label: "Git" },
    { value: "Figma", label: "Figma" },
    { value: "Zeplin", label: "Zeplin" }
  ];
  const handleSelectChange1 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedCategory1(selectedOption);
      onUpdateData(selectedOption.value);
    }
  };

  const handleSelectChange2 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedCategory2(selectedOption);
      onUpdateData(selectedOption.value);
    }
  };

  return (
    <div className='category_main'>
      <div className='category'>
        <Select
          options={categoryOptions1}
          value={selectedCategory1}
          onChange={(selectedOption) => handleSelectChange1(selectedOption)}
          className="select-box category1" // category1 클래스 추가
        />
      </div>
      <div className='category'>
        <Select
          options={categoryOptions2}
          value={selectedCategory2}
          onChange={(selectedOption) => handleSelectChange2(selectedOption)}
          className="select-box category2" // category2 클래스 추가
        />
      </div>
      <div className='category'>
        <div>👋 내 북마크 보기</div>
      </div>
    </div>
  );
};

export default CategoryBox;