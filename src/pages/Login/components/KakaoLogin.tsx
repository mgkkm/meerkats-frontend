import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentUserIdState,
  currentUserNicknameState,
} from '../../../recoil/JwtDecode';
import { TokenState } from '../../../recoil/TokenState';
import useAxios from '../../../hooks/useAxios';
import { REST_API_KEY, REDIRECT_URI, KAKAO_TOKEN_URL } from './KakaoConfig';

interface DecodedToken {
  id: number;
  nickname: string;
}

type ResType = {
  accessToken: string;
  userNickname: string;
};

export default function KakaoLogin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const [loading, error, data, fetchData] = useAxios();
  const [currentId, setCurrentId] = useRecoilState(currentUserIdState);
  const [currentNickname, setCurrentNickname] = useRecoilState(
    currentUserNicknameState
  );
  const setTokenState = useSetRecoilState(TokenState);

  // console.log(currentId); // 기본값만 나옴. setter 함수에 안담기는 것 같음
  // console.log(currentNickname); // 기본값만 나옴. setter 함수에 안담기는 것 같음

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
    }).then(async (res: { access_token: string }) => {
      // 액세스토큰을 서버에 post 로 넘겨주는 통신
      await fetchData({
        url: `${BASE_URL}/users/kakao-login`,
        method: 'POST',
        headers: { Authorization: res.access_token },
      }).then((res: ResType) => {
        const token = res.accessToken;
        if (token === null) {
          setCurrentId(0);
        }
        if (token) {
          const decodedToken: DecodedToken = jwt_decode(token);
          console.log('decodedToken =>', decodedToken);
          setCurrentId(decodedToken?.id);
          setCurrentNickname(decodedToken?.nickname);
        }
        localStorage.setItem('token', res.accessToken);
        const tokenState = localStorage.getItem('token');
        tokenState && setTokenState(tokenState);
        navigate('/');
      });
    });
  }, []);

  return (
    <div className="mt-24 pt-24 text-2xl text-center">
      <p>로그인 확인 중입니다 :)</p>
      <p>{currentId}</p>
    </div>
  );
}
