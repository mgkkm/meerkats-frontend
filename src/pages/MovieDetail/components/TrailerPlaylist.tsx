import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistYoutubeState } from '../../../recoil/MovieDetailState';
import RelatedVideo from './RelatedVideo';

export default function TrailerPlaylist() {
  const playlistYoutubeData = useRecoilValue(playlistYoutubeState);

  return (
    <div className="flex-row lg:w-[427px] max-lg:px-5">
      {playlistYoutubeData.map(relatedVideoData => {
        return (
          <RelatedVideo
            key={relatedVideoData.videoId}
            relatedVideoData={relatedVideoData}
          />
        );
      })}
    </div>
  );
}
