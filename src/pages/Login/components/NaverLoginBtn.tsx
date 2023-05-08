export default function NaverLoginBtn() {
  const naverLogin = () => {
    alert('아직 구현이 안됐습니다. 메롱. 애자일임.');
  };
  return (
    <button onClick={naverLogin}>
      <div className="relative text-center inline-block bg-mkNaver w-16 h-16 rounded-full">
        <img
          src="images/login/logo_naver.png"
          alt="naver_logo"
          className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-3/5 m-auto"
        />
      </div>
    </button>
  );
}
