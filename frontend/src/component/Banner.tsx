import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Banner.css';
const Banner = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='Banner-container'>
      {/* 슬라이더 컴포넌트 */}
      <Slider {...settings}>
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
        {/* 원하는 만큼 슬라이드를 추가할 수 있습니다. */}
      </Slider>
    </div>
  );
}

export default Banner;
