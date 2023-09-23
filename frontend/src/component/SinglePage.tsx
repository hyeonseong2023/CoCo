import { useLocation } from 'react-router-dom';
import Post from './BoardComponent/Post';
import '../css/Board.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from './Header';
import Cookies from 'js-cookie';

const SinglePage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const boardIdFromPathname = pathParts[pathParts.length - 1];

  const [boardData, setBoardData] = useState<any>(null);

  const fetchData = async () => {
    console.log("쿠키에 들어있는 아이디: ", Cookies.get('CUST_ID'));

    const boardId = boardIdFromPathname;

    try {
      const response = await axios.get(`http://localhost:8099/selectpostviews/${boardId}`, {
        params: {
          cust_id: Cookies.get('CUST_ID'),
        },
      });
      console.log("게시글 데이터:", response.data[0]);
      setBoardData(response.data[0]);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleLoginButtonClick = () => {
  };

  return (
    <div>
      <Header onLoginButtonClick={handleLoginButtonClick} />
      <div className="board">
        {boardData && (
          <Post
            data={boardIdFromPathname}
            boardData={boardData}
          ></Post>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
