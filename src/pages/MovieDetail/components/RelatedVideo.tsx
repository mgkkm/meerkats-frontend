import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { PlaylistYoutubeData } from '../MovieDetail';
import ModalPlayer from './ModalPlayer';

interface relatedVideoDataProps {
  relatedVideoData?: PlaylistYoutubeData;
  playerRef: React.RefObject<YouTube>;
}

export default function RelatedVideo({
  relatedVideoData,
  playerRef,
}: relatedVideoDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTop, setModalTop] = useState(0);

  const { videoId, title, channel, thumbnail, viewCount, publishedAt } =
    relatedVideoData ?? {};

  const viewCountFormat = (viewCount: string) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(Number(viewCount));
  };

  const pauseMainVideo = () => {
    playerRef.current?.internalPlayer.pauseVideo();
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      setModalTop(window.scrollY);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isModalOpen]);

  return (
    <div className="flex items-center h-28" key={videoId}>
      <div className="w-[168px] h-[96px] relative">
        <img src={thumbnail} alt="thumbnail" className="w-full h-full" />
        <div
          className="w-full h-full bg-black absolute top-0 opacity-10 hover:opacity-50 hover:cursor-pointer"
          onClick={pauseMainVideo}
        />
      </div>
      {isModalOpen && (
        <ModalPlayer
          videoId={videoId}
          setIsModalOpen={setIsModalOpen}
          modalTop={modalTop}
        />
      )}
      <div className="px-3 w-[78%] h-[96px] lg:w-[259px]">
        <p
          className="font-semibold overflow-hidden text-ellipsis line-clamp-2 hover:underline hover:underline-offset-4 hover:cursor-pointer"
          onClick={pauseMainVideo}
        >
          {title}
        </p>
        <p className="text-sm mt-1.5">{channel}</p>
        {viewCount && (
          <span className="text-xs mr-2">
            조회 {viewCountFormat(viewCount)}
          </span>
        )}
        <span className="text-xs">{publishedAt?.split('T')[0]}</span>
      </div>
    </div>
  );
}
