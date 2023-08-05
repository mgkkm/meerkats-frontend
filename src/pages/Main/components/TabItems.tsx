import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

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
      onClick={moveHandler}
      className="relative px-2 mb-2 xs:w-24 sm:w-36 md:w-44 xl:w-[230px] h-fit hover:cursor-pointer"
    >
      {isHover && (
        <div className="z-100">
          <div className="absolute bg-black xs:h-[117px] sm:h-[187px] md:h-[234px] xl:h-[312.6px] opacity-50 xs:w-20 sm:w-32 md:w-40 xl:w-[215px]" />
          <button
            onClick={moveHandler}
            className="absolute flex justify-center items-center text-white font-bold translate-y-1/2 bottom-1/2 text-[10px] right-5 max-sm:translate-x-1/2 max-sm:right-[45%] sm:text-sm xl:text-base"
          >
            MORE
            <MdKeyboardDoubleArrowRight className="text-xl" />
          </button>
        </div>
      )}
      <img src={item.poster_img} alt="poster" className="w-full h-full" />
    </div>
  );
}
