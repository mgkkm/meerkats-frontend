import React, { ReactNode } from 'react';
import TopBtn from '../TopBtn/TopBtn';

type ScrollPorps = {
  scrollHandler: (e: React.WheelEvent<HTMLDivElement>) => void;
};

export default function ContentContainer({
  children,
  scrollHandler,
}: {
  children: ReactNode;
} & ScrollPorps) {
  return (
    <div className=" h-screen relative pb-28" onWheel={scrollHandler}>
      {children}
      <TopBtn />
    </div>
  );
}
