import React from 'react';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';

export default function Comments() {
  return (
    <div>
      <CommentList />
      <CommentInput />
    </div>
  );
}
