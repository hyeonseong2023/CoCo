// Contents.tsx

import React from 'react';
import '../css/Contents.css';
import TopPosts from './TopPosts';
import { Link } from 'react-router-dom';

interface CategoryData {
  id: any;
  name: any;
  title: any;
  content: any;
  board_deadline: any;
  board_dt: any;
  board_members: any;
  board_openlink: any;
  board_period: any;
  board_position: any;
  board_views: any;
  cust_id: any;
  pro_img: any;
  pro_link: any;
  pro_title: any;
}

interface ContentsProps {
  categoryData: CategoryData[];
}


const Contents: React.FC<ContentsProps> = ({ categoryData }) => {
  console.log(categoryData);
  return (
    <div>
      <TopPosts />
      <div id='Contents-box'>
        <div>
          {categoryData.map((data, index) => (
            <div key={index}>
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div>{data.title}</div>
                <h1>{data.content}</h1>
                <h3>{data.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contents;
