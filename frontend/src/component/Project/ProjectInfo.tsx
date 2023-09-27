import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from './context/ProjectContext';
import plus from '../../img/plus.png';

const ProjectInfo = () => {
  const projectId = useContext(ProjectContext);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectImg, setProjectImg] = useState<string | ArrayBuffer | null>();
  const [file, setFile] = useState<File>();

  useEffect(() => {}, []);
  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/`;
    const data = { board_id: parseInt(projectId!) };
    await axios.post(url, data).then((res) => {
      console.log(res.data);
    });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
  };

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProjectImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <input
        value={projectTitle}
        placeholder="프로젝트명을 입력해주세요"
        onChange={onChangeTitle}
      ></input>
      <label htmlFor="file-input">
        <img src={plus} alt="파일 선택" />
      </label>

      <input
        id="file-input"
        type="file"
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        className="plus-img-input"
        onChange={onChangeImg}
      />
      {projectImg ? (
        <img src={'' + projectImg} alt=""></img>
      ) : (
        <div>사진을 업로드해주세요</div>
      )}
      <input type="file"></input>
    </div>
  );
};

export default ProjectInfo;
