import { useEffect } from 'react';
import {useCookies} from 'react-cookie' ;

const KakaoLogin = () => {

    const clientId = process.env.REACT_APP_CLIENT_ID
    const redirecturl = process.env.REACT_APP_REDIRECT_URL
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirecturl}&response_type=code`
    
  
  const [cookies] = useCookies(['email']);
  const email = cookies.email; 
  
  



  return (
    <div>
        <h>메인 페이지</h>
        <a href={URL}><button>카카오 로그인</button></a>
    </div>
  )

}

export default KakaoLogin