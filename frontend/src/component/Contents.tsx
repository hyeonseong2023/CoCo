import React, { useState } from 'react';
import '../css/Contents.css';
import { Link } from 'react-router-dom';
import img from '../img/profilePicture.png';
import bookmarkoff from '../img/Bookmarkoff.png';
import bookmarkon from '../img/Bookmarkon.png';
import viewicon from '../img/viewsIcon.png'

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
  skill_names: any;
  cust_img: any;
  bmkimg: any;
}

interface ContentsProps {
  categoryData: CategoryData[];
}

function getPositionColor(position: string) {
  switch (position) {
    case '프론트엔드':
      return 'frontend-color';
    case '백엔드':
    case ' 백엔드':
      return 'backend-color';
    case '디자이너':
    case ' 디자이너':
      return 'designer-color';
    case ' IOS안드로이드':
    case 'IOS안드로이드':
    case '안드로이드':
      return 'ios-color'
    case '데브옵스':
    case ' 데브옵스':
      return 'dev-color'
    case 'PM':
      return 'pm-color'
    case '기획자':
      return 'planner-color';
    default:
      return '';
  }
}

const Contents: React.FC<ContentsProps> = ({ categoryData }) => {
  const today = new Date();
  return (
    <div>
      <div id='Contents-box'>
        <div id='Contentsbox-c'>
          {categoryData.map((data, index) => {
            const deadlineDate = new Date(data.board_deadline);
            const todayMillis = today.getTime();
            const deadlineMillis = deadlineDate.getTime();
            const daysDifference = Math.floor((deadlineMillis - todayMillis) / (1000 * 60 * 60 * 24));
            const isExpired = daysDifference < 0;
            const contentClassName = `top-posts-slide-content ${isExpired ? 'expired' : ''}`;

            return (
              <div key={index} className="content-wrapper">
                <Link to={`selectpostviews/${data.id}`} key={index} state={data}>
                  <div className='Contentsbox'>
                    <div className='Contentsbox-A'>
                      {isExpired ? (
                        <div className='contentHeader'>
                          <div className='topHeader-day'>모집마감</div>
                        </div>
                      ) : (
                        <div className='topHeader'>
                          <div className='topHeader-daya'>{daysDifference}일 남음</div>
                        </div>
                      )}
                      <div className='boxA_title'>
                        <div className='boxA_titleA'>{data.title}</div>
                        <div className="skillImg">
                          {data.skill_names ? (
                            data.skill_names.map((skill: any) => (
                              <img key={skill} src={process.env.PUBLIC_URL + `/skillImg/${skill}.svg`} alt={skill} />
                            ))
                          ) : null}
                        </div>
                      </div>

                      <div className='boxA_img'>

                        <div>
                          <img
                            src={data.cust_img ? 'data:image/;base64,' + data.cust_img : img}
                            alt="이미지 출력되지 않았음"
                            className="user-img"
                          ></img>
                        </div>
                        <div className='contentsNick'>{data.cust_nick}</div>
                      </div>
                    </div>

                    <div className='boxB_bookmark'>
                      <div className='boxB_1'>
                        {data.bmkimg == "false" ? <img src={bookmarkoff} alt="" /> : <img src={bookmarkon} alt="" />}

                      </div>
                      <div className='boxB_2'><img src={viewicon} alt="" />{data.board_views}</div>
                    </div>

                    <div className='ContentsLine'></div>
                    <div className='Content-topTail'>
                      <div className='Content-topicon1'>
                        모집인원 {data.board_members} 명
                      </div>
                      <div className='Content-topicon2'>
                        <div className='Content-topicon2Sub'>모집분야</div>
                        <div className='topiconbox'>
                          {data.board_position.split(',').map((position: string, positionIndex: number) => (
                            <div
                              key={positionIndex}
                              className={`top-board_position ${getPositionColor(position)}`}
                            >
                              {position.trim()}
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
}

export default Contents;