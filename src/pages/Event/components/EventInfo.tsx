import React, { useEffect } from 'react';
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
  schedule: EventSchedule[];
};

type EventSchedule = {
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
      url: 'http://localhost:3000/data/eventInfo.json',
    });
  }, []);

  let findEvent =
    data !== null &&
    data.find((item: EventData) => {
      return item.id === event;
    });

  return (
    <div className=" flex justify-center font-semibold">
      <div className=" w-1/3 h-[650px] shadow-2xl mr-10 mt-6">
        <img src={findEvent.img} className="w-full h-[100%]" />
      </div>
      <div className="w-[55%] px-5 ">
        <h1 className="border-b border-solid border-mkGray text-3xl py-5 mt-3">
          {findEvent.title}
        </h1>
        <ul className="border-b border-solid border-mkGray text-lg py-12">
          <li className="text-mkGray font-semibold mb-1">
            Period
            <span className="ml-3 text-black">{findEvent.due}</span>
          </li>
          <li className="text-mkGray font-semibold mb-7">
            Giveaway
            <span className="ml-3 text-black">{findEvent.product}</span>
          </li>
          <li className=" font-medium">
            Introducing our special premiere event! <br />
            Join us for the highly anticipated release of {findEvent.title} and
            receive a complimentary gift with admission. This limited-time offer
            includes {findEvent.product} and is available at select screenings.
            Don't miss your chance to experience the excitement of the big
            screen and take home a special memento from this unforgettable
            event. <br />
            Book your tickets now and get ready to be transported to a world of
            cinematic magic!
          </li>
        </ul>
        <EventSchedule findEvent={findEvent} />
      </div>
    </div>
  );
}
