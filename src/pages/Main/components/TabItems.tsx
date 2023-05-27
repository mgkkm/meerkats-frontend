import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type tabProps = {
  item: {
    id: number;
    name: string;
    release_date: string | null;
    poster_img: string;
    likes: number;
  };
};

export default function TabItems({ item }: tabProps) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const mouseOverHandler = () => setIsHover(true);
  const mouseOutHandler = () => setIsHover(false);

  const moveHandler = () => navigate(`/movieDetail/${item.id}`);

  return (
    <div
      key={item.id}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      className="relative px-2 mb-2 xs:w-24 sm:w-36 md:w-44 xl:w-[230px] h-fit "
    >
      {isHover && (
        <div className="z-100">
          <div className="absolute bg-white h-96 opacity-50 xs:w-20 sm:w-32 md:w-40 xl:w-[215px]" />
          <button
            onClick={moveHandler}
            className="absolute py-4 text-lg bottom-0 border-2 border-solid border-black bg-white xs:w-20 max-sm:text-[10px] max-sm:py-2 sm:w-32 md:w-40 xl:w-[215px]"
          >
            MORE
          </button>
        </div>
      )}
      <img src={item.poster_img} alt="poster" className="w-fit h-full" />
    </div>
  );
}
