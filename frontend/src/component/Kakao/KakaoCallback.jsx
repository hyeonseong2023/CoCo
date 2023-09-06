import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import cookies from 'react-cookies'

const KakaoCallback = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code')
    const navigator = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8099/kakaologin?code=${code}`);
            console.log(res.data);
            console.log(res.data.CUST_ID);
            console.log(res.data.CUST_IMG);

            cookies.save('CUST_ID', res.data.CUST_ID);
            cookies.save('CUST_IMG', res.data.CUST_IMG);

            if (res.data.CUST_IMG === "0") { // 회원가입
                navigator('/'); // 메인 페이지로 이동
            } else { // 로그인
                navigator('/'); // 메인 페이지로 이동
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [code, navigator]);

    // 콜백 페이지에서는 사용자에게 아무 내용도 보이지 않도록 null 반환
    return null;
}

export default KakaoCallback
