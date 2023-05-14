import React from 'react';
import { useRecoilState } from 'recoil';
import { blogPostState } from '../../../../recoil/BlogPostState';

export default function Title() {
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBlogPost(prevData => ({
      ...prevData,
      title: value,
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        className=" w-full h-20 text-4xl max-sm:text-3xl	py-4 outline-0"
        onChange={changeHandler}
        value={blogPost.title}
      />
      <div className="bg-mkOrange w-16	h-1.5" />
    </div>
  );
}
