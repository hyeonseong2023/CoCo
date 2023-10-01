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
    const boardId = boardIdFromPathname;
    console.log("싱글",`http://localhost:8099/selectpostviews/${boardIdFromPathname}`);

    try {
      const response = await axios.get(`http://localhost:8099/selectpostviews/${boardIdFromPathname}`, {
        params: {
          cust_id: Cookies.get('CUST_ID'),
        },
      });
      console.log("싱글",response);
      
      setBoardData(response.data[0]);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Header/>
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
