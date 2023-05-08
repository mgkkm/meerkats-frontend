import React, { useEffect, useRef } from 'react';
import MoviePlayer from './MoviePlayer';

interface ModalPlayerProps {
  videoId: string | undefined;
  setIsModalOpen: Function;
  modalTop: number;
}

export default function ModalPlayer({
  videoId,
  setIsModalOpen,
  modalTop,
}: ModalPlayerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const escEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', escEvent);
    return () => window.removeEventListener('keydown', escEvent);
  }, [setIsModalOpen]);

  return (
    <div
      className="w-full h-screen z-50 left-0 absolute flex justify-center items-center"
      style={{ top: `${modalTop}px` }}
    >
      <div
        className="w-full h-full bg-black opacity-60 relative"
        ref={modalRef}
        onClick={modalOutsideClick}
      />
      <div className="w-3/4 h-[630px] absolute" tabIndex={0}>
        <MoviePlayer videoId={videoId} height="630" autoplay={1} />
      </div>
    </div>
  );
}
