export default function NaverLoginBtn() {
  const naverLogin = () => {
    alert('아직 구현이 안됐습니다. 메롱. 애자일임.');
  };
  return (
    <button onClick={naverLogin}>
      <div className="socialLoginBtn bg-mkNaver">
        <img
          src="images/login/logo_naver.png"
          alt="naver_logo"
          className="socialLogo w-3/5 -translate-x-2/4 -translate-y-2/4"
        />
      </div>
    </button>
  );
}
