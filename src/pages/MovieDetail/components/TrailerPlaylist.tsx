import React from 'react';
import { useRecoilValue } from 'recoil';
import { PlaylistSkeleton } from '../../../components/Skeleton/MovieDetailSkeleton';
import { playlistYoutubeState } from '../../../recoil/MovieDetailState';
import RelatedVideo from './RelatedVideo';

export default function TrailerPlaylist({ loading }: { loading: boolean }) {
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
            />
          ))}
    </div>
  );
}
