import React from 'react';
import { useRecoilValue } from 'recoil';
import { movieBlogState } from '../../../recoil/MovieDetailState';
import MovieDetailBlogCard from './MovieDetailBlogCard';

export default function MovieDetailBlog() {
  const movieBlogData = useRecoilValue(movieBlogState);

  return (
    <div className="w-full flex justify-center flex-wrap gap-9">
      {movieBlogData?.map(blogPost => {
        return <MovieDetailBlogCard key={blogPost.id} blogPost={blogPost} />;
      })}
    </div>
  );
}
