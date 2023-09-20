import { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';

import '../../css/User.css';
import Logo from '../../img/Logo.png';
import GitHub from '../../img/GitHub.png'
import plus from '../../img/plus.png'
import editBtn from '../../img/editBtn.png';
import X from '../../img/x.png';


const User = ({ data }) => {

    const userId = 'ekdud0225'; //사용자 아이디 


    //모달창 노출 여부 
    const [modalOpen, setModalOpen] = useState(false); //회원정보수정 모달창 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); //회원탈퇴 모달창 

    const [nick, setNick] = useState(data.CUST_NICK);
    const [position, setPosition] = useState(data.CUST_POSITION);
    const [career, setCareer] = useState(data.CUST_CAREER);
    const [git, setGit] = useState(data.CUST_GIT);
    const [photo, setPhoto] = useState(data.CUST_IMG);

    const photoData = "data:image/;base64," + photo;

    // const nick = data.CUST_NICK ;
    // const position = data.CUST_POSITION;
    // const career = data.CUST_CAREER; 
    // const git = data.CUST_GIT; 


    //나의정보에 skill 띄우기 
    let skillNames = data.SKILL_NAME.join(', '); // 배열을 문자열로 합침


    // 모달창 git 주소 
    const [modalNick, SetModalNick] = useState(nick);
    const [modalGit, SetModalGit] = useState(git);


    //MultiSelect에 선택한 skill 띄우기 
    let resultArray = [];
    for (let i = 0; i < data.SKILL_NAME.length; i++) {
        let skillName = data.SKILL_NAME[i];

        let skillObject = {
            label: skillName,
            value: skillName
        };
        resultArray.push(skillObject);
    }


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
        { value: "IOS", name: "IOS안드로이드" },
        { value: "안드로이드", name: "안드로이드" },
        { value: "데브옵스", name: "데브옵스" },
        { value: "PM", name: "PM" },
        { value: "기획자", name: "기획자" }
    ]

    // 선택한 포지션 
    const [pselected, setPselected] = useState({ value: position, name: position });


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

    // 선택한 경력
    const [cselected, setCselected] = useState({ value: career, name: career })


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

    // 선택한 관심스택 
    const [selected, setSelected] = useState(resultArray);

    // 관심스택 최대 개수 제한 
    const handleSelectionChange = (selectedItems) => {
        console.log(selected);
        if (selectedItems.length <= 4) {
            setSelected(selectedItems);
        }
    };


    //프로필사진 변경 
    const [Image, setImage] = useState(photoData);

    //프로필사진 파일 
    const [file, setFile] = useState(null);

    const onChange = (e) => {

        if (e.target.files[0]) {
            setFile(e.target.files[0])
        } else { //업로드 취소할 시

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

    const handleSubmit = () => {

        const formData = new FormData();
        formData.append('cust_id', 'ekdud0225');
        formData.append('cust_nick', modalNick);
        formData.append('cust_position', pselected.value);
        formData.append('cust_career', cselected.value);
        formData.append('cust_img1', file);
        formData.append('cust_git', modalGit);

        axios.put('http://localhost:8099/userinfoupdate', formData, {
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


    return (
        <div>

            {/* 마이페이지 나의 프로필 정보  */}
            <div className='user-container'>

                {/* 편집버튼 */}
                {userId === 'ekdud0225' && (
                    <img src={editBtn} className='user-eidt-button ' onClick={(e) => { setModalOpen(true) }} />
                )}



                {/* 나의 프로필정보 */}
                <div className='user-img-container'>
                    <img src={"data:image/;base64," + photo} alt='이미지 출력되지 않았음' className='user-img' />
                </div>
                <div className='user-nickname'>{nick}</div>
                <div>
                    <table className='user-table'>
                        <tr>
                            <td className='user-table-name'>직무</td>
                            <td className='user-table-content'>{position}</td>
                        </tr>
                        <tr>
                            <td className='user-table-name'>경력</td>
                            <td className='user-table-content'>{career}</td>
                        </tr>
                        <tr>
                            <td className='user-table-name'>관심스택</td>
                            <td className='user-table-content'>{skillNames}</td>
                        </tr>
                        <tr>
                            <td className='user-table-name'>링크</td>
                            <td className='user-table-content'><a href={git} target="_blank"><img src={GitHub}></img></a></td>
                        </tr>
                    </table>
                </div>
            </div >  {/* 마이페이지 나의 프로필 정보 끝  */}



            {/* 편집 클릭시 회원정보수정 모달 창 오픈  */}
            {modalOpen && (
                <div className='modal-user-back'>
                    <div className='modal-user-container'>

                        {/* 모달 닫기 부분  */}
                        <div className='modal-user-close'>
                            <img className='modal-user-img' src={Logo}></img>
                            <img src={X} onClick={(e) => { setModalOpen(false); }} className="modal-user-close-button"></img>
                        </div>

                        {/* 모달 프로필사진 수정 */}
                        <div>
                            <div className='user-img-container'>
                                <img src={Image} alt='이미지 출력되지 않았음' className='user-img' />
                                {/* <img src={"data:image/;base64," + Image} alt='이미지 출력되지 않았음' className='user-img' />                */}
                            </div>

                            <label for="file-input">
                                <img src={plus} alt="파일 선택" className='plus-img' />
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
                                <table className='modal-user-table'>

                                    {/* 닉네임 변경 */}
                                    <tr>
                                        <td className='user-modal-name'>닉네임</td>
                                        <td><input className='user-modal-content' type="text" value={modalNick} onChange={(e) => { SetModalNick(e.target.value) }} /></td>
                                    </tr>

                                    {/* 직무 변경 */}
                                    <tr>
                                        <td className='user-modal-name'>직무</td>
                                        <td>
                                            <select
                                                className='user-modal-content'
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
                                        <td className='user-modal-name'>경력</td>
                                        <td>
                                            <select
                                                className='user-modal-content'
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
                                        <td className='user-modal-name'>관심스택</td>
                                        <td>
                                            <MultiSelect
                                                options={skills}
                                                value={selected}
                                                onChange={handleSelectionChange}
                                                labelledBy={"Select"}
                                                isCreatable={true}
                                                maxSelected={3}
                                                className='multi-select'

                                            />
                                        </td>
                                    </tr>

                                    {/* Git 주소 변경 */}
                                    <tr>
                                        <td className='user-modal-name'>GitHub</td>
                                        <td><input className='user-modal-content' type="text" value={modalGit} onChange={(e) => { SetModalGit(e.target.value) }} /></td>
                                    </tr>

                                </table>
                                <div>
                                    <button className="modal_add_Button" type="submit" onClick={handleSubmit}>저장</button>
                                    <button className="modal_delete_Button" type="submit" onClick={openDeletePopup}> 회원탈퇴 </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
            } {/* 회원정보수정 모달 창 끝  */}



            {/* 회원탈퇴 모달창  */}
            {deleteModalOpen && (
                <div className='modal-user-back'>
                    <div className='modal-user-container'>
                        {/* 모달 닫기 부분  */}
                        <div className='modal-user-close'>
                            <img className='modal-user-img' src={Logo}></img>
                            <img src={X} onClick={closeDeletePopup} className="modal-user-close-button"></img>
                        </div>
                        <div className='modal-delete-text'>
                            {nick}님 정말 탈퇴하시겠어요?
                        </div>
                        <div className='modal-delete-content'>
                            탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
                        </div>
                        <button className="modal_delete" type="submit" onClick={closeDeletePopup}> 탈퇴 </button>
                        <button className="modal_delete_Cancle" type="submit" onClick={closeDeletePopup}> 취소 </button>
                    </div>
                </div>)}  {/* 회원탈퇴 모달 창 끝  */}
        </div >
    )
}


export default User