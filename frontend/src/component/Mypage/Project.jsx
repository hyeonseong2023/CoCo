import '../../css/Project.css';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import teamSelect from '../../img/teamselect.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Project = ({ data }) => {
  const navigator = useNavigate();

  // const custId = data.CUST_ID ; // 마이페이지 아이디
  // const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디

  //프로젝트 데이터 Map으로 돌리기
  console.log('data', data);
  const projectData = data.PROJECT.map((item) => ({
    proId: item.BOARD_ID, //게시글 아이디
    proTitle: item.PRO_TITLE, // 프로젝트 명
    //  proLink : item.PRO_LINK, // 보드아이디
    proImg: item.PRO_IMG, //프로젝트 이미지
  }));

  useEffect(() => {
    console.log(projectData);
  }, [projectData]);

  //팀원찾기 클릭시 메인페이지로 이동
  const HandleTeamSelect = () => {
    navigator('/');
  };

  // 해당 프로젝트 클릭시
  const HandleProject = (id, CamLink) => {
    //게시글번호와 화상회의 링크를 전달받음
  };

  return (
    <div>
      {projectData.length == 0 && (
        <div>
          <div className="null-project">
            {' '}
            <span>같이 작업중인 팀원들이 없어요 </span>{' '}
          </div>
          <img
            src={teamSelect}
            className="teamSelect"
            onClick={HandleTeamSelect}
          ></img>
        </div>
      )}

      {/* 프로젝트 보여주는 곳 */}
      <div className="project-map-container">
        {projectData.map((item, index) => (
          <div className="project-container">
            <div key={item.idex}>
              <Link
                to={'/pp'}
                state={{ projectId: item.proId, nick: data.CUST_NICK }}
              >
                {item.proImg ? (
                  <img
                    src={'data:image/;base64,' + item.proImg}
                    className="project-img"
                    alt=""
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + '/projecImg/projectImg.png'}
                    alt=""
                  ></img>
                )}
              </Link>
              <div>
                {' '}
                <p>{item.proTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
