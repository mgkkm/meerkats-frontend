import { Link, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import Search from './components/Search';

interface HidePropsType {
  show: boolean;
}

export default function Nav({ show }: HidePropsType) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const logInNOut = () => {
    if (token) {
      sessionStorage.removeItem('token');
      navigate('/');
    } else if (token === null) {
      navigate('/login');
    }
  };

  return (
    <div
      className={`navbar bg-base-100 fixed top-0 flex items-center justify-between py-6 xl:px-7 shadow visible transition duration-500 ease-in-out z-10${
        show ? '' : 'opacity-0'
      }`}
    >
      <div className="navbar-start ml-5 xs:w-28 sm:w-36 md:w-44 xl:w-52">
        <div className="dropdown">
          <SideBar />
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <img
            alt="logo"
            src="/images/logo_b.png"
            className="w-52 max-md:w-32"
          />
        </Link>
      </div>
      <div className="navbar-end flex items-center justify-between xs:w-28 sm:w-36 md:w-44 xl:w-52">
        <Search />
        <div
          className="navBlogBtn w-12 h-12 hover:bg-[#e6e7e9] rounded-full text-[2rem] text-center cursor-pointer"
          onClick={() => navigate('/blogMain')}
        >
          <i className="fa-regular fa-b inline-block pt-[0.47rem] pl-[0.2rem] opacity-90 max-sm:text-[25px]" />
        </div>
        <div
          className="navIsUser w-12 h-12 mb-1 hover:bg-[#e6e7e9] rounded-full text-center leading-[1.1rem] font-semibold cursor-pointer max-sm:text-sm"
          onClick={logInNOut}
        >
          <span className="inline-block pt-[0.5rem] opacity-90">
            LOG
            <br />
            {token !== null ? `OUT` : `IN`}
          </span>
        </div>
      </div>
    </div>
  );
}
