import React, { useEffect, useRef } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  blogInputState,
  commentIdState,
  isEditState,
  refState,
  renderingState,
} from '../../../recoil/BlogPostState';
import { useLocation, useParams } from 'react-router-dom';
import { DecodeToken } from '../../DecodeToken/DecodeToken';
import { currentUserIdState } from '../../../recoil/JwtDecode';
import { currentUserNicknameState } from '../../../recoil/JwtDecode';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CommentInput() {
  const token = sessionStorage.getItem('token');
  const setCurrentId = useSetRecoilState(currentUserIdState);
  const [currentNickName, setCurrentNickname] = useRecoilState(
    currentUserNicknameState
  );
  const setInputState = useSetRecoilState(refState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const commentId = useRecoilValue(commentIdState);
  const [content, setContent] = useRecoilState(blogInputState);
  const [rendering, setRendering] = useRecoilState(renderingState);

  const [loading, error, data, fetchData] = useAxios();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const param = useParams();
  const location = useLocation();

  setInputState(inputRef.current);

  useEffect(() => {
    DecodeToken(setCurrentId, setCurrentNickname);
  });

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const movieAxiosUrl = isEdit
    ? `${BASE_URL}/movie/comments/${commentId}`
    : `${BASE_URL}/movie/${param.id}/comments`;

  const commentAxiosUrl = location.pathname.includes('blogDetail')
    ? `${BASE_URL}/blog/postComment/${isEdit ? commentId : param.id}`
    : movieAxiosUrl;

  const clickHandler = () => {
    fetchData({
      url: commentAxiosUrl,
      method: isEdit ? 'PATCH' : 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
      data: { content: content },
    }).then((el: any) => {
      setRendering(!rendering);
      el.message.includes('SUCCESS') && setContent('');
      isEdit && setIsEdit(false);
    });
  };

  return (
    <div className="commentInput border border-mkLightGray my-10 pt-5 bg-white">
      <p className="text-sm font-semibold px-4">{currentNickName}</p>
      <div className="flex justify-center">
        <textarea
          ref={inputRef}
          value={content}
          onChange={changeHandler}
          className="textarea textarea-ghost w-[98%] my-2 px-2 py-1 text-sm"
          placeholder="meerkats"
        />
      </div>
      <div onClick={clickHandler} className="flex justify-end">
        <button className="btn btn-sm rounded-none">
          {isEdit ? 'Edit' : 'Post'}
        </button>
      </div>
    </div>
  );
}
