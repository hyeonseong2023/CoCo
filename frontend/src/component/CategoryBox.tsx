import React, { useState } from 'react';
import Select from 'react-select';
import '../css/Category.css';

interface CategoryOption {
  value: string;
  label: string;
}

interface CategoryBoxProps {
  onUpdateData: (data: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onUpdateData }) => {
  // 각 셀렉트 박스에 대한 별도의 상태와 옵션 배열 생성
  const [selectedCategory1, setSelectedCategory1] = useState<CategoryOption>({ value: "전체", label: "전체" });
  const [selectedCategory2, setSelectedCategory2] = useState<CategoryOption>({ value: "전체", label: "전체" });
  const [selectedCategory3, setSelectedCategory3] = useState<CategoryOption>({ value: "전체", label: "전체" });
  const [selectedCategory4, setSelectedCategory4] = useState<CategoryOption>({ value: "전체", label: "전체" });

  // 각 셀렉트 박스에 대한 카테고리 옵션 배열 생성
  const categoryOptions1: CategoryOption[] = [
    { value: "전체", label: "전체" },
    { value: "프로젝트", label: "프로젝트" },
    { value: "스터디", label: "스터디" },
  ];

  const categoryOptions2: CategoryOption[] = [
    { value: "전체", label: "전체" },
    { value: "옵션1", label: "옵션1" },
    { value: "옵션2", label: "옵션2" },
  ];

  const categoryOptions3: CategoryOption[] = [
    { value: "전체", label: "전체" },
    { value: "카테고리1", label: "카테고리1" },
    { value: "카테고리2", label: "카테고리2" },
  ];

  const categoryOptions4: CategoryOption[] = [
    { value: "전체", label: "전체" },
    { value: "카테고리1", label: "카테고리1" },
    { value: "카테고리2", label: "카테고리2" },
  ];

  // 각 셀렉트 박스에 대한 변경 이벤트 핸들러를 생성
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

  const handleSelectChange3 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedCategory3(selectedOption);
      onUpdateData(selectedOption.value);
    }
  };

  const handleSelectChange4 = (selectedOption: CategoryOption | null) => {
    if (selectedOption) {
      setSelectedCategory4(selectedOption);
      onUpdateData(selectedOption.value);
    }
  };

  return (
    <div>
      <section className='studyOrProject_category'>
        {categoryOptions1.map((category) => (
          <div
            key={category.value}
            className={`studyOrProject_category__item__1EoaI ${category === selectedCategory1 ? "studyOrProject_active__3WkWF" : "studyOrProject_inactive__BC9y-"
              }`}
            onClick={() => handleSelectChange1(category)}
          >
            <span className='studyOrProject_text__cbBJ2'>{category.label}</span>
          </div>
        ))}
      </section>
      <div className='category_main'>
        <div className='category'>
          <div className='categoryA'>
            <Select
              options={categoryOptions2}
              value={selectedCategory2}
              onChange={(selectedOption) => handleSelectChange2(selectedOption)}
            />
          </div>
        </div>
        <div className='category_main'>
          <div className='category'>
            <div className='categoryA'>
              <Select
                options={categoryOptions3}
                value={selectedCategory3}
                onChange={(selectedOption) => handleSelectChange3(selectedOption)}
              />
            </div>
          </div>
          <div className='category'>
            <div className='categoryA'>
              <Select
                options={categoryOptions4}
                value={selectedCategory4}
                onChange={(selectedOption) => handleSelectChange4(selectedOption)}
              />
            </div>
          </div>
        </div>
        <div className='category'>
          <div>👋 내 북마크 보기</div>
        </div>
        <div className='category'>
          <div>👀 모집 중만 보기</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBox;
