import { useState } from 'react';
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
      <div className="flex justify-center items-start xs:mb-5 sm:mb-10 xl:mb-20">
        <img
          src="/images/logo_b.png"
          alt="logo"
          className="xs:h-[22px] sm:h-[26px] xl:h-[34px]"
        />
        <h1 className="text-center font-semibold tracking-tight xs:text-lg sm:text-2xl xl:text-4xl">
          &nbsp;에서 상영 예정작을 만나보세요!
        </h1>
      </div>
      <div className="tabs justify-center gap-x-5">
        {TAB_DATA.map((list, idx) => {
          return (
            <div
              key={idx}
              className={`tab w-48 font-semibold text-xl h-10 mr-5 mb-8 xs:w-20 max-sm:text-[10px] xs:h-8 xs:ml-3 sm:w-28 sm:text-xs md:w-36 md:text-sm ${
                activeTab === idx
                  ? ' bg-white border-4 border-solid border-mkOrange text-black rounded'
                  : 'hover:border-4 border-solid border-mkGray rounded xs:text-[10px]'
              }`}
              onClick={() => tabClickHandler(idx)}
            >
              {list.title}
            </div>
          );
        })}
      </div>
      <div className="tabContent w-fit m-auto flex flex-wrap justify-around overflow-hidden xs:h-[245px] sm:h-[390px] md:h-[480px] xl:h-fit">
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
