import '../../css/Board.css';
import axios from 'axios';

function DeadlineModal({ setDPopupOpne, boardData, data }) {
  const postDeadline = async () => {
    await axios
      .get(
        `http://localhost:8099/postdeadline/${data.id}/${boardData.TB_BOARD.board_deadline}`
      )
      .then((res) => {
        window.location.replace(
          `http://localhost:3000/selectpostviews/${data.id}`
        );
        setDPopupOpne(false);
      });
  };

  const close = () => {
    setDPopupOpne(false);
  };

  return (
    <div className="modal-user-back">
      <div className="modal-cancell-container">
        <p className="modal-deadline-text">
          모집마감 이후 취소가 불가능 합니다.
        </p>
        <p>마감 하시겠습니까?</p>

        <button
          className="modal_deadline_Button"
          type="submit"
          onClick={postDeadline}
        >
          {' '}
          마감하기
        </button>
        <button className="modal_cancell_Button" type="submit" onClick={close}>
          {' '}
          취소하기
        </button>
      </div>
    </div>
  );
}

export default DeadlineModal;
