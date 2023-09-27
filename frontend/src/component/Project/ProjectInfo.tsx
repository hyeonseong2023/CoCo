import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from './context/ProjectContext';

const ProjectInfo = () => {
  const projectId = useContext(ProjectContext);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectImg, setProjectImg] = useState('');

  useEffect(() => {}, []);
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/`;
    const data = { board_id: parseInt(projectId!) };
    await axios.post(url, data).then((res) => {
      console.log(res.data);
    });
  };
  return <div></div>;
};

export default ProjectInfo;
