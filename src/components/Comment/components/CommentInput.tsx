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

export default function CommentInput() {
  const setInputState = useSetRecoilState(refState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const commentId = useRecoilValue(commentIdState);
  const [content, setContent] = useRecoilState(blogInputState);
  const [rendering, setRendering] = useRecoilState(renderingState);
  const [loading, error, data, fetchData] = useAxios();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  setInputState(inputRef.current);
  console.log(isEdit);

  const clickHandler = () => {
    fetchData({
      //⭐️ TODO : 35 대신  post Id 로 수정하기
      url: 'https://www.meerkats.monster/blog/postComment/35',
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
      },
      data: { content: content },
    }).then((el: any) => {
      setRendering(!rendering);
      el.message.includes('SUCCESS') && setContent('');
    });
  };

  const editHandler = () => {
    fetchData({
      url: `https://www.meerkats.monster/blog/postComment/${commentId}`,
      method: 'PATCH',
      headers: {
        'Content-Type': `application/json`,
      },
      data: { content: content },
    }).then((el: any) => {
      setRendering(!rendering);
      el.message.includes('SUCCESS') && setContent('');
      setIsEdit(false);
    });
  };

  return (
    <div className="commentInput border boder-mkGray my-10 pt-5">
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
      <div
        onClick={() => (isEdit ? editHandler() : clickHandler())}
        className="flex justify-end"
      >
        <button className="btn btn-sm rounded-none">
          {isEdit ? 'Edit' : 'Post'}
        </button>
      </div>
    </div>
  );
}
