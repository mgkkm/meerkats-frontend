import { useEffect } from 'react';
import Pagenation from './components/Pagenation';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

type EventType = {
  id: number;
  title: string;
  releaseDate: string;
  sub: string;
  period: string;
  product: string;
  place: string;
  img: string;
  schedule: {
    id: number;
    date: string;
    time: string;
    address: string;
  };
};

export default function EventList() {
  const [, , data, fetchData] = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      url: '/data/eventInfo.json',
    });
  }, []);

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    let eventId;
    if (e.currentTarget instanceof HTMLButtonElement) {
      eventId = e.currentTarget.value;
    } else {
      eventId = e.currentTarget.getAttribute('data-value');
    }
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="container xl pt-24 pb-14 px-20 bg-white xs:px-0">
      <h1 className="text-4xl text-center font-semibold my-14 max-sm:text-2xl">
        진행 중인 이벤트
      </h1>
      <div className="container px-7 sm:px-20 py-2.5 flex flex-wrap max-xl:justify-center">
        {data &&
          data.map((row: EventType) => {
            return (
              <div
                data-value={row.id}
                onClick={clickHandler}
                key={row.id}
                className="w-full mb-[450px] lg:w-3/4 xl:w-1/2 sm:flex relative md:px-10 sm:mb-20 h-[260px] items-end cursor-pointer"
              >
                <div className="w-full h-fit sm:w-[175px] sm:mr-6 shadow-xl overflow-hidden">
                  <img src={row.img} alt="movie_img" className="w-full" />
                </div>
                <ul className="h-56 max-sm:p-1 xs:h-fit pb-1">
                  <li className="text-xl max-sm:mt-2 sm:text-2xl leading-6 font-semibold">
                    {row.title}
                  </li>
                  <li className="text-sm mb-2 sm:mb-5 text-mkGray">
                    {row.releaseDate}
                  </li>
                  <li className="sm:text-xl font-semibold mb-5 sm:mb-[90px]">
                    {row.sub}
                  </li>
                  <li className="font-medium text-mkGray text-sm">
                    장소
                    <span className="ml-2.5 text-black text-sm">
                      {row.place}
                    </span>
                  </li>
                  <li className="font-medium text-mkGray text-sm">
                    기간
                    <span className="ml-2.5 text-black text-sm">
                      {row.period}
                    </span>
                  </li>
                </ul>
                <div className="max-sm:hidden w-[1px] h-[230px] bg-gradient-to-b from-transparent via-[#707070] to-transparent absolute right-0 md:right-10" />
                <div className="sm:hidden w-[175px] h-[1px] bg-gradient-to-r from-transparent via-[#707070] to-transparent absolute translate-x-1/2 right-1/2 mt-10" />
              </div>
            );
          })}
      </div>
      <Pagenation />
    </div>
  );
}
