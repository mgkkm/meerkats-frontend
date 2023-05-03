import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { currentUserState } from '../../../recoil/JwtDecode';
import { useRecoilState } from 'recoil';
import jwt_decode from 'jwt-decode';
import { REST_API_KEY, REDIRECT_URI, KAKAO_TOKEN_URL } from './KakaoConfig';

import useAxios from '../../../hooks/useAxios';

interface DecodedToken {
  id: number;
}

export default function KakaoLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const [currentId, setCurrentId] = useRecoilState(currentUserState);
  // currentId: 10

  const [loading, error, data, fetchData] = useAxios();

  useEffect(() => {
    fetchData({
      url: KAKAO_TOKEN_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: {
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: KAKAO_CODE,
      },
    })
      .then(async (res: any) => {
        console.log(res.access_token);
        // 액세스토큰을 서버에 post 로 넘겨주는 통신
        const result = await fetchData({
          url: 'https://www.meerkats.monster/users/kakao-login',
          method: 'POST',
          headers: { Authorization: res.access_token },
          data: {},
        }).then((res: any) => {
          const token = res.accessToken;
          if (token === null) {
            setCurrentId(0);
          } else {
            const decodedToken: DecodedToken = jwt_decode(token);
            setCurrentId(decodedToken.id);
          }
          localStorage.setItem('token', res.accessToken);
          navigate('/');
        });
      })
      .catch((err: string) => console.log(err));
  }, []);

  return (
    <div className="mt-24 pt-24 text-2xl text-center">
      <p>로그인 확인 중입니다 :)</p>
    </div>
  );
}
