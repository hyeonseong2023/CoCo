import React from 'react';
import '../css/Contents.css';

import TopPosts from './TopPosts';

type categoryData = {
  id : number
  name: string;
  title: string;
  content: string;
};
interface ContentsProps {
  categoryData: categoryData[];
}

const Contents: React.FC<ContentsProps> = ({ categoryData }) => {
  return (
    <div>
      <TopPosts />
      <div id='Contents-box'>
        <div>
          {categoryData.map((data, index) => (
            <div key={index}>
              <div>{data.name}</div>
              <h1>{data.title}</h1>
              <h3>{data.content}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contents;
