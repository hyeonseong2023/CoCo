import React from 'react';
import { useLocation } from 'react-router-dom';

const SinglePage = () => {
  const location = useLocation();
  const data = location.state as any;

  return (
    <div>
      <h1>Single Page Content for ID {data.id}</h1>
      <p>Title: {data.title}</p>
      <p>Content: {data.content}</p>
      <p>Name: {data.name}</p>
      <p>Deadline: {data.board_deadline}</p>
      <p>Date: {data.board_dt}</p>
      <p>Members: {data.board_members}</p>
      <p>Open Link: {data.board_openlink}</p>
      <p>Period: {data.board_period}</p>
      <p>Position: {data.board_position}</p>
      <p>Views: {data.board_views}</p>
      <p>Customer ID: {data.cust_id}</p>
      <p>Profile Image: {data.pro_img}</p>
      <p>Profile Link: {data.pro_link}</p>
      <p>Profile Title: {data.pro_title}</p>
    </div>
  );
};

export default SinglePage;
