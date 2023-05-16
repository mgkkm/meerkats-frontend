import React from 'react';
import { useRecoilValue } from 'recoil';
import { movieBlogState } from '../../../recoil/MovieDetailState';
import MovieDetailBlogCard from './MovieDetailBlogCard';

export default function MovieDetailBlog() {
  const movieBlogData = useRecoilValue(movieBlogState);

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-9 md:max-lg:grid-cols-2 xl:grid-cols-2">
      {movieBlogData?.map(blogPost => {
        return <MovieDetailBlogCard key={blogPost.id} blogPost={blogPost} />;
      })}
    </div>
  );
}
