import axios from 'axios';
import { REST_API_KEY, REDIRECT_URI, KAKAO_TOKEN_URL } from './KakaoConfig';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];

  useEffect(() => {
    axios
      .post(
        KAKAO_TOKEN_URL,
        {
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: KAKAO_CODE,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then(async res => {
        // 액세스토큰을 서버에 post 로 넘겨주는 통신
        const result = await axios.post(
          'http://172.20.10.5:3000/users/kakao-login',
          {},
          {
            headers: {
              Authorization: res.data.access_token,
            },
          }
        );
        console.log(result);
        localStorage.setItem('token', result.data.accessToken);
        navigate('/');
      })
      .catch(err => console.log(err));
  });

  return (
    <div className="mt-24 pt-24 text-2xl text-center">
      <p>로그인 확인 중입니다 :)</p>
    </div>
  );
}
