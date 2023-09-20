import { useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";


function Toast({ setBmkImgClicked, isEmptyBmk, data }) {

    const bmkText = isEmptyBmk? "북마크에서 삭제 되었습니다." : "북마크에 추가 되었습니다."
    const cust_id = Cookies.get('CUST_ID')
    const board_id = data.id

    const sendBookmarkRequest = async (isEmptyBmk) => {
      const apiUrl = isEmptyBmk
          ? 'http://localhost:8099'
          : 'http://localhost:8099/bookmarkcheck';
  
      try {
          const response = await axios.post(apiUrl, {cust_id:cust_id, board_id:board_id});
          console.log(response.data);
      } catch (error) {
          console.error("Error sending bookmark request: ", error);
      }
    }

  useEffect(() => {
    sendBookmarkRequest(isEmptyBmk);

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