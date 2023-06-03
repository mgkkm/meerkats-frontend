import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useAxios from '../../../hooks/useAxios';
import {
  refState,
  isEditState,
  blogInputState,
  commentIdState,
  renderingState,
} from '../../../recoil/BlogPostState';
import { currentUserIdState } from '../../../recoil/JwtDecode';
import { failedAxiosAlert, successAlert } from '../../Alert/Modal';
import { useLocation } from 'react-router-dom';

type commentProps = {
  commentId: number;
  user: {
    id: number;
    nickname: string;
  };
  content: string;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function DropDownBtn({
  user,
  content,
  commentId,
}: commentProps) {
  const token = sessionStorage.getItem('token');
  const location = useLocation();
  const inputRef = useRecoilValue(refState);
  const setIsEdit = useSetRecoilState(isEditState);
  const currentUserId = useRecoilValue(currentUserIdState);
  const setCurrentCommentId = useSetRecoilState(commentIdState);
  const [rendering, setRendering] = useRecoilState(renderingState);
  const setInputContent = useSetRecoilState(blogInputState);
  const [loading, error, data, fetchData] = useAxios();

  const deleteAxiosUrl = location.pathname.includes('blogDetail')
    ? `${BASE_URL}/blog/postComment/${commentId}`
    : `${BASE_URL}/movie/comments/${commentId}`;

  const deleteHandler = () => {
    failedAxiosAlert(
      'Are you sure?',
      "You won't be able to revert this!",
      () => {
        fetchData({
          url: deleteAxiosUrl,
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        }).then((result: any) => {
          setRendering(!rendering);
          if (result.message.includes('SUCCESS')) {
            successAlert('Deleted!', 'Your post has been deleted.');
          }
        });
      }
    );
  };

  const editHandler = (e: any) => {
    setInputContent(e.target.name);
    setCurrentCommentId(e.target.value);
    inputRef !== null && inputRef.focus();
    setIsEdit(true);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <HiOutlineDotsHorizontal
          className={`text-xl hover:cursor-pointer ${
            currentUserId !== user.id && 'hidden'
          }`}
        />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-base-100 rounded-box"
      >
        <li className="w-16">
          <button
            onClick={editHandler}
            name={content}
            value={commentId}
            className="text-sm flex justify-center active:bg-mkOrange"
          >
            수정
          </button>
        </li>
        <li
          className={`hover:cursor-pointer  text-xs w-16 ${
            currentUserId !== user.id && 'hidden'
          }`}
        >
          <button
            onClick={deleteHandler}
            value={commentId}
            className="text-sm flex justify-center active:bg-mkOrange"
          >
            삭제
          </button>
        </li>
      </ul>
    </div>
  );
}
