import React, { useEffect, useState } from 'react';
import Pagenation from './components/Pagenation';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

export default function EventList() {
  const [loading, error, data, fetchData] = useAxios();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      url: 'http://localhost:3000/data/eventInfo.json',
    });
  }, []);

  const clickHandler = (e: any) => {
    let eventId = e.target.value;
    navigate(`/event/${eventId}`);
    console.log(eventId);
  };

  return (
    <div className="container xl mt-28 bg-white py-14 px-20 ">
      <h1 className="text-3xl text-center font-semibold  mb-14">
        Ongoing Event
      </h1>
      <div className="container md p-2.5 flex flex-wrap	">
        {data !== null &&
          data.map((row: any) => {
            return (
              <div key={row.id} className="w-1/2  p-5 mb-5 flex relative">
                <div className="w-40 h-56  mr-7 shadow-xl">
                  <img src={row.img} className="w-full h-full"></img>
                </div>
                <ul className=" w-3/4 h-56 border-b py-3 border-mkLightGray ">
                  <li className=" text-xl font-semibold mb-4">
                    [{row.title}]
                    <br /> Launching Promotion
                  </li>
                  <li className=" font- font-medium  text-mkGray ">
                    장소
                    <span className="ml-2.5  font-semibold text-black">
                      {row.place}
                    </span>
                  </li>
                  <li className=" mt-1.5 font- font-medium  text-mkGray ">
                    기간
                    <span className="ml-2.5 font-semibold text-black">
                      {row.due}
                    </span>
                  </li>
                  <li className=" font- font-medium  text-mkGray leading-9">
                    경품
                    <span className="ml-2.5  font-semibold text-black">
                      {row.product}
                    </span>
                  </li>
                </ul>
                <button
                  value={row.id}
                  onClick={clickHandler}
                  className="btn btn-outline rounded-none  font-medium 	border-none text-mkOrange  hover:border-mkOrange hover:bg-transparent hover:text-black absolute left-[185px] bottom-5"
                >
                  More
                  <i className="fa-solid fa-arrow-right-long ml-2"></i>
                </button>
              </div>
            );
          })}
      </div>
      <Pagenation />
    </div>
  );
}
