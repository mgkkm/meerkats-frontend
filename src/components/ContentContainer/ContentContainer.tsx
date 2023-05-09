import React, { ReactNode, useEffect } from 'react';
import TopBtn from '../TopButton/TopBtn';
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className=" h-auto relative pb-28" onWheel={scrollHandler}>
      {children}
      <TopBtn />
    </div>
  );
}
