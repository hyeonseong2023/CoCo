import { useEffect, useState } from 'react';
import axios from 'axios';
import PdfViewer from './PdfViewer';

import '../../css/Portfolio.css';
import '../../css/User.css';

import X from '../../img/x.png';
import Logo from '../../img/Logo.png';
import addBtn from '../../img/addBtn.png';
import fileSelect from '../../img/FileSelect.png';
import hamburger from '../../img/hamburger.png';
import Cookies from 'js-cookie';
import Login from '../Login';

const Portfolio = ({ data, anotherId }) => {
  const custId = data.CUST_ID; // 마이페이지 아이디
  const loginUserId = Cookies.get('CUST_ID'); // 로그인한 아이디

  //포트폴리오 데이터 Map으로 돌리기
  const portfolioData = data.PF_TABLE.map((item) => ({
    id: item.PF_ID, //파일 아이디
    pdfSrc: item.PF_PATH, //파일경로
    text: item.PF_TITLE, //파일이름
  }));

  useEffect(() => { }, [portfolioData]);

  const [addModalOpen, setAddModalOpen] = useState(false); // 포트폴리오 추가버튼 모달창 노출 여부
  const [nameModalOpen, setNameModalOpen] = useState(false); // 포트폴리오명 수정버튼 노출 여부
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // 포트폴리오 삭제버튼 노출 여부

  const [file, setFile] = useState(); //프토폴리오 파일
  const [pdfTitle, setPdfTitle] = useState(); //포트폴리오 제목
  const [portName, setPortName] = useState(); // 포트폴리오 제목 수정
  const [pdfName, setPdfName] = useState(); //포트폴리오명 PDF 파일명
  const [menuOpenIndex, setMenuOpenIndex] = useState(null); // 현재 열린 메뉴의 인덱스
  const [portIndex, setPortIndex] = useState(); // 포트폴리오 인덱스

  // 햄버거 버튼 클릭 시 해당 포트폴리오 메뉴 오픈
  const toggleMenu = (index) => {
    if (menuOpenIndex === index) {
      setMenuOpenIndex(null);
    } else {
      setMenuOpenIndex(index);
    }
  };

  // 추가버튼 모달창 열기
  const openAddModal = () => {
    setFile('');
    setAddModalOpen(true);
  };

  // 추가버튼 모달창 닫기
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // 포트폴리오명 수정 버튼 클릭 시
  const openNameModal = (text, index) => {
    setPortName(text);
    setPortIndex(index);
    setNameModalOpen(true);
  };

  // 포트폴리오명 수정 모달 닫기
  const closeNameModal = () => {
    setNameModalOpen(false);
  };

  // 포트폴리오 삭제 버튼 클릭시
  const openDeleteModal = (text, index) => {
    setPortName(text);
    setPortIndex(index);
    setDeleteModalOpen(true);
  };

  // 포트폴리오 삭제 모달 닫기
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // 포트폴리오 PDF 파일 이름 가져오기
  const onChange = (e) => {
    setPdfName(e.target.files[0].name);

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setFile('');
      //return
    }
  };

  // 통신 (포트폴리오 추가)
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('cust_id', custId);
    formData.append('pf_title', pdfTitle);
    formData.append('file', file);

    await axios
      .post(`${process.env.REACT_APP_URL_8099}/pfadd`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('요청이 성공했습니다.', response.data);
      })
      .catch((error) => {
        console.error('요청이 실패했습니다.', error);
      });
  };

  // 통신 (포트폴리오명 변경)
  const handleName = async () => {
    const requestData = {
      cust_id: custId,
      pf_id: portIndex,
      pf_title: portName,
    };

    try {
      await axios.put(`${process.env.REACT_APP_URL_8099}/pftitle`, requestData);
      console.log('요청이 성공했습니다.');
    } catch (error) {
      console.error('요청이 실패했습니다.', error);
    }
  };

  // 통신(포트폴리오 삭제)
  const handleDelete = async () => {
    const requestData = {
      pf_id: portIndex,
    };

    try {
      await axios.delete(`${process.env.REACT_APP_URL_8099}/pfdelete`, {
        data: requestData,
      });
      console.log('요청이 성공했습니다.');
      window.location.replace('/mypage');
    } catch (error) {
      console.error('요청이 실패했습니다.', error);
    }
  };

  return (
    <div>
      <div className="add-content">
        {/* 포트폴리오 추가 버튼  */}
        {!anotherId && (
          <img
            src={addBtn}
            alt="PDF 선택"
            className="port-add-button"
            onClick={openAddModal}
          />
        )}
        {anotherId && <div className="port-add-button"></div>}
      </div>
      {portfolioData.length == 0 && custId === loginUserId && (
        <div className="nullText"> 포트폴리오를 추가해주세요 </div>
      )}
      {/* 포트폴리오 보여주는 곳 */}
      <div className="port-map-container">
        {portfolioData.map((item, index) => (
          <div>
            <div key={item.idex}>
              <PdfViewer pdfFile={item.pdfSrc} />
              <div className="port-text">
                <div>
                  {' '}
                  <p>{item.text}</p>
                </div>
                {custId === loginUserId && (
                  <div className="item-btn">
                    <img
                      src={hamburger}
                      onClick={() => {
                        toggleMenu(index);
                      }}
                    ></img>{' '}
                  </div>
                )}
                {/* toggleMenu  포트폴리오 한개 당 햄버거 버튼 (제목수정, 삭제)  */}
                {!anotherId && menuOpenIndex === index && (
                  <ui className="menu-container">
                    <li onClick={() => openNameModal(item.text, item.id)}>
                      수정
                    </li>
                    <li onClick={() => openDeleteModal(item.text, item.id)}>
                      삭제
                    </li>
                  </ui>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 포트폴리오 파일 추가 모달 창  */}
      {addModalOpen && (
        <div className="port-modal-user-back">
          <div className="port-modal-user-container">
            {/* 모달 닫기 부분  */}
            <div className="modal-user-close">
              <img className="port-modal-user-img" src={Logo}></img>
              <img
                src={X}
                onClick={closeAddModal}
                className="port-modal-user-close-button"
              ></img>
            </div>

            <div>
              <form>
                <table className="modal-port-table">
                  {/* 포트폴리오명 */}
                  <tr>
                    <td className="port-modal-name">포트폴리오명</td>
                    <td>
                      <input
                        className="port-modal-content"
                        type="text"
                        value={pdfTitle}
                        onChange={(e) => {
                          setPdfTitle(e.target.value);
                        }}
                      />{' '}
                    </td>
                  </tr>
                  <tr>
                    <td className="port-modal-name">첨부파일</td>
                    <td>
                      {' '}
                      <input
                        className="port-modal-content"
                        type="text"
                        value={pdfName}
                      />{' '}
                    </td>

                    {/* PDF 파일 추가  */}
                    <label htmlFor="file-input">
                      <img src={fileSelect} className="File-Select"></img>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept=".pdf"
                      name="pdf_file"
                      className="pdf-input"
                      onChange={onChange}
                    />
                  </tr>
                </table>
                <div>
                  <button
                    className="modal_add_Btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}{' '}
      {/* 모달 창 끝  */}
      {/* 포트폴리오 이름변경 모달 창  */}
      {nameModalOpen && (
        <div className="port-modal-user-back">
          <div className="port-modal-user-container">
            {/* 모달 닫기 부분  */}
            <div className="modal-user-close">
              <img className="port-modal-user-img" src={Logo}></img>
              <img
                src={X}
                onClick={closeNameModal}
                className="port-modal-user-close-button"
              ></img>
            </div>

            <div>
              <form>
                <table className="modal-modify-port-table">
                  {/* 포트폴리오명 */}
                  <tr>
                    <td className="port-modal-name">포트폴리오명</td>
                    <td>
                      <input
                        className="port-modal-content"
                        type="text"
                        value={portName}
                        onChange={(e) => setPortName(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>

                <div>
                  <button
                    className="modal_add_Btn"
                    type="submit"
                    onClick={handleName}
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* 포트폴리오 삭제 모달창  */}
      {deleteModalOpen && (
        <div className="port-modal-user-back">
          <div className="port-modal-user-container">
            {/* 모달 닫기 부분  */}
            <div className="modal-user-close">
              <img className="port-modal-user-img" src={Logo}></img>
              <img
                src={X}
                onClick={closeDeleteModal}
                className="port-modal-user-close-button"
              ></img>
            </div>
            <div className="delete-text">
              "{portName}" 파일을 정말 삭제 하시겠습니까?
            </div>
            <div>
              <button
                className="modal_add_Btn"
                type="submit"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
