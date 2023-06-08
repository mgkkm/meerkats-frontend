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
      <div
        tabIndex={0}
        onClick={showSideBar}
        className="w-5 h-5 mt-2 opacity-70 hover:opacity-100 cursor-pointer sm:h-7 sm:w-7 lg:w-8 lg:h-8"
      >
        <img src="/images/sidebar.png" alt="햄버거메뉴" className="w-full" />
      </div>
      <ul
        tabIndex={0}
        className={`menu dropdown-content w-96 p-3.5 mt-3 shadow bg-base-100 max-md:w-60 max-md:text-sm ${
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
