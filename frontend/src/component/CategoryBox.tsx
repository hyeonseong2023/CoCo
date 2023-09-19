import React, { useEffect, useState } from 'react';
import '../css/Category.css'; // CSS 파일을 import 합니다.
import Select from 'react-select';

interface CategoryBoxProps {
  onUpdateData: (data: string[]) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onUpdateData }) => {
  const categoryOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "php", label: "PHP" },
    { value: "java", label: "Java" },
    { value: "golang", label: "Golang" },
    { value: "python", label: "Python" },
    { value: "c#", label: "C#" },
    { value: "C++", label: "C++" },
    { value: "erlang", label: "Erlang" }
  ];

  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  useEffect(() => {
    onUpdateData(categoryOptions.map(option => option.label));
  }, []);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);

    console.log(`Selected category: ${selectedOption.value}`);
  };

  return (
    <div className='category'>
      <div className='categoryA'>
        <Select options={categoryOptions} value={selectedCategory} onChange={handleSelectChange} />
      </div>
    </div>
  );
};

export default CategoryBox;
