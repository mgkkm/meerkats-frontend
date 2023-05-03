import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './components/SideBar';

interface HidePropsType {
  hide: boolean;
}

export default function Nav({ hide }: HidePropsType) {
  return (
    <div
      className={`navbar bg-base-100 py-6 px-7 fixed top-0 z-10 visible transition duration-500 ease-in-out shadow  ${
        hide && 'opacity-0'
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <SideBar />
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <img alt="logo" src="images/logo_b.png" className="w-44" />
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
