import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { mainDataState } from '../../../recoil/MainDataState';
import TabItems from './TabItems';

export default function MainTab() {
  const [activeTab, setActiveTab] = useState(0);
  const mainData = useRecoilValue(mainDataState);

  let content;
  if (activeTab === 0) {
    content = mainData[0].latestMovie;
  } else if (activeTab === 1) {
    content = mainData[0].foreignMovieWithLikes;
  } else if (activeTab === 2) {
    content = mainData[0].koreanMovieWithLikes;
  }

  const tabClickHandler = (idx: number) => setActiveTab(idx);

  return (
    <div className="container xl">
      <h1 className=" text-3xl text-center mb-20 font-[ChosunGs]">
        Meet Your Next Movie
      </h1>
      <div className="tabs justify-center">
        {TAB_DATA.map((list, idx) => {
          return (
            <div
              key={idx}
              className={`tab font-semibold text-base w-48 h-10 mr-5 mb-8	${
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
      <div className=" tabContent m-auto w-[1400px] h-[830px] flex flex-wrap justify-around overflow-hidden">
        {content !== undefined &&
          content.map((item, idx) => {
            return <TabItems key={idx} item={item} />;
          })}
      </div>
    </div>
  );
}

const TAB_DATA = [
  {
    id: 1,
    title: 'NEW',
  },
  {
    id: 2,
    title: 'INTERNATIONAL',
  },
  {
    id: 3,
    title: 'KOREAN',
  },
];
