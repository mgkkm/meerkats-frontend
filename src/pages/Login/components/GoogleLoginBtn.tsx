import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginBtn() {
  const navigate = useNavigate();

  const loginBtnOnClick = useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);
      if (response.access_token) {
        navigate('/');
      }
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
