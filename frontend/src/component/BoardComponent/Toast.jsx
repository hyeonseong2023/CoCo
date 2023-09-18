import { useEffect } from "react";

function Toast({ setBmkImgClicked, isEmptyBmk }) {

    const bmkText = isEmptyBmk? "북마크에서 삭제 되었습니다." : "북마크에 추가 되었습니다."


  useEffect(() => {
    const timer = setTimeout(() => {
        setBmkImgClicked(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setBmkImgClicked]);

  
  return (
    <div className="toast">
      <p>{bmkText}</p> 
    </div>
  );
}

export default Toast;