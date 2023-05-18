import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieBlogData } from '../MovieDetail';
import parse from 'html-react-parser';

interface MovieBlogCardProps {
  blogPost: MovieBlogData;
}

export default function MovieDetailBlogCard({ blogPost }: MovieBlogCardProps) {
  const navigate = useNavigate();
  const [blogHover, setBlogHover] = useState(false);

  const {
    id,
    user,
    title,
    thumbnail,
    created_at,
    blogLikes,
    blogScrap,
    content,
  } = blogPost ?? {};

  return (
    <div
      className="w-[23rem] h-52 flex mb-10 bg-white relative drop-shadow-md md:max-lg:w-[20rem] md:max-lg:h-44"
      key={id}
      onMouseOver={() => setBlogHover(true)}
      onMouseLeave={() => setBlogHover(false)}
      onClick={() => navigate(`/blogDetail/${id}`)}
    >
      <div className="w-36">
        <img className="w-full h-full" src={thumbnail} alt="poster" />
      </div>
      <div className="flex flex-col py-3 px-3 w-56 relative">
        <p className="font-semibold mt-6 overflow-hidden text-ellipsis line-clamp-2 flex justify-center">
          {title}
        </p>
        <div className="flex flex-col items-end mt-9 absolute right-4 bottom-4">
          <p className="text-sm">{user?.nickname}</p>
          <p className="text-xs mt-1">{created_at?.split('T')[0]}</p>
          <div className="flex mt-7">
            <p className="text-xs mr-3">Like {blogLikes}</p>
            <p className="text-xs">Scrap {blogScrap}</p>
          </div>
        </div>
      </div>
      {blogHover && (
        <div className="w-[23rem] h-52 bg-white opacity-90 absolute cursor-pointer md:max-lg:w-[20rem] md:max-lg:h-44">
          <div className="mt-12 h-[50px] flex items-center justify-center text-center">
            <p className="text-ml font-semibold px-12 box-content overflow-hidden text-ellipsis line-clamp-2 underline underline-offset-4">
              {title}
            </p>
          </div>
          <p className="text-sm px-7 overflow-hidden text-ellipsis line-clamp-2 absolute bottom-14 hover:underline hover:underline-offset-4">
            {parse(content)}
          </p>
        </div>
      )}
    </div>
  );
}
