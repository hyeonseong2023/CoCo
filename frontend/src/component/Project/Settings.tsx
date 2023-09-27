import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Applicant from './Applicant';
import './css/Settings.css';

export interface Member {
  cust_id: string;
  cust_nick: string;
  cust_img: string;
}

//프로젝트 응모 수락여부 N인 유저 아이디, 닉네임, 프로필사진 ("projectapplylist")

const Settings = () => {
  const [applicants, setApplicants] = useState<Member[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'http://172.30.1.20:8099/projectapplylist';
    const data = { board_id: 51 };
    await axios.post(url, data).then((res) => {
      setApplicants(res.data);
    });
  };

  return (
    <div className="pro-settings-container">
      Settings
      <div className="pro-setting">
        <div>프로젝트 지원자</div>
        <div className="applicants-container">
          {applicants &&
            applicants.map((item, index) => (
              <Applicant
                key={item.cust_id}
                index={index}
                applicants={applicants}
                setApplicants={setApplicants}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
