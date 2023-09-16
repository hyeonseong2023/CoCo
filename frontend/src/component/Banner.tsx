import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Banner.css';
import Bimg from '../img/imgB.png'
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
      image: `${Bimg}`,
      altText: '이미지 1',
      caption: '',
      link: 'https://www.musinsa.com/app/',
    },
    {
      image:
        'https://lh3.googleusercontent.com/-WLUHtnzZL_dHATAmOgjvKyl0ZhTEu4edNBC8u6EB4i0TilKAQbN60CWXwLkg3ZrcUs=w895-rwa',
      altText: '이미지 2',
      caption: '이미지 2 설명',
      link: 'https://www.notion.so/ko-kr',
    },
    {
      image: 'https://static-cse.canva.com/blob/649373/createbanners.jpg',
      altText: '이미지 3',
      caption: '이미지 3 설명',
      link: '', 
    },
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
