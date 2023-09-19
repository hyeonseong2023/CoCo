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
        id: item.popularList.board_id,
        title: item.popularList.board_title,
        board_deadline: item.popularList.board_deadline,
        board_position: item.popularList.board_position,
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

  return (
    <div className='TopPostsC'>
      <div className='TopPostsCo'>
        <div className='TopPostsCon'> 주간인기글 </div>
        <div className='TopPostsConi'>
          <button onClick={previousSlide}>이전</button>
          <button onClick={nextSlide}>다음</button>
        </div>
      </div>
      <div className="data-container">
        <Slider ref={sliderRef} {...settings}>
          {slideContents.map((data, index) => (
            <Link to={`/Contents/${data.id}`} key={index} state={data}>
              <div className="top-posts-slide-content" key={index}>
                <div>{data.board_deadline}</div>
                <div>{data.title}</div>
                <div>{data.board_position}</div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopPosts;
