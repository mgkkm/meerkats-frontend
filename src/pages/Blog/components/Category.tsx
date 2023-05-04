import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { blogPostState } from '../../../recoil/BlogPostState';

export default function Category() {
  const [, setCategoryId] = useState(0);
  const [, SetSpoilerInfoId] = useState(0);
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);

  const cateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryIdString = e.target.value;
    const categoryId = parseInt(categoryIdString);
    setCategoryId(categoryId);

    setBlogPost(prevData => ({
      ...prevData,
      categoryId,
    }));
  };

  const spoSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const spoilerInfoId = parseInt(e.target.value);
    SetSpoilerInfoId(spoilerInfoId);

    setBlogPost(prevData => ({
      ...prevData,
      spoilerInfoId: spoilerInfoId,
    }));
  };

  return (
    <div>
      <form className="dropdown mt-8 mb-12">
        <select
          id="genre"
          onChange={cateSelectHandler}
          defaultValue={blogPost.categoryId}
          className="p-2 shadow rounded-box w-40  mr-2.5 text-mkOrange text-sm"
        >
          {GENRE_DATA.map(list => {
            return (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            );
          })}
        </select>
      </form>
      <form className="dropdown">
        <select
          name="Genre"
          onChange={spoSelectHandler}
          defaultValue={blogPost.spoilerInfoId}
          className="p-2 shadow rounded-box w-40 text-mkOrange  text-sm"
        >
          {SPOILER_DATA.map(list => {
            return (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

//⭐️TODO : 카테고리 백에서 get 요청으로 받을 것
const GENRE_DATA = [
  {
    id: 1,
    title: 'Action',
  },
  {
    id: 2,
    title: 'Comedy',
  },
  {
    id: 3,
    title: 'Romance',
  },
  {
    id: 4,
    title: 'Horror / Thriller',
  },
  {
    id: 5,
    title: 'SF / Fantasy',
  },
  {
    id: 6,
    title: 'Animation',
  },
];

const SPOILER_DATA = [
  { id: 1, title: 'Spoiler' },
  { id: 2, title: 'Non-Spoiler' },
];
