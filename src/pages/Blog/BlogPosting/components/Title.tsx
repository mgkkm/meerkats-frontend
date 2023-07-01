import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { blogPostState, isEditState } from '../../../../recoil/BlogPostState';

export default function Title() {
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);
  const isEdit = useRecoilValue(isEditState);
  let title;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBlogPost(prevData => ({
      ...prevData,
      title: value,
    }));
  };

  if (isEdit) {
    title = blogPost.title;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        className="w-full h-20 text-4xl py-4 outline-0 max-sm:text-3xl"
        onChange={changeHandler}
        value={title}
      />
      <div className="bg-mkOrange w-16	h-1.5" />
    </div>
  );
}
