import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface MoviePlayerProps {
  videoId?: string;
  height: string;
  autoplay: number;
}

export default function MoviePlayer({
  videoId,
  height,
  autoplay,
}: MoviePlayerProps) {
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: height,
    playerVars: {
      autoplay: autoplay,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}
