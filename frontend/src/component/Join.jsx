import React from 'react';

type JoinProps = {
  imageValue: string | null; // 이미지 값을 전달할 Props
};

const Join: React.FC<JoinProps> = ({ imageValue }) => {
  return (
    <div>
      {/* Join 컴포넌트 내에서 imageValue를 사용할 수 있음 */}
      {imageValue === null ? (
        // 이미지 값이 null인 경우의 처리
        <div>회원가입 폼을 표시 또는 원하는 내용을 표시하세요.</div>
      ) : (
        // 이미지 값이 있을 경우의 처리
        <div>로그인 후 이미지가 있습니다.</div>
      )}
    </div>
  );
};

export default Join;
