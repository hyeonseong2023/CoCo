import React from 'react';
import '../css/Contents.css';
import { Link } from 'react-router-dom';
import img from '../img/profilePicture.png';
import book from '../img/Bookmarkoff.png';
import viewicon from '../img/viewsIcon.png';
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
  cust_nick: any;
}

interface ContentsProps {
  categoryData: CategoryData[];
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

const Contents: React.FC<ContentsProps> = ({ categoryData }) => {
  // 현재 날짜 가져오기
  const today = new Date();
  console.log(categoryData);

  return (
    <div>
      <div id="Contents-box">
        <div id="Contentsbox-c">
          {categoryData.map((data, index) => {
            // 이 부분에서 날짜 관련 로직을 사용할 수 있도록 today를 정의
            const deadlineDate = new Date(data.board_deadline);
            const todayMillis = today.getTime();
            const deadlineMillis = deadlineDate.getTime();
            const daysDifference = Math.floor(
              (deadlineMillis - todayMillis) / (1000 * 60 * 60 * 24)
            );
            const isExpired = daysDifference < 0;
            const contentClassName = `top-posts-slide-content ${
              isExpired ? 'expired' : ''
            }`;

            return (
              <div key={index} className="content-wrapper">
                <Link
                  to={`selectpostviews/${data.id}`}
                  key={index}
                  state={data}
                >
                  <div className="Contentsbox">
                    <div className="Contentsbox-A">
                      {isExpired ? (
                        <div className="contentHeader">
                          <div className="topHeader-day">모집마감</div>
                        </div>
                      ) : (
                        <div className="topHeader">
                          <div className="topHeader-day">
                            {daysDifference}일 남음
                          </div>
                        </div>
                      )}
                      <div className="boxA_title">
                        <div>{data.title}</div>
                      </div>
                      <div className="boxA_img">
                        <div>
                          <img src={img} alt="" />
                        </div>
                        <div className="contentsNick">{data.cust_nick}</div>
                      </div>
                    </div>
                    <div className="boxB_bookmark">
                      <div className="boxB_1">
                        <img src={book} alt="" />{' '}
                      </div>
                      <div className="boxB_2">
                        <img src={viewicon} alt="" />
                        {data.board_views}
                      </div>
                    </div>
                    <div className="ContentsLine"></div>
                    <div className="Content-topTail">
                      <div className="Content-topicon1">
                        모집인원 {data.board_members}
                      </div>
                      <div className="Content-topicon2">
                        <div>모집분야</div>
                        <div className="topiconbox">
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
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contents;
