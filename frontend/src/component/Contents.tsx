// Contents.tsx

import React from 'react';
import '../css/Contents.css';
import { Link } from 'react-router-dom';
import img from '../img/profilePicture.png';
import book from '../img/Bookmarkoff.png';
interface selectedCategory {
  categoryData: CategoryData[]; // 전체 데이터 배열
}

function getPositionColor(position: string) {
  switch (position) {
    case '프론트엔드':
      return 'frontend-color';
    case '백엔드':
      return 'backend-color';
    case '디자이너':
      return 'designer-color';
    case '기획자':
      return 'planner-color';
    default:
      return ''; // 기본값으로 빈 문자열을 반환하거나 다른 적절한 클래스를 할당하세요.
  }
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
      <div id="Contents-box">
        <div id="Contentsbox-c">
          {categoryData.map((data, index) => (
            <div key={index}>
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div className="Contentsbox">
                  <div className="Contentsbox-A">
                    <div className="boxA_dead">
                      <div>{data.board_deadline}</div>
                    </div>
                    <div className="boxA_title">
                      <div>{data.title}</div>
                    </div>
                    <div className="boxA_img">
                      <div>
                        <img src={img} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="boxB_bookmark">
                    <div className="boxB_1">
                      <img src={book} alt="" />
                    </div>
                    <div className="boxB_2">조회수 {data.board_views}</div>
                  </div>
                  <div className="ContentsLine"></div>
                  <div className="topBody-topTail">모집분야</div>
                  <div className="topTail">
                    {data.board_position
                      .split(',')
                      .map((position: string, positionIndex: number) => (
                        <div
                          key={positionIndex}
                          className={`top-board_position ${getPositionColor(
                            position
                          )}`}
                        >
                          {position}
                        </div>
                      ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contents;
