import React, { useState } from 'react';
import MovieChat from './MovieChat';
import Comments from '../../../components/Comment/Comments';
import MovieDetailBlog from './MovieDetailBlog';

export default function MovieDetailTab() {
  const [currentTab, setCurrentTab] = useState(1);

  const activateTab = (id: number) => {
    setCurrentTab(id);
  };

  return (
    <div>
      <div className="tabs flex items-center h-10 mb-3 justify-center gap-12 md:gap-24">
        {MOVIE_DETAIL_TAB.map(({ id, title }) => {
          return (
            <p
              className={`tab h-9 px-1 border-2 border-t-transparent border-x-transparent ${
                currentTab === id
                  ? 'text-black  border-b-mkOrange'
                  : 'border-b-mkLightGray'
              }`}
              key={id}
              onClick={() => activateTab(id)}
            >
              {title}
            </p>
          );
        })}
      </div>
      <div className="pt-10 px-7">
        {MOVIE_DETAIL_TAB[currentTab - 1].content}
      </div>
    </div>
  );
}

const MOVIE_DETAIL_TAB = [
  {
    id: 1,
    title: 'CHAT',
    content: <MovieChat />,
  },
  {
    id: 2,
    title: 'COMMENT',
    content: <Comments />,
  },
  {
    id: 3,
    title: 'BLOG',
    content: <MovieDetailBlog />,
  },
];
