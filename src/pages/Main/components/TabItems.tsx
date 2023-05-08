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
      className="relative px-2 mb-2 w-[250px] "
    >
      {isHover && (
        <div className="z-100">
          <div className="bg-white w-[250px] h-96 absolute opacity-50" />
          <button
            onClick={moveHandler}
            className="absolute bottom-0 border-2 border-solid border-black bg-white py-4 w-[235px]"
          >
            MORE
          </button>
        </div>
      )}
      <img src={item.poster_img} alt="poster" className="w-fit h-full" />
    </div>
  );
}
