import { Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import KakaoLoginBtn from './components/KakaoLoginBtn';

export default function Login() {
  // google login
  const googleOauthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  return (
    <div className="container xl bg-mkBg text-mkBlack mt-24 pt-28 pb-9">
      <div className="w-44 m-auto text-center pt-4 pb-16">
        <img src="/images/logo_b.png" alt="logo" className="w-full" />
      </div>
      <UserForm />
      <div className="text-center mt-12">
        {LOGIN_ADD_TEXT.map(({ id, text }) => {
          return (
            <span key={id}>
              <span>{text}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          );
        })}
        <span>
          <Link to="/signin">
            <span>회원가입</span>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
      <div className="flex justify-center items-center text-center text-mkBlack opacity-50 mt-20">
        <hr className="border-mkGray w-1/4 inline-block mr-10" />
        <span>다른 서비스 계정으로 로그인</span>
        <hr className="border-mkGray w-1/4 inline-block ml-10" />
      </div>
      <div className="socialLoginBtn text-center mt-5">
        {/* <GoogleOAuthProvider clientId={googleOauthClientId}>
          <div className="inline-block m-auto mt-6 mx-3">
            <GoogleLoginBtn />
          </div>
        </GoogleOAuthProvider> */}
        <div className="inline-block m-auto mt-6 mx-3">
          <KakaoLoginBtn />
        </div>
        {/* <div className="inline-block m-auto mt-6 mx-3">
          <NaverLoginBtn />
        </div> */}
      </div>
    </div>
  );
}

// 상수 데이터
const LOGIN_ADD_TEXT = [
  { id: 1, text: '아이디 찾기' },
  { id: 2, text: '비밀번호 찾기' },
];
