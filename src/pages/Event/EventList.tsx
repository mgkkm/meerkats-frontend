import React, { useEffect } from 'react';
import Pagenation from './components/Pagenation';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

type EventType = {
  id: number;
  title: string;
  sub: string;
  due: string;
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
  const [loading, error, data, fetchData] = useAxios();
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
        Ongoing Event
      </h1>
      <div className="container p-2.5 flex flex-wrap">
        {data &&
          data.map((row: EventType) => {
            return (
              <div
                data-value={row.id}
                onClick={clickHandler}
                key={row.id}
                className="xs:w-full md:w-full xl:w-1/2 flex relative p-5 mb-5"
              >
                <div className="w-40 h-56 mr-7 shadow-xl cursor-pointer max-sm:h-48">
                  <img
                    src={row.img}
                    alt="movie_img"
                    className="w-full h-full"
                  />
                </div>
                <ul className="w-3/4 h-56 border-b py-3 border-mkLightGray max-sm:py-1 xs:h-fit">
                  <li className="text-xl font-semibold mb-2 max-xs:text-lg">
                    [{row.title}]
                  </li>
                  <li className="text-lg font-semibold mb-10 max-sm:text-base">
                    {row.sub}
                  </li>
                  <li className="font-medium text-mkGray max-sm:text-sm">
                    장소
                    <span className="ml-2.5 font-semibold text-black max-sm:text-sm">
                      {row.place}
                    </span>
                  </li>
                  <li className="mt-1.5 font-medium text-mkGray max-sm:text-sm">
                    기간
                    <span className="ml-2.5 font-semibold text-black max-sm:text-sm">
                      {row.due}
                    </span>
                  </li>
                  <li className="font-medium text-mkGray leading-9 max-sm:text-sm">
                    경품
                    <span className="ml-2.5 font-semibold text-black max-sm:text-sm">
                      {row.product}
                    </span>
                  </li>
                </ul>
                <button
                  value={row.id}
                  onClick={clickHandler}
                  className="xs:hidden md:block xl:block btn btn-outline rounded-none font-medium border-none text-mkOrange  hover:border-mkOrange hover:bg-transparent hover:text-black absolute right-10"
                >
                  More
                  <i className="fa-solid fa-caret-right ml-2" />
                </button>
              </div>
            );
          })}
      </div>
      <Pagenation />
    </div>
  );
}
