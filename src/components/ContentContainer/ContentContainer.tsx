import React, { ReactNode } from 'react';
// import TopBtn from '../TopBtn/TopBtn';

type ScrollPorps = {
  scrollHandler: (e: any) => void;
};

export default function ContentContainer({
  children,
  scrollHandler,
}: {
  children: ReactNode;
} & ScrollPorps) {
  return (
    <div className=" h-auto relative pb-28" onWheel={scrollHandler}>
      {children}
      {/* <TopBtn /> */}
    </div>
  );
}
