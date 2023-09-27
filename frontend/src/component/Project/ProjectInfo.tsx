import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ProjectContext } from './context/ProjectContext';
import plus from '../../img/plus.png';

const ProjectInfo = () => {
  const projectId = useContext(ProjectContext);
  if (!projectId) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const [projectTitle, setProjectTitle] = useState('');
  const [projectImg, setProjectImg] = useState<string | ArrayBuffer | null>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/projectinfo`;
    const data = { board_id: parseInt(projectId) };
    await axios.post(url, data).then((res) => {
      setProjectTitle(res.data.pro_title);
      setProjectImg('data:image/;base64,' + res.data.pro_img);
      setFile(base64toFile(res.data.pro_img, '새파일'));
    });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
  };

  const modifyProject = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/projectinfoupdate`;
    let data = new FormData();
    data.append('board_id', projectId);
    data.append('pro_title', projectTitle);
    data.append('pro_img', file!);
    await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('수정 완료');
      });
  };

  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProjectImg(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <div>
      <input
        className="proinfo-input"
        value={projectTitle}
        placeholder="프로젝트명을 입력해주세요"
        onChange={onChangeTitle}
      ></input>
      <button onClick={modifyProject} className="proinfo-modify">
        수정
      </button>
      <input
        id="file-input"
        type="file"
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        className="plus-img-input"
        onChange={onChangeImg}
      />

      <div style={{ position: 'relative' }}>
        {projectImg ? (
          <div>
            <img
              style={{
                height: '200px',
                width: '300px',
                borderRadius: '10px',
              }}
              src={'' + projectImg}
              alt=""
            ></img>
            <label htmlFor="file-input">
              <img
                style={{
                  width: '3%',
                  left: '1%',
                  bottom: '5%',
                  position: 'absolute',
                }}
                src={plus}
                alt="파일 선택"
              />
            </label>
          </div>
        ) : (
          <div
            style={{
              height: '200px',
              width: '300px',
              borderRadius: '10px',
              border: '1px solid gray',
              textAlign: 'center',
              top: '50%',
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/projectImg/projectImg.png'}
              alt=""
            ></img>
            <label htmlFor="file-input">
              <img
                style={{
                  width: '3%',
                  left: '3%',
                  bottom: '3%',
                  position: 'absolute',
                }}
                src={plus}
                alt="파일 선택"
              />
            </label>
          </div>
        )}
      </div>
      <input type="file"></input>
    </div>
  );
};

function base64toFile(base_data: string, filename: string) {
  let bstr = atob(base_data),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename);
}

export default ProjectInfo;
