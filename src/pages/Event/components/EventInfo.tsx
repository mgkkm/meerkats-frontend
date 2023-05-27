import { useEffect } from 'react';
import EventSchedule from './EventSchedule';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';

type EventData = {
  id: number;
  title: string;
  due: string;
  product: string;
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
  const [loading, error, data, fetchData] = useAxios();
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
    <div className="flex justify-center font-semibold xl:p-10">
      <div className="shadow-2xl hidden xl:w-1/2 xl:h-[650px] xl:block xl:mr-10 xl:mt-6 ">
        <img src={findEvent.img} alt="movie_img" className="w-full h-[100%]" />
      </div>
      <div className="w-[55%] px-5 xs:w-full sm:w-full md:w-10/12">
        <h1 className="border-b border-solid border-mkGray text-3xl py-5 mt-3 xs:text-2xl">
          {findEvent.title}
        </h1>
        <ul className="border-b border-solid border-mkGray text-lg py-12 xs:text-base">
          <li className="text-mkGray font-semibold mb-1">
            기간
            <span className="ml-3 text-black">{findEvent.due}</span>
          </li>
          <li className="text-mkGray font-semibold mb-7">
            상품
            <span className="ml-3 text-black">{findEvent.product}</span>
          </li>
          <li className="max-sm:text-sm xl:text-base ">
            [이벤트 안내] {findEvent.title} 개봉 기념 특별 이벤트! <br />
            {findEvent.place}에서만 진행되는 이벤트로 여러분을 초대합니다.
            <br /> 오직 이곳에서만 즐길 수 있는 영화 경험과 {findEvent.product}
            를 비롯한 다양한 선물을 드립니다. 이벤트 기간은 {findEvent.due}
            까지로 제한되니, 놓치지 마세요. <br /> {findEvent.title}의 열정과
            스릴이 가득한 이 영화와 함께 더욱 특별한 순간을 만들어보세요.
          </li>
        </ul>
        <EventSchedule findEvent={findEvent} />
      </div>
    </div>
  );
}
