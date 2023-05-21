import React, { useEffect, useRef } from 'react';
import MoviePlayer from './MoviePlayer';
import { GrClose } from 'react-icons/gr';

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
    document.addEventListener('keydown', escEvent);
    return () => document.removeEventListener('keydown', escEvent);
  }, [setIsModalOpen]);

  return (
    <div
      className="w-full h-screen z-50 left-0 absolute flex justify-center items-center"
      style={{ top: `${modalTop}px` }}
    >
      <GrClose
        className="text-4xl absolute right-5 top-5 hover:cursor-pointer z-50"
        onClick={() => setIsModalOpen(false)}
      />
      <div
        className="w-full h-full bg-black opacity-60 relative"
        ref={modalRef}
        onClick={modalOutsideClick}
      />
      <div className="w-full sm:w-3/4 absolute" tabIndex={0}>
        <MoviePlayer videoId={videoId} height="630" autoplay={1} />
      </div>
    </div>
  );
}
