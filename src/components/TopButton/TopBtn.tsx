import React from 'react';
import { useRecoilState } from 'recoil';
import { topBtnState } from '../../recoil/TopBtnState';

export default function TopBtn() {
  const [hide] = useRecoilState(topBtnState);
  const scrollToTop = (e: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        hide ? 'opacity-0' : 'opacity-100'
      } btn rounded-none bg-mkLightGray border-mkLightGray hover:bg-mkGray hover:border-mkGray fixed bottom-10 right-16 z-50 max-md:hidden`}
    >
      <i className="fa-solid fa-angle-up text-xl text-white" />
    </button>
  );
}
