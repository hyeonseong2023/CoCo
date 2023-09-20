import React from 'react';

const CustomPrevArrow = (props: { onClick: any; }) => {
  const { onClick } = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
        <button> 왼쪽 </button>
    </div>
  );
};

const CustomNextArrow = (props: { onClick: any; }) => {
  const { onClick } = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
        <button> 오른쪽</button>
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
