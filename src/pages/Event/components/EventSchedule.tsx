import React, { useState } from 'react';

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

type eventProps = {
  findEvent: EventData;
};

export default function EventSchedule({ findEvent }: eventProps) {
  const [show, setShow] = useState(false);

  const clickHandler = () => {
    setShow(show => !show);
  };

  return (
    <div className="mb-20 ">
      <h1 className="pt-10 mb-5">Schedules</h1>
      <div className={`overflow-hidden  ${show ? 'h-full' : 'h-48'} `}>
        {findEvent.schedule !== undefined &&
          findEvent.schedule.map(info => {
            return (
              <ul
                key={info.id}
                className="flex justify-around text-center text-lg font-medium mb-3"
              >
                <li className="w-1/5 h-20 flex p-5 border-r border-solid border-mkGray">
                  <i className="fa-regular fa-calendar text-mkOrange text-2xl mr-5" />
                  <span>{info.date}</span>
                </li>
                <li className="w-1/5 p-5 border-r border-solid border-mkGray">
                  {info.time}
                </li>
                <li className="w-3/5 h-20  flex py-3 border-r border-solid border-mkGray">
                  <i className="fa-solid fa-location-dot text-mkOrange text-2xl py-2 ml-7 mr-5" />
                  <span className="text-left">{info.address}</span>
                </li>
                <li className="w-1/5 py-5">
                  <button className="btn">Share</button>
                </li>
              </ul>
            );
          })}
      </div>
      <div className="text-center">
        <button onClick={clickHandler} className="btn btn-ghost ">
          SEE MORE
          <span className="fa-solid fa-caret-down ml-2.5 text-xl"></span>
        </button>
      </div>
    </div>
  );
}
