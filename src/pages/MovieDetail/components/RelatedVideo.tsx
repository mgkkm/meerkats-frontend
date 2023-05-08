import React, { useEffect, useState } from 'react';
import { PlaylistYoutubeData } from '../MovieDetail';
import ModalPlayer from './ModalPlayer';

interface relatedVideoDataProps {
  relatedVideoData?: PlaylistYoutubeData;
}

export default function RelatedVideo({
  relatedVideoData,
}: relatedVideoDataProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTop, setModalTop] = useState(0);

  const { videoId, title, channel, thumbnail, viewCount, publishedAt } =
    relatedVideoData ?? {};

  useEffect(() => {
    if (isModalOpen) {
      setModalTop(window.scrollY);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isModalOpen]);

  const viewCountFormat = (viewCount: string) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(viewCount));
  };

  return (
    <div className="flex items-center h-28" key={videoId}>
      <div className="h-[96px] w-[168px] relative">
        <img src={thumbnail} alt="thumbnail" className="w-full h-full" />
        <div
          className="h-full w-full bg-black absolute top-0 opacity-10 hover:opacity-50 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {isModalOpen && (
        <ModalPlayer
          videoId={videoId}
          setIsModalOpen={setIsModalOpen}
          modalTop={modalTop}
        />
      )}
      <div className="px-3 w-[78%] lg:w-[259px]">
        <p
          className="font-semibold h-12 overflow-hidden text-ellipsis line-clamp-2 hover:underline hover:underline-offset-4 hover:cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {title}
        </p>
        <p className="text-sm mt-1.5">{channel}</p>
        <span className="text-xs">
          {viewCount && `조회수 ${viewCountFormat(viewCount)}`}
        </span>
        <span className="px-2 text-xs">{publishedAt?.split('T')[0]}</span>
      </div>
    </div>
  );
}
