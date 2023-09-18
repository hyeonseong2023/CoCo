import '../../css/Board.css';
import userImg from '../img/profilePicture.png';
import closePopup from '../img/x.png';


const ProfileModal = ({setModalOpen}) => {

    const close = () => {
        setModalOpen(false);
      }

  return (

        <div className='modal-user-back'>
            <div className='modal-user-container'>

                {/* 모달 닫기 부분  */}
                <div>
                     <img src={closePopup} onClick={close} alt='창 닫기' className='closePopup' onc></img>
                </div>

                {/* 모달 프로필사진 */}
                <div>
                    <div>
                        <div className='user-img-container'><img src={userImg} alt='이미지 출력되지 않았음' className='user-img'></img></div>
                    </div>

                        <div>
                            <h2>amber</h2>
                            <button className="modal_add_Button" type="submit"> 작업물 보기</button>
                        </div>

                </div>
            </div>
        </div>
    )
 }
 

export default ProfileModal