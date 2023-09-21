import '../../css/Board.css';
import closePopup from '../../img/x.png';
import profilePicture from '../../img/profilePicture.png';
import { Link } from 'react-router-dom';
import Mypage from '../Mypage/Mypage';

const ProfileModal = ({ setModalOpen, boardData }) => {
  const userImg = boardData.createCust.cust_img;
  const userNick = boardData.createCust.cust_nick;

  const close = () => {
    setModalOpen(false);
  };

  return (
    <div className="modal-user-back">
      <div className="modal-user-container">
        {/* 모달 닫기 부분  */}
        <div>
          <img
            src={closePopup}
            onClick={close}
            alt="창 닫기"
            className="closePopup"
            onc
          ></img>
        </div>

        {/* 모달 프로필사진 */}
        <div>
          <div>
            <div className="user-img-container">
              <img
                src={userImg ? 'data:image/;base64,' + userImg : profilePicture}
                alt="이미지 출력되지 않았음"
                className="user-img"
              ></img>
            </div>
          </div>

          <div>
            <h2>{userNick}</h2>
            <Link to="/Mypage">
              <button className="modal_add_Button" type="submit">
                {' '}
                작업물 보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
