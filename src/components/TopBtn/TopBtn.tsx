import React from 'react';

export default function TopBtn() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="btn  rounded-none bg-mkLightGray border-mkLightGray hover:bg-mkGray hover:border-mkGray fixed bottom-10 right-16"
    >
      <i className="fa-solid fa-angle-up text-xl text-white" />
    </button>
  );
}
