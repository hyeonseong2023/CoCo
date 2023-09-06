import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Banner.css';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slideContents = [
    {
      image: 'https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_1280.jpg',
      altText: '이미지 1',
      caption: '이미지 1 설명',
    },
    {
      image: 'https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-into-the-june-sunflower-background-image_788302.jpg',
      altText: '이미지 2',
      caption: '이미지 2 설명',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NzLWwJ_KU3gxIkPqpYb5tRumQOp6x_RLf86PRFQin65qwPAJE1ng5JyPw2NapkdllgI&usqp=CAU',
      altText: '이미지 3',
      caption: '이미지 3 설명',
    },
    // 원하는 만큼 슬라이드 컨텐츠를 추가할 수 있습니다.
  ];

  return (
    <div className='Banner-container'>
      <Slider {...settings}>
        {slideContents.map((content, index) => (
          <div className='slide-content' key={index}>
            <img
              src={content.image}
              alt={content.altText}
              className='slide-image'
            />
            <div className='slide-caption'>
              <p>{content.caption}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
