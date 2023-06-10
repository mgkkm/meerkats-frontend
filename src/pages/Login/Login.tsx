import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserForm from './components/UserForm';
import KakaoLoginBtn from './components/KakaoLoginBtn';
import GoogleLoginBtn from './components/GoogleLoginBtn';
import NaverLoginBtn from './components/NaverLoginBtn';

export default function Login() {
  const googleOauthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  return (
    <div className="container pt-36 xs:pb-3 sm:pt-[11rem] xl:pt-48 sm:pb-6 xl:pb-5 sm:px-18 md:px-32 lg:px-56 xl:px-[20rem] bg-mkBg text-mkBlack text-sm xs:text-[0.93rem] sm:text-base">
      <div className="w-44 m-auto pt-4 pb-12 sm:pb-16 text-center">
        <img src="/images/logo_b.png" alt="logo" className="w-full" />
      </div>
      <UserForm />
      <div className="mt-8 sm:mt-12 text-center opacity-90">
        <span className="mr-3 xs:mr-5 sm:mr-8 lg:mr-10">아이디 찾기</span>|
        <span className="mx-3 xs:mx-5 sm:mx-8 lg:mx-10">비밀번호 찾기</span>|
        <Link to="/signin">
          <span className="ml-3 xs:ml-5 sm:ml-8 lg:ml-10">회원가입</span>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-9 sm:mt-20 text-center text-mkBlack opacity-50">
        <hr className="hidden sm:inline-block border-mkGray w-[20%] sm:w-1/4 mr-5 sm:mr-10" />
        <span className="hidden sm:flex">다른 서비스 계정으로 로그인</span>
        <hr className="hidden sm:inline-block border-mkGray w-[20%] sm:w-1/4 ml-5 sm:ml-10" />
      </div>
      <div className="socialLoginBtn-box flex justify-center gap-5 xs:gap-7 sm:gap-10 sm:mt-12 text-center m-auto">
        {/* google */}
        <GoogleOAuthProvider clientId={googleOauthClientId}>
          <div className="socialLoginBtn">
            <GoogleLoginBtn />
          </div>
        </GoogleOAuthProvider>

        {/* kakao */}
        <div className="socialLoginBtn">
          <KakaoLoginBtn />
        </div>

        {/* naver */}
        <div className="socialLoginBtn">
          <NaverLoginBtn />
        </div>
      </div>
    </div>
  );
}
