import React, { useEffect, useState } from 'react'
import '../../css/Board.css';
import linkIcon from '../img/linkIcon.png';

const Table = ({data}) => {

    const spring = '/skillImg/spring.svg';
    const java = '/skillImg/java.svg';
    const aws = '/skillImg/aws.svg';
    const mysql = '/skillImg/mysql.svg';

    const [member, setMember] = useState();
    const [deadLine, setDeadLine] = useState();
    const [position, setPosition] = useState();
    const [period, setPeriod] = useState("");

    
    const fetchData = async() => {
      console.log("Table",data); 
      setMember(data.TB_BOARD.board_members);
      setPeriod(data.TB_BOARD.board_period);
      setDeadLine(data.TB_BOARD.board_deadline);
      setPosition(data.TB_BOARD.board_position);
  
    }

    useEffect(()=>{
        fetchData()
    }, [])

    const linkStyle = {
      color: 'gray'
      // textDecoration: 'none',
    }
  

  return (
    <table className='table'>
      <tbody>
      <tr>
        <th  className='widthSize' >모집인원</th>
        <td>{member}</td>
        <th  className='widthSize'>시작예정</th>
        <td>{deadLine}</td>
      </tr>
      <tr>
        <th>모집분야</th>
        <td>{position}</td>
        <th>진행기간</th>
        <td>{period}</td>
      </tr>
      <tr>
        <th >필요스킬</th>
        <td className='skillImg'>
            <img src={process.env.PUBLIC_URL + spring} alt="spring"/>
            <img src={process.env.PUBLIC_URL + java} alt="java"/>
            <img src={process.env.PUBLIC_URL + aws} alt="aws"/>
            <img src={process.env.PUBLIC_URL + mysql} alt="mysql"/>
        </td>
        <th>연락방법</th>
        <td><a href='https://open.kakao.com/o/sb93t0Gf' style={linkStyle}>오픈톡</a>
        <img src={linkIcon} alt="linkIcon" className='linkIcon'/>
        </td>
      </tr>
      </tbody>
  </table>
  
  )
}

export default Table