import { KAKAO_AUTH_URL } from './KakaoConfig';

export default function KakaoLoginBtn() {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button onClick={kakaoLogin}>
      <div className="relative text-center inline-block bg-mkKakao w-16 h-16 rounded-full">
        <img
          src="/images/Login/logo_kakao.svg"
          alt="kakao_logo"
          className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-3/5 m-auto"
        />
      </div>
    </button>
  );
}
