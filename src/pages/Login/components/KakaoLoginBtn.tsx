import { KAKAO_AUTH_URL } from './KakaoConfig';

export default function KakaoLoginBtn() {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={kakaoLogin}>
      <div className="socialLoginBtn bg-mkKakao">
        <img
          src="/images/login/logo_kakao.svg"
          alt="kakao_logo"
          className="socialLogo w-3/5 -translate-x-2/4 -translate-y-2/4"
        />
      </div>
    </button>
  );
}
