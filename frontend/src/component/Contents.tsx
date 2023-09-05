import React from 'react';
import '../css/Contents.css';
import TopPosts from './TopPosts';

// categoryData 타입 정의
type categoryData = {
  // 필요한 데이터 필드들을 여기에 추가
  id: number;
  name: string;
};

interface ContentsProps {
  categoryData: categoryData[]; // categoryData[] 타입으로 props 정의
}

const Contents: React.FC<ContentsProps> = ({ categoryData }) => {
  return (
    <div>
      <TopPosts />
      <div id='Contents-box'>
        <div>
          {categoryData.map((data, index) => (
            <div key={index}>
              <div>{data.name}
              <h1>제목</h1>
              <h3>내용 가져올 공간 </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contents;
