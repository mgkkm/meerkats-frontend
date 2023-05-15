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
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();
  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const loginBtnOnClick = useGoogleLogin({
    onSuccess: async (response: { access_token: string }) => {
      const accessToken = response.access_token;
      fetchData({
        url: 'http://172.20.10.5:3000/users/google-login',
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
      <div className="relative inline-block w-16 h-16 text-center bg-white rounded-full">
        <img
          src="/images/login/logo_google.png"
          alt="google_logo"
          className="absolute left-2/4 top-2/4 w-2/5 m-auto -translate-x-2/4 -translate-y-2/4"
        />
      </div>
    </button>
  );
}
