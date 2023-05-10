import React, { ReactNode, useEffect } from 'react';
import TopBtn from '../TopButton/TopBtn';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { blogInputState } from '../../recoil/BlogPostState';

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

  useEffect(() => {
    window.scrollTo(0, 0);
    setInputContent('');
  }, [location]);

  return (
    <div className=" h-auto relative pb-28" onWheel={scrollHandler}>
      {children}
      <TopBtn />
    </div>
  );
}
