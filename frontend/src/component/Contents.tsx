// Contents.tsx

import React from 'react';
import '../css/Contents.css';
import { Link } from 'react-router-dom';
import img from '../img/profilePicture.png'
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
        <div id='Contentsbox-c'>
          {categoryData.map((data, index) => (
            <div key={index}>
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div className='Contentsbox'>
                  <div className='Contentsbox-A'>
                    <div className='boxA_dead'><div>{data.board_deadline}</div></div>
                    <div className='boxA_title'><div>{data.title}</div></div>
                    <div className='boxA_img'><div><img src={img} alt="" /></div></div>
                  </div>
                  <div className='boxB_title'><div>북마크</div><div>조회수</div></div>
                  <hr/>
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
