import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { MoviePlayerHeight } from '../../../components/Skeleton/MovieDetailSkeleton';

export interface MoviePlayerProps extends MoviePlayerHeight {
  videoId?: string;
  autoplay: number;
  playerRef?: React.RefObject<YouTube>;
}

export default function MoviePlayer({
  videoId,
  height,
  playerRef,
}: MoviePlayerProps) {
  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: height,
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} ref={playerRef} />;
}
