import React from 'react';
import axios from 'axios';

const DeleteModal = ({ setPostDeletePopup, data }) => {
  const postDelete = async () => {
    await axios.get(`http://localhost:8099/postdelete/${data}`).then((res) => {
      window.location.replace(`http://localhost:3000`);
      setPostDeletePopup(false);
    });
  };

  const close = () => {
    setPostDeletePopup(false);
  };

  return (
    <div className="modal-user-back">
      <div className="modal-delete-container">
        <p className="modal-delete-text">게시글을 삭제 하시겠습니까?</p>

        <button
          className="modal_deadline_Button"
          type="submit"
          onClick={postDelete}
        >
          {' '}
          삭제하기
        </button>
        <button className="modal_cancell_Button" type="submit" onClick={close}>
          {' '}
          취소하기
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
