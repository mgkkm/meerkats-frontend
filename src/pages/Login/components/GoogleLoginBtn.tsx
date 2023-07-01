import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import { DecodeToken } from '../../../components/DecodeToken/DecodeToken';
import { useSetRecoilState } from 'recoil';
import {
  currentUserIdState,
  currentUserNicknameState,
} from '../../../recoil/JwtDecode';
import { infoAlert } from '../../../components/Alert/Modal';

type dataType = {
  accessToken: string;
  userNickname: string;
};

export default function GoogleLoginBtn() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const navigate = useNavigate();
  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const loginBtnOnClick = useGoogleLogin({
    onSuccess: async (response: { access_token: string }) => {
      const accessToken = response.access_token;
      fetchData({
        url: `${BASE_URL}/users/google-login`,
        method: 'POST',
        headers: {
          authorization: accessToken,
        },
      }).then((res: dataType) => {
        sessionStorage.setItem('token', res.accessToken);
        DecodeToken(setCurrentId, setCurrentNickname);
        infoAlert('로그인 성공', '환영합니다 :)');
        navigate('/');
      });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <button onClick={() => loginBtnOnClick()}>
      <div className="socialLoginBtn bg-white">
        <img
          src="/images/login/logo_google.png"
          alt="google_logo"
          className="socialLogo w-2/5 m-auto -translate-x-2/4 -translate-y-2/4"
        />
      </div>
    </button>
  );
}
