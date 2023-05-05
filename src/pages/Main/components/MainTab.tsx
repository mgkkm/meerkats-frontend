import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { mainDataState } from '../../../recoil/MainDataState';
import TabItems from './TabItems';

export default function MainTab() {
  const [activeTab, setActiveTab] = useState(0);
  const mainData = useRecoilValue(mainDataState);

  const TABDATA = [
    {
      id: 1,
      title: 'NEW',
      content: mainData[0].latestMovie,
    },
    {
      id: 2,
      title: 'INTERNATIONAL',
      content: mainData[0].foreignMovieWithLikes,
    },
    {
      id: 3,
      title: 'KOREAN',
      content: mainData[0].koreanMovieWithLikes,
    },
  ];

  const tabClickHandler = (idx: number) => setActiveTab(idx);

  return (
    <div className="container xl">
      <h1 className=" text-4xl text-center mb-20 font-[ChosunGs]">
        Meet Your Next Movie
      </h1>
      <div className="tabs justify-center">
        {TABDATA.map((list, idx) => {
          return (
            <div
              key={idx}
              className={`tab font-semibold text-lg w-52 h-10 mr-5 mb-8	${
                activeTab === idx
                  ? ' bg-white border-4 border-solid border-mkOrange text-black rounded'
                  : 'hover:border-4 border-solid border-mkGray rounded'
              }`}
              onClick={() => tabClickHandler(idx)}
            >
              {list.title}
            </div>
          );
        })}
      </div>
      <div className=" tabContent h-[830px] flex flex-wrap justify-around overflow-hidden">
        {TABDATA[activeTab].content.map((item: never[], idx) => {
          return <TabItems key={idx} item={item} />;
        })}
      </div>
    </div>
  );
}
