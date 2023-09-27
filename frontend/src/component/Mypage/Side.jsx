import { useState } from 'react';
import Portfolio from './Portfolio';
import Project from './Project';
import Cookies from 'js-cookie';
import '../../css/Side.css';

const Side = ({ data, anotherId }) => {
  const custId = data.CUST_ID; // 마이페이지 아이디
  const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디
  const [profileSwitch, setProfileSwitch] = useState('포트폴리오');

  return (
    <div className="side-container">
      <div className="side-port-pro-item">
        <div
          className={`side-port-item ${
            profileSwitch === '포트폴리오' ? 'active' : ''
          }`}
          onClick={() => {
            setProfileSwitch('포트폴리오');
          }}
        >
          포트폴리오
        </div>
        {!anotherId && (
          <div
            className={`side-port-item ${
              profileSwitch === '프로젝트' ? 'active' : ''
            }`}
            onClick={() => {
              setProfileSwitch('프로젝트');
            }}
          >
            프로젝트
          </div>
        )}
      </div>

      <div className="side-port-pro-content">
        <div>
          {profileSwitch === '포트폴리오'
            ? data && <Portfolio data={data} anotherId={anotherId} />
            : data && custId === loginUserId && <Project data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Side;
