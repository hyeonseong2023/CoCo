import { useState } from 'react'
import Portfolio from './Portfolio';
import Project from './Project';
import '../../css/Side.css';

const Side = ({ data }) => {

    
    const [profileSwitch, setProfileSwitch] = useState("포트폴리오")

    return (
        <div className='side-container'>

            <div className='side-port-pro-item'>
                <div className={`side-port-item ${profileSwitch === "포트폴리오" ? "active" : ""}`} onClick={() => { setProfileSwitch("포트폴리오") }}>
                    포트폴리오
                </div>
                <div className={`side-port-item ${profileSwitch === "프로젝트" ? "active" : ""}`} onClick={() => { setProfileSwitch("프로젝트") }}>
                    프로젝트
                </div>
            </div>

            <div className='side-port-pro-content'>
                <div>
                    {profileSwitch === "포트폴리오" ? (data && <Portfolio data={data} />) : (data && <Project data={data} />)}
                </div>
            </div>

        </div>
    )
}

export default Side