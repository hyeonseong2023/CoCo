// Contents.tsx

import React from 'react';
import '../css/Contents.css';
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
  
  return (
    <div>
      <div id='Contents-box'>
        <div>
          {categoryData.map((data, index) => (
            <div key={index}>
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div className='Contentsbox'>
                  <div className='Ctitle'>
                  {data.board_members}
                  </div>
                  <div className='Ccontents'>
                  {data.title}
                  <br/>
                  {data.content}
                  </div>
                  <div  className='Cbookmark'>
                  {data.board_deadline}
                  <br/>
                  {data.board_views}
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
