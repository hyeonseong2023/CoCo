import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Banner.css';
import imgA from '../img/Banner_A.png';
import imgB from '../img/Banner_B.png';
import imgC from '../img/Banner_C.png';


const Banner = () => {
  const settings = {
    dots: true,
    infinite: true, // 무한 반복 활성화
    speed: 300,
    cssEase: 'linear',
    autoplay: true,
    draggable: false,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    slidesToShow: 1,
  };

  const slideContents = [
    {
      image: `${imgA}`,
      altText: '이미지 1',
      caption: '',
      link: 'https://www.musinsa.com/app/',
    },
    {
      image:
        `${imgB}`,
      altText: '이미지 2',
      caption: '',
      link: 'https://www.notion.so/ko-kr',
    },
    {
      image:
        `${imgC}`,
      altText: '이미지 3',
      caption: '',
      link: '',
    },
  ];

  return (
    <div className='Banner-main'>
      <div className='banner-space'></div>
      <div className="Banner-container">
        <Slider {...settings}>
          {slideContents.map((content, index) => (
            <div className="slide-content" key={index}>
              <a href={content.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={content.image}
                  alt={content.altText}
                  className="slide-image"
                />
              </a>
              <div className="slide-caption">
                <p>{content.caption}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
