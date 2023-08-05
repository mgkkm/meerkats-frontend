import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

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
      onClick={moveHandler}
      className="bg-white w-fit hover:cursor-pointer"
    >
      {isHover && (
        <div className="z-100">
          <div className="bg-black w-full h-full absolute opacity-50" />
          <button
            onClick={moveHandler}
            className="absolute flex justify-center items-center text-white font-bold translate-y-1/2 bottom-1/2 text-[10px] right-3 max-sm:translate-x-1/2 max-sm:right-[45%] sm:text-sm xl:text-lg"
          >
            MORE
            <MdKeyboardDoubleArrowRight className="text-xl" />
          </button>
        </div>
      )}
      <img src={poster_img} alt="best_movie" />
    </div>
  );
}
