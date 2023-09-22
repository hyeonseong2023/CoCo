import React, { useState, useEffect } from 'react';
import '../../css/Board.css';
import Table from './Table';
import Toast from './Toast';
import ProfileModal from './ProfileModal';
import bookmark from '../../img/bookmark.png';
import blueBookmark from '../../img/blueBookmark.png';
import applyButton from '../../img/applyButton.png';
import deadline from '../../img/deadline.png';
import notApply from '../../img/notApply.png';
import profileImg from '../../img/profilePicture.png';
import viewsIcon from '../../img/viewsIcon.png';
import deleteBtn from '../../img/deleteBtn.png';
import modifyBtn from '../../img/modifyBtn.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { async } from 'q';

const Post = ({ data, boardData }) => {
  console.log('지원하기 데이터', boardData.TB_APPLY);
  const isBookmarked = boardData.TB_BOOKMARK > 0 ? true : false;
  const applyCheck = boardData.TB_APPLY > 0 ? true : false;
  const [isEmptyBmk, setIsEmptyBmk] = useState(isBookmarked);
  const [isApply, setIsApply] = useState(applyCheck);
  const [bmkImgClicked, setBmkImgClicked] = useState(false);
  const [madalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [views, setViews] = useState(boardData.TB_BOARD.board_views);
  const [date, setDate] = useState(boardData.TB_BOARD.board_dt);
  const [dDay, setDday] = useState(boardData.D_day);
  const [content, setContent] = useState(boardData.TB_BOARD.board_content);
  const [boardImg, setBoardImg] = useState(boardData.TB_BOARD_IMG.board_IMG);
  const [custNick, setCustNick] = useState(boardData.createCust.cust_nick);
  const [custImg, setCustImg] = useState(boardData.createCust.cust_img);
  const boardCreateId = boardData.TB_BOARD.cust_id;
  const loginUserId = Cookies.get('CUST_ID');

  const sendBookmarkRequest = async (isEmptyBmk) => {
    const apiUrl = isEmptyBmk
      ? `${process.env.REACT_APP_URL_8099}/unbookmark`
      : `${process.env.REACT_APP_URL_8099}/bookmarkcheck`;

    try {
      const response = await axios.post(apiUrl, {
        cust_id: loginUserId,
        board_id: data.id,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending bookmark request: ', error);
    }
  };

  const sendApplyRequest = async (isApply) => {
    const apiUrl = !isApply
      ? `${process.env.REACT_APP_URL_8099}/postApply`
      : `${process.env.REACT_APP_URL_8099}/unPostApply`;

    await axios
      .get(`${apiUrl}/${data.id}/${Cookies.get('CUST_ID')}`)
      .then((res) => {
        console.log('지원하기:', res.data);
      });
  };

  const toggleBmk = () => {
    sendBookmarkRequest(isEmptyBmk);
    setIsEmptyBmk(!isEmptyBmk);
    setBmkImgClicked(true);
  };

  const toggleApply = () => {
    sendApplyRequest(isApply);
    setIsApply(!isApply);
  };

  const openPopup = () => {
    setModalOpen(true);
  };

  return (
    <div className="post">
      {madalOpen && (
        <ProfileModal
          setModalOpen={setModalOpen}
          boardData={boardData}
        ></ProfileModal>
      )}
      {/* 게시글 제목 부분 */}
      <div className="postTitle">
        {/* 북마크 이미지 클릭시 토스트 생성 */}
        {bmkImgClicked && (
          <Toast
            setBmkImgClicked={setBmkImgClicked}
            isEmptyBmk={isEmptyBmk}
            data={data}
          />
        )}

        {/* 상단 모집기간 남은일수 */}
        <div className="image-container">
          <img src={deadline} alt="deadLine" width={80} />
          <p className="text-on-image">{dDay}일 남음</p>
        </div>

        <div className="leftRight">
          <div className="left">
            <p className="titleText">{title}</p>

            {/* 게시글 작성자 프로필사진, 닉네임 */}
            <div className="profileContainer">
              <div className="profileImg-container">
                {/* boardImg !== undefined ? profileImg :"data:image/;base64,"+boardImg */}
                <img
                  onClick={openPopup}
                  src={custImg ? 'data:image/;base64,' + custImg : profileImg}
                  alt="profileImg"
                />
              </div>
              <p onClick={openPopup}>{custNick}</p>
            </div>
          </div>
          <div className="right">
            {/* 지원하기 버튼, 북마크 */}
            {/* style={{display: loginId === postUserId ? "none" : "block"}} */}
            <div className="rightTop">
              <img
                alt=""
                className="modifyBtn"
                src={modifyBtn}
                style={{
                  display: boardCreateId === loginUserId ? 'block' : 'none',
                }}
              />
              <img
                alt=""
                className="deleteBtn"
                src={deleteBtn}
                style={{
                  display: boardCreateId === loginUserId ? 'block' : 'none',
                }}
              />
              <img
                className="bmkImg"
                src={isEmptyBmk ? blueBookmark : bookmark}
                onClick={toggleBmk}
                style={{
                  display:
                    loginUserId && boardCreateId !== loginUserId
                      ? 'block'
                      : 'none',
                }}
                alt="bmkImg"
              />
              <img
                className="applybtn"
                src={isApply ? notApply : applyButton}
                onClick={toggleApply}
                style={{
                  display:
                    loginUserId && boardCreateId !== loginUserId
                      ? 'block'
                      : 'none',
                }}
                alt="applyButton"
              />
            </div>

            {/* 게시글 조회수, 조회수아이콘, 게시글 작성 날짜 */}
            <div className="rightBottom">
              <span>{date}</span>
              <p className="views">{views}</p>
              <img className="viewsIcon" src={viewsIcon} alt="viewsIcon" />
            </div>
          </div>
        </div>
      </div>
      <hr></hr>

      {/* 게시글 중간 모집상세내용 부분 */}
      <div className="postInfo">
        {boardData && <Table data={data} boardData={boardData}></Table>}
      </div>

      {/* 게시글 프로젝트 소개 부분 */}
      <div className="postContents">
        <h2>프로젝트 소개</h2>
        <hr></hr>
        <br></br>
        <p>{content}</p>
        <div className="boardImgContainer">
          <img
            alt=""
            src={boardImg && 'data:image/;base64,' + boardImg}
            className="boardImg"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Post;
