import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import cookies from 'react-cookies'


const KakaoCallback = () => {

    // useSearchParams() : URL의 쿼리파라미터에 대한 접근과 조작을 할 수 있음 
    const [searchParams, setSearchParmas] = useSearchParams()

    // Callback 화면 URL에서 code값 가져오기 
    const code = searchParams.get('code')

    // useNavigate() : 페이지 이동 
    const navigator = useNavigate();

    // Spring으로 code값 넘겨주기 
    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8099/kakaologin?code=${code}`);
            console.log(res.data);
            console.log(res.data.CUST_ID);
            console.log(res.data.CUST_IMG);

            //쿠키 저장 
            cookies.save('CUST_ID', res.data.CUST_ID);
            cookies.save('CUST_IMG', res.data.CUST_IMG);

            if (res.data.CUST_IMG == "0") { //회원가입 
                navigator('/join');
            } else { //로그인 
                navigator('/');
            }

        } catch (error) {
            console.error(error);
        }
    }

    //useEffect( ()=>{}) : 화면이 렌더링이 될 때마다 매번 실행 
    //useEffect( ()=>{},[]) : []안에 들어간 값이 변경될 때마다 실행 
    useEffect(() => {
        fetchData();
    }, [code, navigator]);


    return (
        <div>KakaoCallback</div>
    )
}

export default KakaoCallback