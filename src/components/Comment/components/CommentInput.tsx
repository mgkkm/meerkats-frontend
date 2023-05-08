import React, { useRef } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  blogInputState,
  commentIdState,
  isEditState,
  refState,
  renderingState,
} from '../../../recoil/BlogPostState';
import { useParams } from 'react-router-dom';
import { tokenState } from '../../../recoil/TokenState';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CommentInput() {
  const token = useRecoilValue(tokenState);
  const setInputState = useSetRecoilState(refState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const commentId = useRecoilValue(commentIdState);
  const [content, setContent] = useRecoilState(blogInputState);
  const [rendering, setRendering] = useRecoilState(renderingState);
  const [loading, error, data, fetchData] = useAxios();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const param = useParams();

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  setInputState(inputRef.current);

  const clickHandler = () => {
    fetchData({
      url: `${BASE_URL}/blog/postComment/${isEdit ? commentId : param.id}`,
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
      <p className="text-sm font-semibold px-4">username</p>
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
