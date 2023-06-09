import { warningAlert } from '../../../components/Alert/Modal';

export default function NaverLoginBtn() {
  const naverLogin = () => {
    warningAlert(
      '서비스 안내',
      '죄송합니다 :( 서비스 준비중입니다. 다른 로그인 서비스를 이용해주세요.'
    );
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
