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
import { failedAxiosAlert } from '../../Alert/Modal';
import { tokenState } from '../../../recoil/TokenState';
const Swal = require('sweetalert2');

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
  const token = useRecoilValue(tokenState);
  const inputRef = useRecoilValue(refState);
  const setIsEdit = useSetRecoilState(isEditState);
  const currentUserId = useRecoilValue(currentUserIdState);
  const setCurrentCommentId = useSetRecoilState(commentIdState);
  const [rendering, setRendering] = useRecoilState(renderingState);
  const setInputContent = useSetRecoilState(blogInputState);
  const [loading, error, data, fetchData] = useAxios();

  const deleteHandler = () => {
    failedAxiosAlert(
      'Are you sure?',
      "You won't be able to revert this!",
      () => {
        fetchData({
          url: `${BASE_URL}/blog/postComment/${commentId}`,
          method: 'DELETE',
          header: {
            Authorization: token,
          },
        }).then((result: any) => {
          setRendering(!rendering);
          result.message.includes('SUCCESS') &&
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
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
        <li>
          <button
            onClick={editHandler}
            name={content}
            value={commentId}
            className="text-sm flex justify-center active:bg-mkOrange"
          >
            Edit
          </button>
        </li>
        <li
          className={`hover:cursor-pointer  text-xs ${
            currentUserId !== user.id && 'hidden'
          }`}
        >
          <button
            onClick={deleteHandler}
            value={commentId}
            className="text-sm flex justify-center active:bg-mkOrange"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
