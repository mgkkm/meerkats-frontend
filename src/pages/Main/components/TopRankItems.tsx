import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

type topRankProps = {
  item: never;
};

export default function TopRankItems({ item }: topRankProps) {
  const { id, poster_img } = item;

  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const mouseOverHandler = () => setIsHover(true);
  const mouseOutHandler = () => setIsHover(false);

  const moveHandler = () => navigate(`/movieDetail/${id}`);

  return (
    <div
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      className="bg-white w-fit"
    >
      {isHover && (
        <div className="z-100">
          <div className="bg-white w-[410px] h-[550px] absolute opacity-50" />
          <button
            onClick={moveHandler}
            className="absolute w-full bottom-0 border-2 border-solid border-black bg-white xs:text-[10px] max-md:py-2 xl:py-4"
          >
            MORE
          </button>
        </div>
      )}
      <img src={poster_img} alt="best_movie" />
    </div>
  );
}
