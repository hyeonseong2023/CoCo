import React, { useEffect, useState } from 'react';
import '../css/TopPosts.css';
import axios from 'axios';

const TopPosts = () => {
  const [newData, setNewData] = useState<any[]>([]); 

  useEffect(() => {

    if (newData.length === 0) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8099/popularlist");

      console.log(response);
      
      const fetchedData = response.data.map((item: any) => ({
        id: item.popularList.board_id,
        title: item.popularList.board_title,
        board_deadline: item.popularList.board_deadline,
        board_position: item.popularList.board_position,
      
        

      }));

      setNewData(fetchedData); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className='TopPostsC'>
      <h3>Top Posts:</h3>
      <div className="data-container">
        {newData.map((data, index) => (
          <div key={index}>
            <h4>{data.board_deadline}</h4>
            <h4>{data.title}</h4>
            <h4>{data.board_position}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
