import { useEffect, useState } from 'react'
import axios from 'axios';
import Select from 'react-select';
import Cookies from 'js-cookie';
import Cookiess from 'universal-cookie';
import '../../css/User.css';
import Logo from '../../img/Logo.png';
import Git from '../../img/Git.png';
import plus from '../../img/plus.png'
import editBtn from '../../img/editBtn.png';
import X from '../../img/x.png';
import profile from '../../img/profilePicture.png';
import { useNavigate } from 'react-router-dom';
import Logout from '../../img/Logout.png'

import link from '../../img/link.png';
import link1 from '../../img/link1.png'; 
import link2 from '../../img/link2.png'; 
import link3 from '../../img/link3.png'; 



const User = ({ data }) => {

    const cookies = new Cookiess();

    const navigator = useNavigate();
    // const cookies = new Cookies();
    
    const userId = Cookies.get('CUST_ID'); //사용자 아이디 
    const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디

    //모달창 노출 여부 
    const [modalOpen, setModalOpen] = useState(false); //회원정보수정 모달창 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); //회원탈퇴 모달창 

    //기본정보 
    const [nick, setNick] = useState();
    const [position, setPosition] = useState();
    const [career, setCareer] = useState();
    const [git, setGit] = useState();
    const [link, setLink] = useState(); 
    const [photo, setPhoto] = useState(); // 프로필사진 
    //const photoData = "data:image/;base64," + photo;



    //모달창  
    const [modalGit, SetModalGit] = useState(git); // 모달 Git 주소 변경 
    const [modalLink, setModalLink] = useState(link); // 모달 기타 링크 주소 변경 
    const [Image, setImage] = useState(photo); // 모달 프로필사진 변경 
    const [modalNick, setModalNick] = useState(data.CUST_NICK); // 모달 닉네임 변경
    const [pselected, setPselected] = useState({ value: position, name: position }); // 모달 선택한 직무 
    const [cselected, setCselected] = useState({ value: career, name: career }) // 모달 선택한 경력
    


    const custSkillList = data.CUST_SKILL.split(',');  // 관심스택 
 
  
    const [selected, setSelected] = useState(custSkillList); // 모달에서 선택한 관심스택 
    const cust_skill = selected.join(','); 
   
    


    const fetchData = async() => {
        setNick(data.CUST_NICK);
        setPosition(data.CUST_POSITION);
        setCareer(data.CUST_CAREER);
        setGit(data.CUST_GIT); 
        setModalLink(data.CUST_LINK); 
      }

      useEffect(()=>{
          fetchData()
      }, [data])
  


      useEffect(()=>{
   
        setModalNick(data.CUST_NICK); 
        setPselected({ value: position, name: position });
        setCselected({ value: career, name: career });
        setSelected(custSkillList);
        SetModalGit(data.CUST_GIT)

    }, [modalOpen])


    // 프로필사진 
    useEffect(() => {
        if (data.CUST_IMG == null) { //지정안했으면 기본사진 
            setPhoto(profile)
        } else {
            setPhoto("data:image/;base64," + data.CUST_IMG)
        }
        setImage(photo)
    }, [])

    //모달창 프로필사진 가져오기 
    useEffect(() => {
        setImage(photo)

    }, [photo])


    // 회원탈퇴 버튼 클릭 시 모달창 열기 
    const openDeletePopup = () => {
        setModalOpen(false);
        setDeleteModalOpen(true);
    };

    // 회원탈퇴 버튼 클릭 시 모달창 닫기
    const closeDeletePopup = () => {
        setDeleteModalOpen(false);
    };


    // 포지션 종류
    const positionList = [
        { value: "백엔드", name: "백엔드" },
        { value: "프론트엔드", name: "프론트엔드" },
        { value: "디자이너", name: "디자이너" },
        { value: "IOS", name: "IOS" },
        { value: "안드로이드", name: "안드로이드" },
        { value: "데브옵스", name: "데브옵스" },
        { value: "PM", name: "PM" },
        { value: "기획자", name: "기획자" }
    ]

    // 경력 종류
    const careerList = [
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
        { label: "AWS", value: "AWS" },
        { label: "C", value: "C" },
        { label: "Django", value: "Django" },
        { label: "Docker", value: "Docker" },
        { label: "Express", value: "Express" },
        { label: "Figma", value: "Figma" },
        { label: "Firebase", value: "Firebase" },
        { label: "Flutter", value: "Flutter" },
        { label: "Git", value: "Git" },
        { label: "Go", value: "Go" },
        { label: "GraphQL", value: "GraphQL" },
        { label: "Java", value: "Java" },
        { label: "JavaScript", value: "javaScript" },
        { label: "Kotlin", value: "Kotlin" },
        { label: "Kubernetes", value: "Kubernetes" },
        { label: "MongoDB", value: "MongoDB" },
        { label: "MySQL", value: "MySQL" },
        { label: "Nestjs", value: "Nestjs" },
        { label: "Nextjs", value: "Nextjs" },
        { label: "Nodejs", value: "Nodejs" },
        { label: "php", value: "php" },
        { label: "Python", value: "Python" },
        { label: "ReactNative", value: "ReactNative" },
        { label: "Spring", value: "Spring" },
        { label: "Swift", value: "Swift" },
        { label: "TypeScript", value: "TypeScript" },
        { label: "Unity", value: "Unity" },
        { label: "Vue", value: "Vue" },
        { label: "Zeplin", value: "Zeplin" }
    ]


    //프로필사진 파일 
    const [file, setFile] = useState();

    const onChange = (e) => {

        if (e.target.files[0]) {
            setFile(e.target.files[0])
        } else { //업로드 취소할 시
           setFile(null);
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

        
    }



    // 통신(프로필수정)
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('cust_id', userId); //아이디
        formData.append('cust_nick', modalNick); //닉네임
        formData.append('cust_position', pselected.value); //직무
        formData.append('cust_career', cselected.value); //경력
        formData.append('cust_skill',cust_skill); //관심스택
        formData.append('cust_img1', file); //이미지 파일 
        formData.append('cust_git', modalGit); //git주소 
        formData.append('cust_link', modalLink); //기타주소 

        axios.put(`${process.env.REACT_APP_URL_8099}/userinfoupdate`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log('요청이 성공했습니다.', response.data);
            })
            .catch((error) => {
                console.error('요청이 실패했습니다.', error);
            });
    }

    

    // 통신(회원탈퇴)
    const deleteCust =async () =>{
       
        const requestData = {
            cust_id : userId
          };

          try {
            await axios.delete('http://localhost:8099/deletecust', { data: requestData });
            console.log('요청이 성공했습니다.');
            Cookies.remove('CUST_ID');  // 아이디 쿠키 삭제
            Cookies.remove('CUST_IMG'); // 이미지 쿠키삭제 
            navigator('/');   // 메인 페이지로 이동
            
          } catch (error) {
            console.error('요청이 실패했습니다.', error);
          }
      
    }

    const handleLogout = () => {
        Cookies.remove('CUST_ID');  // 아이디 쿠키 삭제
        Cookies.remove('CUST_IMG'); // 이미지 쿠키삭제 
        navigator('/');   // 메인 페이지로 이동
      };  


    

    return (
        <div>

            {/* 마이페이지 나의 프로필 정보  */}
            <div className='Mypage-user-container'>

               {/* 편집버튼 */}
                {userId === loginUserId && (
                  <img src={editBtn} className='Mypage-user-eidt-button ' onClick={(e) => { setModalOpen(true) }} />
                )}

                {/* 나의 프로필정보 */}
                <div className='Mypage-user-img-container'>
                    <img src={photo} alt='이미지 출력되지 않았음' className='user-img' />
                    {/* { photo !=null ? 
                    <img src={"data:image/;base64," + photo} alt='이미지 출력되지 않았음' className='user-img' />
                    : <img src = {profile}  alt='이미지 출력되지 않았음' className='user-img'/> } */}
                </div>
                <div className='Mypage-user-nickname'>{nick}</div>
                <div>
                    <table className='Mypage-user-table'>
                        <tbody>
                            <tr>
                                <td className='Mypage-user-table-name'>직무</td>
                                <td className='Mypage-user-table-content'>{position}</td>
                            </tr>
                            <tr>
                                <td className='Mypage-user-table-name'>경력</td>
                                <td className='Mypage-user-table-content'>{career}</td>
                            </tr>
                            <tr>
                                <td className='Mypage-user-table-name'>관심스택</td>
                                <td className='Mypage-user-table-content'>
                                {custSkillList.map((skill, index) => (
                                 <span key={index}>{skill} &nbsp;</span>
                                ))}
                                     </td>
                                {/* 이미지로 보여주기 
                                    <td className='skillImg'>
                                    {custSkillList.map((custSkill, index) => (
                                        <img key={index} src={process.env.PUBLIC_URL + `/skillImg/${custSkill}.svg`} alt={custSkill} />
                                    ))} */}
                            </tr>
                            <tr>
                                <td className='Mypage-user-table-name'>링크</td>
                                <td className='Mypage-user-table-content'>
                                    <a href={git} target="_blank"><img src={Git}></img></a> <sapn/> {/* 깃허브 주소 */}
                                    <a href={link}target="_blank"><img src={link1}></img></a>   {/* 다른 기타사항 주소 */}
                                </td>
                            </tr>               
                        </tbody>
                    </table>
                </div>
            </div >  {/* 마이페이지 나의 프로필 정보 끝  */}

            <div>
             { data?.CUST_ID === loginUserId && (
            //    <img src={Logout} onClick={handleLogout} className='mypage-logout-btn' />
               <div className='logout-text' onClick={handleLogout}> 로그아웃 </div>
              )}
            </div>


            {/* 편집 클릭시 회원정보수정 모달 창 오픈  */}
            {modalOpen && (
                <div className='Mypage-modal-user-back'>
                    <div className='Mypage-modal-user-container'>

                        {/* 모달 닫기 부분  */}
                        <div className='Mypage-modal-user-close'>
                            <img className='Mypage-modal-user-img' src={Logo}></img>
                            <img src={X} onClick={(e) => { setModalOpen(false); }} className="Mypage-modal-user-close-button"></img>
                        </div>

                        {/* 모달 프로필사진 수정 */}
                        <div>
                            <div className='Mypage-user-img-container'>
                                <img src={Image} alt='이미지 출력되지 않았음' className='Mypage-user-img' />
                            </div>

                            <label for="file-input">
                                <img src={plus} alt="파일 선택" className='Mypage-plus-img' />
                            </label>

                            <input
                                id="file-input"
                                type='file'
                                accept='image/jpg,impge/png,image/jpeg'
                                name='profile_img'
                                className='plus-img-input'
                                onChange={onChange}
                            />

                            {/* 모달창 정보 수정  */}
                            <form method='put'>
                                <table className='Mapage-modal-user-table'>
                                    <tbody>
                                        {/* 닉네임 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>닉네임</td>
                                            <td><input className='Mypage-user-modal-content' type="text" value={modalNick} onChange={(e) => { setModalNick(e.target.value) }} /></td>
                                        </tr>

                                        {/* 직무 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>직무</td>
                                            <td>
                                                <select
                                                    className='Mypage-user-modal-content'
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

                                        {/* 경력 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>경력</td>
                                            <td>
                                                <select
                                                    className='Mypage-user-modal-content'
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
                                       
                                       {/* 관심스택 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>관심스택</td>
                                            <td>
                                                <Select
                                                    className='Multi'
                                                    options={skills} // 스택 종류 
                                                    isMulti 
                                                    value={skills.filter((option) =>  
                                                        selected.includes(option.value)
                                                    )}
                                                    onChange={(selectedOptions) => {
                                                        if (selectedOptions.length <= 4) {
                                                            setSelected(
                                                                selectedOptions.map((option) => option.value)
                                                            );
                                                        }
                                                    }}                                        
                                                    styles={{
                                                        control: (provided) => ({
                                                            ...provided,
                                                            fontSize: '14px', // 폰트 크기 조절
                                                        })
                                                    }}
                                                />


                                            </td>
                                        </tr>

                                        {/* Git 주소 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>GitHub</td>
                                            <td><input className='Mypage-user-modal-content' type="text" value={modalGit} onChange={(e) => { SetModalGit(e.target.value) }} /></td>
                                        </tr>

                                         {/* 기타 링크 변경 */}
                                        <tr>
                                            <td className='Mypage-user-modal-name'>기타</td>
                                            <td><input className='Mypage-user-modal-content' type="text" value={modalLink} onChange={(e) => { setModalLink(e.target.value) }} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <button className="Mypage-modal_add_Button" type="submit" onClick={handleSubmit}>저장</button>
                                    <button className="Mypage-modal_delete_Button" type="submit" onClick={openDeletePopup}> 회원탈퇴 </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
            } {/* 회원정보수정 모달 창 끝  */}



            {/* 회원탈퇴 모달창  */}
            {deleteModalOpen && (
                <div className='Mypage-modal-user-back'>
                    <div className='Mypage-modal-user-container'>
                        {/* 모달 닫기 부분  */}
                        <div className='Mypage-modal-user-close'>
                            <img className='Mypage-modal-user-img' src={Logo}></img>
                            <img src={X} onClick={closeDeletePopup} className="Mypage-modal-user-close-button"></img>
                        </div>
                        <div className='Mypage-modal-delete-text'>
                            <span className='delete-nickName'>{nick} &nbsp;</span> 
                            <span className='delete-text'>님 , 정말 탈퇴하시겠어요?</span>
                        </div>
                        <div className='Mypage-modal-delete-content'>
                            탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
                        </div>
                        <button className="Myapge-modal_delete" type="submit" onClick={deleteCust}> 탈퇴 </button>
                        <button className="Mypage-modal_delete_Cancle" type="submit" onClick={closeDeletePopup}> 취소 </button>
                    </div>
                </div>)}  {/* 회원탈퇴 모달 창 끝  */}
        </div >
    )
}


export default User