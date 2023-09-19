import { useLocation } from 'react-router-dom';

import Post from './BoardComponent/Post';
import '../css/Board.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Header from './Header';


const SinglePage: React.FC = () => {
  const location = useLocation();
  const data = location.state as any;

  const [boardData, setBoardData] = useState();

  const fetchData = async() => {
    console.log(data.id);
    console.log(data.cust_id);
    console.log("axios 전");

          await axios.get(`http://localhost:8099/selectpostviews/${data.id}`)
          .then(res => {
              console.log(res.data);
              console.log(res.data[0]);
              setBoardData(res.data[0]);     
          })
    console.log("axios 후");   
  }

  useEffect(()=>{
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
