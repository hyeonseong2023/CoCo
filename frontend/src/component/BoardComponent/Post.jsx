import React, { useState, useEffect } from 'react'
import '../../css/Board.css';
import Table from './Table';
import Toast from './Toast';
import ProfileModal from './ProfileModal';
import bookmark from '../img/bookmark.png';
import blueBookmark from '../img/blueBookmark.png';
import applyButton from '../img/applyButton.png';
import deadline from '../img/deadline.png';
import notApply from '../img/notApply.png';
import profileImg from '../img/profilePicture.png';
import viewsIcon from '../img/viewsIcon.png';



const Post = ({data}) => {

    
    const [isEmptyBmk, setIsEmptyBmk] = useState(true);
    const [isApply, setIsApply] = useState(true);
    const [bmkImgClicked, setBmkImgClicked] = useState(false);
    const [madalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [views, setViews] = useState("");
    const [date, setDate] = useState("");
    const [dDay, setDday] = useState("");
    const [content, setContent] = useState("");
    const [boardImg, setBoardImg] = useState("");
    const [custNick, setCustNick] = useState("");
    const [custImg, setCustImg] =useState("");



    const fetchData = async() => {
        await console.log("post",data);
        setTitle(data.TB_BOARD.board_title);
        setViews(data.TB_BOARD.board_views);
        setDate(data.TB_BOARD.board_dt);
        setDday(data.D_day);
        setContent(data.TB_BOARD.board_content)
        setBoardImg(data.TB_BOARD_IMG.board_IMG)
        setCustNick(data.createCust.cust_NICK);
        setCustImg(data.createCust.cust_IMG);
    }

    useEffect(()=>{
        fetchData()
    }, [])



    const toggleImage = ()=>{
        setIsEmptyBmk(!isEmptyBmk);
        setBmkImgClicked(true);
    }

    const toggleApply = ()=>{
        setIsApply(!isApply);
    }

    const openPopup = ()=>{
        setModalOpen(true);
    }


  return (
    <div className='post'>

        {madalOpen && <ProfileModal setModalOpen={setModalOpen}></ProfileModal>}
        {/* 게시글 제목 부분 */}
        <div className='postTitle'>
            {/* 북마크 이미지 클릭시 토스트 생성 */}
        {bmkImgClicked && <Toast setBmkImgClicked={setBmkImgClicked} isEmptyBmk={isEmptyBmk} />}

            {/* 상단 모집기간 남은일수 */}
            <div className="image-container">
                <img src={deadline} alt="deadLine" width={80} />
                <p className="text-on-image">{dDay}일 남음</p>
            </div>


            <div className='leftRight'>
                <div className='left'>
                    <p className='titleText'>{title}</p>

                    {/* 게시글 작성자 프로필사진, 닉네임 */}
                    <div className='profileContainer'>
                    <div className="profileImg-container">
                       {/* boardImg !== undefined ? profileImg :"data:image/;base64,"+boardImg */}
                        <img onClick={openPopup} src={custImg? "data:image/;base64,"+ custImg : profileImg } alt="profileImg"/>
                    </div>
                    <p onClick={openPopup}>{custNick}</p>
                    </div>

                </div>
                <div className='right'>

                    {/* 지원하기 버튼, 북마크 */}
                     {/* style={{display: loginId === postUserId ? "none" : "block"}} */}
                    <div className='rightTop'>
                        <img className='bmkImg' src={isEmptyBmk ? bookmark : blueBookmark} onClick={toggleImage}  alt="bmkImg"/>
                        <img className='applybtn' src={isApply? applyButton : notApply} onClick={toggleApply} alt="applyButton"/>
                    </div>


                    {/* 게시글 조회수, 조회수아이콘, 게시글 작성 날짜 */}
                    <div className='rightBottom'>
                        <span>{date}</span>
                        <p className='views'>{views}</p>
                        <img className='viewsIcon' src={viewsIcon} alt="viewsIcon"/>
                    </div>

                </div>
            </div>
            <hr></hr>
        </div>


        {/* 게시글 중간 모집상세내용 부분 */}
        <div className='postInfo'>
            {data&&<Table data={data}></Table>}

        </div>

        {/* 게시글 프로젝트 소개 부분 */}
        <div className='postContents'>
            <h2>프로젝트 소개</h2>
            <hr></hr>
            <br></br>
            <p>{content}!</p>   
            <div className='boardImgContainer'>
                
            <img src={boardImg && "data:image/;base64,"+boardImg} className='boardImg'></img>
            </div>          
        </div>
    </div>
  )
}

export default Post