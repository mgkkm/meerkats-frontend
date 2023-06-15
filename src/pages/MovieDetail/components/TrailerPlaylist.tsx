import React from 'react';
import YouTube from 'react-youtube';
import { useRecoilValue } from 'recoil';
import { PlaylistSkeleton } from '../../../components/Skeleton/MovieDetailSkeleton';
import { playlistYoutubeState } from '../../../recoil/MovieDetailState';
import RelatedVideo from './RelatedVideo';

interface trailerPlaylistProps {
  loading: boolean;
  playerRef: React.RefObject<YouTube>;
}

export default function TrailerPlaylist({
  loading,
  playerRef,
}: trailerPlaylistProps) {
  const playlistYoutubeData = useRecoilValue(playlistYoutubeState);

  const playlistSkeletons = Array.from({ length: 10 }, (_, index) => (
    <PlaylistSkeleton key={index} />
  ));

  return (
    <div className="flex-row lg:w-[427px] max-lg:px-5">
      {loading || !playlistYoutubeData
        ? playlistSkeletons
        : playlistYoutubeData.map(relatedVideoData => (
            <RelatedVideo
              key={relatedVideoData.videoId}
              relatedVideoData={relatedVideoData}
              playerRef={playerRef}
            />
          ))}
    </div>
  );
}
