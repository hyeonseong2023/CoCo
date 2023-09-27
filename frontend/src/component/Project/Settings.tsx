import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Applicant from './Applicant';
import './css/Settings.css';
import ProjectInfo from './ProjectInfo';
import { ProjectContext } from './context/ProjectContext';

export interface Member {
  cust_id: string;
  cust_nick: string;
  cust_img: string;
}

//프로젝트 응모 수락여부 N인 유저 아이디, 닉네임, 프로필사진 ("projectapplylist")

const Settings = () => {
  const projectId = useContext(ProjectContext);
  const [applicants, setApplicants] = useState<Member[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_URL_8099}/projectapplylist`;
    const data = { board_id: parseInt(projectId!) };
    await axios.post(url, data).then((res) => {
      if (res.data.length === 0) return;
      setApplicants(res.data);
    });
  };

  return (
    <div className="pro-settings-container">
      <div></div>
      <div className="pro-setting">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ width: '800px' }}>프로젝트 정보</h1>
        </div>
        <div>
          <ProjectInfo />
        </div>
        <h1>프로젝트 지원자</h1>
        <div className="applicants-container">
          {applicants ? (
            applicants.map((item, index) => (
              <Applicant
                key={item.cust_id}
                index={index}
                applicants={applicants}
                setApplicants={setApplicants}
              />
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '15%',
                // alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              프로젝트 지원자가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
