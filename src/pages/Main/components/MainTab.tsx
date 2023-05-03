import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { mainDataState } from '../../../recoil/MainDataState';

export default function MainTab() {
  const [activeTab, setActiveTab] = useState(0);
  const [mainData] = useRecoilState(mainDataState);

  const TabData = [
    {
      id: 1,
      title: 'New',
      content: mainData[0].latestMovie.map((row: { poster_img: string }) => {
        return row.poster_img;
      }),
    },
    {
      id: 2,
      title: 'International movies',
      content: mainData[0].foreignMovieWithLikes.map(
        (row: { poster_img: string }) => {
          return row.poster_img;
        }
      ),
    },
    {
      id: 3,
      title: 'Korean movies',
      content: mainData[0].koreanMovieWithLikes.map(
        (row: { poster_img: string }) => {
          return row.poster_img;
        }
      ),
    },
  ];

  const tabClickHandler = (idx: number) => {
    setActiveTab(idx);
  };

  return (
    <div className="mb-36 ">
      <h1 className=" text-4xl text-center mb-8">Meet Your Next Movie</h1>
      <div className="tabs justify-center ">
        {TabData.map((list, idx) => {
          return (
            <div
              key={idx}
              className={`tab font-semibold mr-2.5 text-lg	${
                activeTab === idx
                  ? ' bg-white border-2 border-solid border-mkOrange rounded-lg text-black'
                  : ''
              }`}
              onClick={() => tabClickHandler(idx)}
            >
              {list.title}
            </div>
          );
        })}
      </div>
      <div className=" tabContent h-auto grid grid-rows-2 grid-flow-col gap-x-16 gap-y-10  p-10 ">
        {TabData[activeTab].content.map((item: any) => {
          return (
            <div key={item.id} className=" px-2 mb-5 ">
              <img src={item} alt="poster" className="w-fit h-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
