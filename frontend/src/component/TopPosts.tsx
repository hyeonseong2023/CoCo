import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/TopPosts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bookmarkon from '../img/Bookmarkon.png'
import img from '../img/profilePicture.png'
import viewicon from '../img/viewsIcon.png'
interface PostData {
  id: string;
  title: string;
  board_deadline: string;
  board_position: string;
  pro_img: String;
  board_views: number;
  cust_nick: string;
}

const TopPosts = () => {
  const [slideContents, setSlideContents] = useState<PostData[]>([]);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (slideContents.length === 0) {
      fetchData();
    }
  }, [slideContents]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_8099}/popularlist`);
      const fetchedData: PostData[] = response.data.map((item: any) => ({
        id: item.board_id,
        title: item.board_title,
        board_deadline: item.board_deadline,
        board_position: item.board_position,
        pro_img: item.pro_img,
        board_views: item.board_views,
        cust_nick: item.cust_nick

      }));

      setSlideContents(fetchedData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    slidesToShow: 4,
    slidesPerRow: 1,
  };

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

  // 현재 날짜 가져오기
  const today = new Date();

  return (
    <div className='TopPostsC'>
      <div className='TopPostsCo'>
        <div className='TopPostsCon'>
          <div>
            <h1>인기 프로젝트</h1>
            <h5>주목할만한 프로젝트를 소개합니다</h5>
          </div>
        </div>
        <div className='topspace'></div>
        <div className='TopPostsConi'>
          <button onClick={previousSlide}>이전</button>
          <button onClick={nextSlide}>다음</button>
        </div>
      </div>
      <div className="data-container">
        <Slider ref={sliderRef} {...settings}>
          {slideContents.map((data, index) => {
            const deadlineDate = new Date(data.board_deadline);
            const todayMillis = today.getTime();
            const deadlineMillis = deadlineDate.getTime();
            const daysDifference = Math.floor((deadlineMillis - todayMillis) / (1000 * 60 * 60 * 24));
            const isExpired = daysDifference < 0;
            const contentClassName = `top-posts-slide-content ${isExpired ? 'expired' : ''}`;
            return (
              <Link to={`selectpostviews/${data.id}`} key={index} state={data}>
                <div className={contentClassName} key={index}>
                  {isExpired ? (
                    <div className='topHeader'>
                      <div className='topHeader-day0'>모집마감</div>
                    </div>
                  ) : (
                    <div className='topHeader'>
                      <div className='topHeader-day'>{daysDifference}일 남음</div>
                    </div>
                  )}
                  <div className='topBody'><div className='topBody-title'>{data.title}</div><div className='topBody-bookmark'><img src={bookmarkon} alt="" /></div></div>
                  <div className='topBody-topTail'>모집분야</div>
                  <div className='topTail'>
                    {data.board_position.split(',').map((position, positionIndex) => (
                      <div
                        key={positionIndex}
                        className={`top-board_position ${getPositionColor(position)}`}
                      >
                        {position}
                      </div>
                    ))}
                  </div>
                  <div className='topend'><div className='topend1'>
                    <img src={img} alt="" /></div><div className='topend2'>{data.cust_nick}
                    </div>
                    <div className='topend3'>
                      <img src={viewicon} alt="" />{data.board_views}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TopPosts;
