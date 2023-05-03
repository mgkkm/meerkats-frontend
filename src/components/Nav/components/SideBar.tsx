import React, { useEffect, useRef, useState } from 'react';

const sideData = [
  { id: 1, title: 'New' },
  { id: 2, title: 'International Movies' },
  { id: 3, title: 'Korean Movies' },
];

export default function SideBar() {
  const [show, setShow] = useState(false);
  const side = useRef<HTMLDivElement>(null);

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
          className="h-7 w-7"
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
        className={`menu dropdown-content mt-3 shadow bg-base-100  w-96 p-3.5 ${
          show ? 'block' : 'hidden'
        }`}
      >
        {sideData.map(list => {
          return (
            <li key={list.id} className="h-20 font-semibold ">
              <a className="flex justify-between active:bg-mkOrange">
                {list.title}
                <span className="fa-solid fa-chevron-right text-mkOrange"></span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
