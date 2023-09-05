// CategoryBox.js
import React from 'react';

interface CategoryBoxProps {
  onUpdateData: (data: string[]) => void; // 데이터 타입을 문자열 배열로 지정
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onUpdateData }) => {

  const categoryData: string[] = ["Category 1", "Category 2", "Category 3"];

  onUpdateData(categoryData);

  return (
    <div>
      <div>카테고리</div>
      
    </div>
  );
};

export default CategoryBox;
