import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/TopPosts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface PostData {
  id: string;
  title: string;
  board_deadline: string;
  board_position: string;
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
      const response = await axios.get("http://localhost:8099/popularlist");
      const fetchedData: PostData[] = response.data.map((item: any) => ({
        id: item.board_id,
        title: item.board_title,
        board_deadline: item.board_deadline,
        board_position: item.board_position,
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
    slidesToShow: 3,
    slidesPerRow: 1,
  };

  // 현재 날짜 가져오기
  const today = new Date();

  return (
    <div className='TopPostsC'>
      <div className='TopPostsCo'>
        <div className='TopPostsCon'> <h2>인기글<br/>인기 게시글</h2><br/><br/> </div>
        <div className='TopPostsConi'>
          <button onClick={previousSlide}>이전</button>
          <button onClick={nextSlide}>다음</button>
        </div>
      </div>
      <div className="data-container">
        <Slider ref={sliderRef} {...settings}>
          {slideContents.map((data, index) => {
            // 마감일을 Date 객체로 변환
            const deadlineDate = new Date(data.board_deadline);
            
            // 현재 날짜를 밀리초로 변환
            const todayMillis = today.getTime();
            // 마감일을 밀리초로 변환
            const deadlineMillis = deadlineDate.getTime();
            // 밀리초를 일로 변환
            const daysDifference = Math.floor((deadlineMillis - todayMillis) / (1000 * 60 * 60 * 24));
            const isExpired = daysDifference < 0;
            const contentClassName = `top-posts-slide-content ${isExpired ? 'expired' : ''}`;

            return (
              <Link to={`/Contents/${data.id}`} key={index} state={data}>
                <div className={contentClassName} key={index}>
                {isExpired ? (
                    <div>모집 종료</div>
                  ) : (
                    <div>남은 일 수: {daysDifference}일</div>
                  )}
                  <div className='toptitle'>{data.title}</div>
                  <div>{data.board_position}</div>
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
