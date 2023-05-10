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
      className={`navbar bg-base-100 fixed top-0 flex items-center py-6 px-7 shadow visible transition duration-500 ease-in-out z-10 ${
        show ? '' : 'opacity-0'
      }`}
    >
      <div className="navbar-start ml-5">
        <div className="dropdown">
          <SideBar />
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <img alt="logo" src="/images/logo_b.png" className="w-52" />
        </Link>
      </div>
      <div className="navbar-end flex items-center mr-5">
        <Search />
        <div
          className="navBlogBtn w-12 h-12 mr-12 hover:bg-[#e6e7e9] rounded-full text-[2rem] text-center cursor-pointer"
          onClick={() => navigate('/blogMain')}
        >
          <i className="fa-regular fa-b inline-block pt-[0.47rem] pl-[0.2rem] opacity-90" />
        </div>
        <div
          className="navIsUser w-12 h-12 mr-5 mb-1 hover:bg-[#e6e7e9] rounded-full text-center text-base leading-[1.1rem] font-semibold cursor-pointer"
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
