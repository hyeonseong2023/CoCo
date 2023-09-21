// Contents.tsx

import React from 'react';
import '../css/Contents.css';
import { Link } from 'react-router-dom';

interface selectedCategory{
  categoryData: CategoryData[]; // 전체 데이터 배열
}

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
  return (
    <div>
      <div id='Contents-box'>
        <div>
          {categoryData.map((data, index) => (
            <div key={index}>
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div className='Contentsbox'>
                  <div className='Contentsbox-A'>
                    <div>day</div>
                    <div>제목</div>
                    <div>꼬리부분</div>
                  </div>
                  <div className='Contentsbox-B'>
                    <div>모집인원</div>
                    <div>분야</div>
                    <div>아이콘</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contents;
