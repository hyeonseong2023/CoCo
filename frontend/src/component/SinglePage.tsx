import { useLocation } from 'react-router-dom';

import Post from './BoardComponent/Post';
import '../css/Board.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from './Header';
import Cookies from 'js-cookie';


const SinglePage: React.FC = () => {
  const location = useLocation();
  const data = location.state as any;

  const [boardData, setBoardData] = useState();

  const fetchData = async () => {
    console.log("콘텐츠에서 온 데이터", data);
    console.log("axios 전");

    await axios.get(`${process.env.REACT_APP_URL_8099}/selectpostviews/${data.id}/${Cookies.get('CUST_ID')}`)
      .then(res => {

        // console.log(res.data);
        console.log("싱글페이지 데이터:", res.data[0]);
        setBoardData(res.data[0]);
      })
    console.log("axios 후");
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
        {boardData && <Post data={data} boardData={boardData}></Post>}
      </div>

    </div>
  );
};

export default SinglePage;
