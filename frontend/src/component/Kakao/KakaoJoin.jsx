import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';


export const KakaoJoin = () => {

  //useCookies 사용하여 쿠키에 저장된 값 가져오기 
  const [cookies] = useCookies(['CUST_ID']);
  const CUST_ID = cookies.CUST_ID;

  //useState 사용하여 초기값 설정 
  const [formData, setFormDate] = useState({
    CUST_ID: '',
    CUST_ROLE: '백엔드',
    CUST_CAREER: '1년',
    SKILL_NAME: 'JavaScript'
  });


  //onChange에 함수 사용하여 formData 값 변경하기   
  const handleChange = (e) => {
    //이벤트 객체로부터 입력 필드의 name과 value를 추출 
    const { name, value } = e.target;
    setFormDate({
      // 이전의 폼 데이터를 복사한 후, 새로운 값을 포함 
      ...formData,

      [name]: value
    })
  }


  //제출 버튼 클릭 시 기본정보 Back으로 전송 
  const handleSubmit = (e) => {
    //axios post(url, 보낼데이터) 
    axios.post(`${process.env.REACT_APP_URL_8099}/firstlogin`, { ...formData, CUST_ID: CUST_ID })
      .then((res) => {
        console.log('넘어온 값 : ' + res);
      })
      .catch((error) => {
        console.error('오류', error);
      });
  };

  return (
    <div>회원가입 페이지

      <form onSubmit={handleSubmit}>
        <tr>
          <td>닉네임</td>
          <td><input type="text" name="CUST_NICK" onChange={handleChange}></input></td>
        </tr>
        <tr>
          <td>직무</td>
          <td>
            <select name="CUST_ROLE" onChange={handleChange}>
              <option value="백엔드">백엔드</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="디자이너">디자이너</option>
              <option value="IOS">IOS</option>
              <option value="안드로이드">안드로이드</option>
              <option value="데브옵스">데브옵스</option>
              <option value="PM<">PM</option>
              <option value="기획자">기획자</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>경력</td>
          <td>
            <select name="CUST_CAREER" onChange={handleChange}>
              <option value="1년">1년</option>
              <option value="2년">2년</option>
              <option value="3년">3년</option>
              <option value="4년">4년</option>
              <option value="5년">5년</option>
              <option value="6년">6년</option>
              <option value="7년">7년</option>
              <option value="8년">8년</option>
              <option value="9년">9년</option>
              <option value="10년">10년 이상</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>관심스택</td>
          <td>
            <select name="SKILL_NAME" onChange={handleChange}>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="React">React</option>
              <option value="Spring">Spring</option>
              <option value="C">C</option>
            </select>
          </td>
        </tr>
        <tr>
          <input type="submit" value="제출" ></input>
        </tr>
      </form>
    </div>

  )
}
export default KakaoJoin