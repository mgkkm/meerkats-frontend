import { Link, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import Search from './components/Search';
import { infoAlert } from '../Alert/Modal';

interface HidePropsType {
  show: boolean;
}

export default function Nav({ show }: HidePropsType) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const logInNOut = () => {
    if (token) {
      sessionStorage.removeItem('token');
      infoAlert('로그아웃', '로그아웃 되었습니다. :)');
      navigate('/');
    } else if (token === null) {
      navigate('/login');
    }
  };

  return (
    <div
      className={`navbar bg-base-100 fixed top-0 flex items-center justify-between py-[0.4rem] xs:py-3 md:py-4 xl:px-7 shadow visible transition duration-500 ease-in-out z-10 ${
        show ? '' : 'opacity-0'
      }`}
    >
      <div className="navbar-start xs:ml-2 sm:ml-5 md:ml-6">
        <div className="dropdown">
          <SideBar />
        </div>
      </div>
      <div className="navbar-center w-[6.5rem] xs:w-28 sm:w-40 lg:w-44">
        <Link to="/">
          <img alt="logo" src="/images/logo_b.png" className="w-full" />
        </Link>
      </div>
      <div className="navbar-end flex items-center gap-[0.3rem] xs:gap-3 sm:gap-4 md:gap-6 lg:gap-9 mr-3 xs:mr-5 md:mr-6 lg:mr-8 mt-1">
        <Search />
        <div
          className="navBlogBtn relative w-9 h-9 sm:w-14 sm:h-14 text-[2rem] text-center cursor-pointer"
          onClick={() => navigate('/blogMain')}
        >
          <i className="fa-regular fa-b absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 inline-block opacity-80 hover:opacity-100 text-[20px] sm:text-[25px] md:text-[29px] lg:text-[32px]" />
        </div>
        <div
          className="navIsUser w-5 h-5 sm:w-[1.5rem] sm:h-[1.5rem] md:w-[1.75rem] md:h-[1.75rem] lg:w-[2.07rem] lg:h-[2.07rem] text-sm text-center leading-[0.8rem] sm:leading-[1.1rem] font-semibold cursor-pointer"
          onClick={logInNOut}
        >
          {token ? (
            <img
              src="/images/logout.png"
              alt="로그인"
              className="opacity-[0.63] hover:opacity-100"
            />
          ) : (
            <img
              src="/images/login.png"
              alt="로그아웃"
              className="opacity-[0.63] hover:opacity-100"
            />
          )}
        </div>
      </div>
    </div>
  );
}
