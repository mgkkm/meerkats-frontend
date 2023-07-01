import React, { ReactNode, useEffect } from 'react';
import TopBtn from '../TopButton/TopBtn';
import { useLocation } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { blogInputState } from '../../recoil/BlogPostState';
import { navSearchDataState } from '../../recoil/SearchDataState';
import { toggleSelector } from '../../recoil/ToggleState';
import { navSearchState } from '../../recoil/SearchState';

type ScrollPorps = {
  scrollHandler: (e: React.WheelEvent<HTMLDivElement>) => void;
};

export default function ContentContainer({
  children,
  scrollHandler,
}: {
  children: ReactNode;
} & ScrollPorps) {
  const location = useLocation();
  const setInputContent = useSetRecoilState(blogInputState);
  const setSearchInput = useSetRecoilState(navSearchState);
  const resetSearchData = useResetRecoilState(navSearchDataState);

  useEffect(() => {
    window.scrollTo(0, 0);
    setInputContent('');
    setSearchInput(false);
    resetSearchData();
  }, [location]);

  return (
    <div
      className="h-auto relative pb-16 sm:pb-28"
      onWheel={scrollHandler}
      onClick={() => setSearchInput(false)}
    >
      {children}
      <TopBtn />
    </div>
  );
}
