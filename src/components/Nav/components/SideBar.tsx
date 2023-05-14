import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const [show, setShow] = useState(false);
  const side = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const showSideBar = () => {
    setShow(show => !show);
  };

  const handleClose = (e: MouseEvent) => {
    let sideArea = side.current;
    let sideCildren = side.current?.contains(e.target as Node);
    if (show && (!sideArea || !sideCildren)) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  return (
    <>
      <label
        tabIndex={0}
        onClick={showSideBar}
        className="btn btn-ghost btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className={`menu dropdown-content p-3.5 mt-3 shadow bg-base-100 max-md:w-60 max-md:text-sm max-xl:w-96  ${
          show ? 'block' : 'hidden'
        }`}
      >
        {SIDEBAR_DATA.map(list => {
          const clickHandler = () => {
            if (list.id === 4) {
              navigate('/event');
              setShow(false);
            } else if (list.id === 5) {
              navigate('/membership');
              setShow(false);
            }
          };
          return (
            <li
              key={list.id}
              onClick={clickHandler}
              className="h-20 font-semibold"
            >
              <div className="flex justify-between active:bg-mkOrange">
                {list.title}
                <span className="fa-solid fa-chevron-right text-mkOrange" />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const SIDEBAR_DATA = [
  { id: 1, title: 'New' },
  { id: 2, title: 'International Movies' },
  { id: 3, title: 'Korean Movies' },
  { id: 4, title: 'Event' },
  { id: 5, title: 'Membership' },
];
