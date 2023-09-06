import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Banner.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    cssEase: 'linear',
    autoplay: true,
    draggable: false,
    autoplaySpeed: 3000,
  };
  

  const slideContents = [
    {
      image: 'https://cdn.imweb.me/upload/a7c97c29da69a.png',
      altText: '이미지 1',
      caption: '이미지 1 설명',
      link: 'https://www.musinsa.com/app/', // 슬라이드 1에 대한 링크 설정 (원하는 URL로 변경)
    },
    {
      image:
        'https://lh3.googleusercontent.com/-WLUHtnzZL_dHATAmOgjvKyl0ZhTEu4edNBC8u6EB4i0TilKAQbN60CWXwLkg3ZrcUs=w895-rwa',
      altText: '이미지 2',
      caption: '이미지 2 설명',
      link: 'https://www.notion.so/ko-kr', // 슬라이드 2에 대한 링크 설정 (원하는 URL로 변경)
    },
    {
      image: 'https://static-cse.canva.com/blob/649373/createbanners.jpg',
      altText: '이미지 3',
      caption: '이미지 3 설명',
      link: '', // 슬라이드 3에 대한 링크 설정 (원하는 URL로 변경)
    },
    // 원하는 만큼 슬라이드 컨텐츠를 추가할 수 있습니다.
  ];

  return (
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
  );
};

export default Banner;
