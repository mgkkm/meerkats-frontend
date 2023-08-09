import { useState } from 'react';

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
      <h1 className="text-xl pt-10 mb-5 font-semibold">일정 안내</h1>
      <div className={`overflow-hidden ${show ? 'h-fit' : 'h-36'}`}>
        {findEvent.schedule !== undefined &&
          findEvent.schedule.map(info => {
            return (
              <ul
                key={info.id}
                className="h-7 flex text-center mb-6 max-md:text-xs items-center"
              >
                <i className="fa-regular fa-calendar text-mkDarkGray text-xl" />
                <li className="w-[20%] h-full flex justify-center items-center">
                  <span>{info.date}</span>
                </li>
                <li className="w-[15%] h-full flex border-x-[1px] border-mkLightGray justify-center items-center">
                  <span>{info.time}</span>
                </li>
                <li className="w-[65%] flex items-center">
                  <i className="fa-solid fa-location-dot text-mkOrange text-xl md:text-2xl ml-5 mr-3" />
                  <span className="text-left">{info.address}</span>
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
