import React, { useState } from 'react';

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

type eventProps = {
  findEvent: EventData;
};

export default function EventSchedule({ findEvent }: eventProps) {
  const [show, setShow] = useState(false);

  const clickHandler = () => {
    setShow(show => !show);
  };

  return (
    <>
      <h1 className="text-xl pt-10 mb-5">Schedules</h1>
      <div className={`overflow-hidden  ${show ? 'h-fit' : 'h-44'}`}>
        {findEvent.schedule !== undefined &&
          findEvent.schedule.map(info => {
            return (
              <ul
                key={info.id}
                className="flex justify-around text-center text-lg font-medium mb-3 max-md:text-xs"
              >
                <li className="w-1/5 h-20 flex p-5 xs:px-2 xs:border-none xl:border-r xl:border-solid xl:border-mkGray ">
                  <i className="fa-regular fa-calendar text-mkOrange text-2xl mr-5 py-1" />
                  <span className="py-1">{info.date}</span>
                </li>
                <li className="w-1/5 xs:py-8 xs:border-none xl:py-6 xl:border-r xl:border-solid xl:border-mkGray">
                  {info.time}
                </li>
                <li className="w-3/5 h-20 flex py-3 ">
                  <i className="fa-solid fa-location-dot text-mkOrange text-2xl py-2.5 ml-7 mr-5" />
                  <span className="text-left py-3">{info.address}</span>
                </li>
              </ul>
            );
          })}
      </div>
      <div className="text-center">
        <button onClick={clickHandler} className="btn btn-ghost sm:mt-7">
          SEE MORE
          {show ? (
            <span className="fa-solid fa-caret-up ml-2.5 text-xl" />
          ) : (
            <span className="fa-solid fa-caret-down ml-2.5 text-xl" />
          )}
        </button>
      </div>
    </>
  );
}
