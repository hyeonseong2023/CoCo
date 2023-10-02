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
import deadlineBtn from '../../img/deadlineBtn.png';
import projectDeadlineImg from '../../img/projectDeadlineImg.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeadlineModal from './DedlineModal';
import Write from '../Write';
import DeleteModal from './DeleteModal';
import {
  addNotification,
  cancelNotification,
} from '../Project/functions/firebaseCRUD';

const Post = ({ data, boardData }) => {
  console.log(boardData);
  const isBookmarked = boardData.TB_BOOKMARK > 0 ? true : false;
  const applyCheck = boardData.TB_APPLY > 0 ? true : false;
  const [isEmptyBmk, setIsEmptyBmk] = useState(isBookmarked);
  const [isApply, setIsApply] = useState(applyCheck);
  const [bmkImgClicked, setBmkImgClicked] = useState(false);
  const [madalOpen, setModalOpen] = useState(false);
  const [dPopupOpne, setDPopupOpne] = useState(false);
  const [postDeletePopup, setPostDeletePopup] = useState(false);
  const [title, setTitle] = useState(boardData.TB_BOARD.board_title);
  const [views, setViews] = useState(boardData.TB_BOARD.board_views);
  const [date, setDate] = useState(boardData.TB_BOARD.board_dt);
  const [dDay, setDday] = useState(boardData.D_day - 1);
  const [content, setContent] = useState(boardData.TB_BOARD.board_content);
  const [boardImg, setBoardImg] = useState(boardData.TB_BOARD_IMG?.board_IMG);
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
        board_id: data,
      });
    } catch (error) {
      console.error('Error sending bookmark request: ', error);
    }
  };

  const sendApplyRequest = async (isApply) => {
    const apiUrl = !isApply
      ? `${process.env.REACT_APP_URL_8099}/postApply`
      : `${process.env.REACT_APP_URL_8099}/unPostApply`;

    await axios
      .get(`${apiUrl}/${data}/${Cookies.get('CUST_ID')}`)
      .then((res) => {});
  };

  const toggleBmk = () => {
    sendBookmarkRequest(isEmptyBmk);
    setIsEmptyBmk(!isEmptyBmk);
    setBmkImgClicked(true);
  };

  const toggleApply = () => {
    sendApplyRequest(isApply);
    setIsApply(!isApply);
    let nowDate = new Date();
    const data = {
      sender: loginUserId,
      receiver: boardCreateId,
      board_id: boardData.TB_BOARD.board_id,
      contents: `님 께서 '${title}'게시글에 지원하였습니다.`,
      date: nowDate.toLocaleString(),
      checked: false,
    };
    if (!isApply) {
      addNotification(`notification/${boardCreateId.split('.')[0]}`, data);
    } else {
      cancelNotification(
        `notification/${boardCreateId.split('.')[0]}`,
        data.board_id
      );
    }
  };

  const openPopup = () => {
    setModalOpen(true);
  };

  const dedlinePopup = () => {
    setDPopupOpne(true);
  };

  const postDeleteClick = () => {
    setPostDeletePopup(true);
  };

  return (
    <div className="post">
      {/* 게시글 삭제버튼 클릭시 열리는 모달 */}
      {postDeletePopup && (
        <DeleteModal
          setPostDeletePopup={setPostDeletePopup}
          data={data}
        ></DeleteModal>
      )}

      {/* 모집마감 버튼 클릭시 열리는 모달 */}
      {dPopupOpne && (
        <DeadlineModal
          setDPopupOpne={setDPopupOpne}
          boardData={boardData}
          data={data}
        ></DeadlineModal>
      )}
      {/* 게시글 작성자 프로필 클릭시 열리는 모달 */}
      {madalOpen && (
        <ProfileModal
          madalOpen={madalOpen}
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
            {/* 모집마감 버튼 클릭하면 생기는 이미지*/}
            {/* style={{display: loginId === postUserId ? "none" : "block"}} */}
            <div className="rightTop">
              <img
                alt=""
                className="projectDeadlineImg"
                src={projectDeadlineImg}
                style={{
                  display: dDay == 0 ? 'block' : 'none',
                }}
              />
              {/* 게시글 삭제 버튼 */}
              <img
                onClick={postDeleteClick}
                alt=""
                className="deleteBtn"
                src={deleteBtn}
                style={{
                  display:
                    boardCreateId === loginUserId && dDay != 0
                      ? 'block'
                      : 'none',
                  // display: boardCreateId === loginUserId ? 'block' : 'none',
                }}
              />
              {/* 게시글 수정 버튼 */}
              <Link to="/Write" state={boardData}>
                <img
                  alt=""
                  className="modifyBtn"
                  src={modifyBtn}
                  style={{
                    display:
                      boardCreateId === loginUserId && dDay != 0
                        ? 'block'
                        : 'none',
                    // display: boardCreateId === loginUserId ? 'block' : 'none',
                  }}
                />
              </Link>
              {/* 게시글 모집마감 버튼 */}
              <img
                onClick={dedlinePopup}
                alt=""
                className="deadlineBtn"
                src={deadlineBtn}
                style={{
                  display:
                    boardCreateId === loginUserId && dDay != 0
                      ? 'block'
                      : 'none',
                  // display: boardCreateId === loginUserId ? 'block' : 'none',
                }}
              />
              {/* 북마크 버튼 */}
              <img
                className="bmkImg"
                src={isEmptyBmk ? blueBookmark : bookmark}
                onClick={toggleBmk}
                style={{
                  display:
                    loginUserId && boardCreateId !== loginUserId && dDay != 0
                      ? 'block'
                      : 'none',
                }}
                alt="bmkImg"
              />
              {/* 지원하기 버튼 */}
              <img
                className="applybtn"
                src={isApply ? notApply : applyButton}
                onClick={toggleApply}
                style={{
                  display:
                    loginUserId && boardCreateId !== loginUserId && dDay != 0
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
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
