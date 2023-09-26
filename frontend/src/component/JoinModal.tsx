import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../css/JoinModal.css';
import Select from 'react-select';
import nextBtn from '../img/nextBtn.png';
import X from '../img/x.png';
import Logo from '../img/Logo.png';
import axios from 'axios';
import { useEffect } from 'react';
import startBtn from '../img/startBtn.png';
import { useNavigate } from 'react-router-dom';


type FormData = {
  nickname: string;
  job: string;
  experience: string;
  interests: string;
};

type JoinModelProps = {
  onClose: () => void;
};

const JoinModel = ({ onClose, setIsJoinModal }:{onClose: ()=>void, setIsJoinModal: (isJoinModal: boolean)=>void}) => {
  const defaultFormData: FormData = {
    nickname: '',
    job: '-- 선택 --',
    experience: '-- 선택 --',
    interests: '-- 선택 --',
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [validationMessage, setValidationMessage] = useState<string>('');

  // 모달을 닫는 함수
  const closeModal = () => {
    Cookies.remove('coin'); // 쿠키 제거 
    onClose();
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.nickname === '' ||
      formData.job === '-- 선택 --' ||
      formData.experience === '-- 선택 --' ||
      formData.interests === '-- 선택 --'
    ) {
      setValidationMessage('모든 항목을 선택해주세요.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_8099}/firstlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CUST_ID: Cookies.get('CUST_ID'),
          CUST_NICK: formData.nickname,
          CUST_CAREER: formData.experience,
          SKILL_NAME: formData.interests,
        }),
      });

      if (response.ok) {
        console.log('데이터가 서버에 성공적으로 전송되었습니다.');
        Cookies.set('CUST_IMG', "기본")
      } else {
        console.error('데이터를 서버로 전송하는 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('데이터를 서버로 전송하는 중 오류가 발생했습니다.', error);
    }

    Cookies.remove('coin');
    window.location.replace("/")
  };


  // 다영시작 

  const navigator = useNavigate();

  const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디 
  const [nick, setNick] = useState(""); // 닉네임
  const [pselected, setPselected] = useState({ value: "", name: "" });  // 선택한 포지션 
  const [cselected, setCselected] = useState({ value: "", name: "" })  // 선택한 경력
  const [selected, setSelected] = useState<string[]>([]);  // 선택한 관심스택

  // 포지션 종류
  const positionList = [
    { value: "", name: "" },
    { value: "백엔드", name: "백엔드" },
    { value: "프론트엔드", name: "프론트엔드" },
    { value: "디자이너", name: "디자이너" },
    { value: "IOS", name: "IOS안드로이드" },
    { value: "안드로이드", name: "안드로이드" },
    { value: "데브옵스", name: "데브옵스" },
    { value: "PM", name: "PM" },
    { value: "기획자", name: "기획자" }
    //포지션 종류 참고하세요 
  ]

  // 경력 종류
  const careerList = [
    { value: "", name: "" },
    { value: "1년", name: "1년" },
    { value: "2년", name: "2년" },
    { value: "3년", name: "3년" },
    { value: "4년", name: "4년" },
    { value: "5년", name: "5년" },
    { value: "6년", name: "6년" },
    { value: "7년", name: "7년" },
    { value: "8년", name: "8년" },
    { value: "9년", name: "9년" },
    { value: "10년이상", name: "10년이상" }
  ];

  //관심스택 종류 
  const skills = [
    { label: "Spring", value: "Spring" },
    { label: "JavaScript", value: "javaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Vue", value: "Vue" },
    { label: "Nodejs", value: "Nodejs" },
    { label: "Java", value: "Java" },
    { label: "Nextjs", value: "Nextjs" },
    { label: "Express", value: "Express" },
    { label: "Go", value: "Go" },
    { label: "C", value: "C" },
    { label: "Python", value: "Python" },
    { label: "Django", value: "Django" },
    { label: "kotlin", value: "kotlin" },
    { label: "MySQL", value: "MySQL" },
    { label: "MongoDB", value: "MongoDB" },
    { label: "php", value: "php" },
    { label: "GraphQL", value: "GraphQL" },
    { label: "ebase", value: "ebase" },
    { label: "ReactNative", value: "ReactNative" },
    { label: "Unity", value: "Unity" },
    { label: "Flutter", value: "Flutter" },
    { label: "AWS", value: "AWS" },
    { label: "Kubernetes", value: "Kubernetes" },
    { label: "Docker", value: "Docker" },
    { label: "Git", value: "Git" },
    { label: "Figma", value: "Figma" },
    { label: "Zeplin", value: "Zeplin" }
  ]

  let skillNames = selected.join(','); // 배열을 문자열로 합침 
  const [welcomeOpen, setWelcomeOpen] = useState(false);  // Welcome modal 오픈여부 



  useEffect(() => {

  }, [welcomeOpen])


  // 통신 (기본정보 저장)
  const handleAdd = async () => {

    console.log(loginUserId);
    console.log(nick);
    console.log(pselected.value);
    console.log(cselected.value);
    console.log(skillNames);


    const requestData = {
      cust_id: loginUserId, //아이디 
      cust_nick: nick,     //닉네임
      cust_position: pselected.value, //포지션
      cust_career: cselected.value, // 경력
      cust_skill: skillNames,
      cust_img: "dsad"
    };

    try {
      await axios.post(`${process.env.REACT_APP_URL_8099}/firstlogin`, requestData);
      console.log('요청이 성공했습니다.');
      setWelcomeOpen(true);
    } catch (error) {
      console.error('요청이 실패했습니다.', error);
    }

  }


  const handleStart =()=>{
    onClose();
    setWelcomeOpen(false);
    setIsJoinModal(false)

    Cookies.remove('coin');
    navigator('/');
    //window.location.replace("/")
    //navigator('/');   // 메인 페이지로 이동
  }


  return (
        <div className="modal-overlay">
          <div className="modal-content">

            {/* 모달 닫기 부분  */}
            <div className='join-modal-user-close'>
              <img className='join-modal-user-img' src={Logo}></img>
              <img src={X} className="join-modal-user-close-button" onClick={closeModal}></img>
            </div>

            {/* 환영인사 부분  */}
            <div className='join'> <h1>CoCo에 처음이시군요!</h1> </div>
            <div className='join-text'> <h1>기본정보를 입력해주세요 </h1> </div>

            {/* 정보 입력 부분 */}
            <form className='join-container'>
              <table>
                <tbody>
                  {/* 닉네임 */}
                  <tr>
                    <td className='join-user-modal-name'>닉네임</td>
                    <td><input className='join-user-modal-content' type="text" value={nick} onChange={(e) => { setNick(e.target.value) }} ></input></td>
                  </tr>
                  {/* 직무 */}
                  <tr>
                    <td className='join-user-modal-name'>직무</td>
                    <td>
                      <select
                        className='join-user-modal-content'
                        value={pselected.value}
                        onChange={(e) => setPselected({ value: e.target.value, name: e.target.value })}
                      >
                        {positionList.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/* 경력*/}
                  <tr>
                    <td className='join-user-modal-name'>경력</td>
                    <td>
                      <select
                        className='join-user-modal-content'
                        value={cselected.value}
                        onChange={(e) => setCselected({ value: e.target.value, name: e.target.value })}
                      >
                        {careerList.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {/* 관심스택 (다중선택) */}
                  <tr>
                    <td className='join-user-modal-name'>관심스택</td>
                    <td>
                      <Select
                        className='join-Multi'
                        options={skills}
                        isMulti
                        value={skills.filter((option) =>
                          selected.includes(option.value)
                        )}
                        onChange={(selectedOptions: any) => {
                          if (selectedOptions.length <= 4) {
                            setSelected(
                              selectedOptions.map((option: any) => option.value)
                            );
                          }
                        }}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            fontSize: '13px', // 폰트 크기 조절
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: '15px', // 옵션 폰트 크기 조절
                          }),
                        }}
                        placeholder=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>

            {/* 다음 버튼  */}
            <div>
              <img src={nextBtn} className='nextBtn' onClick={handleAdd}></img>
            </div>
          </div>


          {welcomeOpen && (
        <div className="modal-overlay">
          <div className="delete-modal-content">

            {/* 환영인사 부분  */}
            <div className='welcome-text1'> <h1>{nick}님 축하합니다!</h1> </div>
            <div className='welcome-text2'> <h1>회원가입 되었습니다!</h1> </div>
            <img src={Logo} className='welcome-logo'></img>
            <img src={startBtn} className='startBtn' onClick={handleStart}></img>
          </div>
        </div>
      )}
        </div>
  

  )
}

export default JoinModel;
