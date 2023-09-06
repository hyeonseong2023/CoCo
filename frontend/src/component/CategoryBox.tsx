import React, { useEffect } from 'react';
import '../css/Category.css'; // CSS 파일을 import 합니다.

interface CategoryBoxProps {
  onUpdateData: (data: string[]) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ onUpdateData }) => {
  const categoryData: string[] = ["Category 1", "Category 2", "Category 3"];

  // 컴포넌트가 마운트될 때 한 번 호출합니다.
  useEffect(() => {
    onUpdateData(categoryData);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출하도록 합니다.

  return (
    <div>
      <div>
        카테고리
        <select name="languages" id="lang">
          <option value="javascript">JavaScript</option>
          <option value="php">PHP</option>
          <option value="java">Java</option>
          <option value="golang">Golang</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
          <option value="erlang">Erlang</option>
        </select>
        선텍 툴
        <select name="languages" id="lang">
          <option value="javascript">JavaScript</option>
          <option value="php">PHP</option>
          <option value="java">Java</option>
          <option value="golang">Golang</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
          <option value="erlang">Erlang</option>
        </select>
        <button> 찜목록 </button>
      </div>
    </div>
  );
};

export default CategoryBox;
