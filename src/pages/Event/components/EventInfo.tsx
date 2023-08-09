import { useEffect } from 'react';
import EventSchedule from './EventSchedule';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';

type EventData = {
  id: number;
  title: string;
  releaseDate: string;
  period: string;
  detail: string;
  place: string;
  img: string;
  schedule: EventScheduleProps[];
};

type EventScheduleProps = {
  id: number;
  date: string;
  time: string;
  address: string;
};

export default function EventInfo() {
  const [, , data, fetchData] = useAxios();
  const params = useParams();
  let event = parseInt(params.id!);

  useEffect(() => {
    fetchData({
      url: '/data/eventInfo.json',
    });
  }, []);

  let findEvent =
    data !== null && data.find((item: EventData) => item.id === event);

  return (
    <div className="flex justify-center gap-5 px-4 lg:px-12 xl:px-[120px]">
      <div className="shadow-2xl hidden lg:w-1/3 xl:w-1/2 lg:block xl:mr-10 xl:mt-6 h-fit">
        <img src={findEvent.img} alt="movie_img" className="w-full" />
      </div>
      <div className="w-[55%] px-5 xs:w-full sm:w-full md:w-10/12">
        <h1 className="text-3xl mt-14 pb-2 font-semibold">{findEvent.title}</h1>
        <div className="w-full h-[1px] bg-gradient-to-r from-black to-transparent" />
        <ul className="text-lg pt-8 pb-11 xs:text-base">
          <li className="sm:text-xl font-semibold">{findEvent.sub}</li>
          <li className="text-sm text-mkGray mb-8">{findEvent.period}</li>
          <li className="max-sm:text-sm xl:text-base mb-3 font-semibold">
            {findEvent.title} 개봉 기념 특별 이벤트! <br />
          </li>
          <li className="max-sm:text-sm xl:text-base">{findEvent.detail}</li>
        </ul>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-black" />
        <EventSchedule findEvent={findEvent} />
      </div>
    </div>
  );
}
