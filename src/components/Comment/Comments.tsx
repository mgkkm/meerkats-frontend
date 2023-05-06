import React from 'react';
import CommentList from './components/CommentList';
// import CommentInput from './components/CommentInput';
import { useLocation } from 'react-router-dom';

export default function Comments() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className={`${
        pathname.split('/')[1].includes('movie') ? 'px-10 py-10 bg-white' : ''
      }`}
    >
      <CommentList />
      {/* <CommentInput /> */}
    </div>
  );
}
