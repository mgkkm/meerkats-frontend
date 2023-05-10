import React, { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { playerRefState } from '../../../recoil/MovieDetailState';

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
  const playerRef = useRef(null);

  const onModalPlayerReady: YouTubeProps['onReady'] = event => {
    playerRef.current = event.target;
  };

  console.log('ref ref ref', playerRef);

  const [currentPlayerRef, setCurrentPlayerRef] =
    useRecoilState(playerRefState);

  setCurrentPlayerRef(playerRef.current);

  console.log('next', currentPlayerRef);

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: height,
    playerVars: {
      autoplay: autoplay,
      modestbranding: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onModalPlayerReady} />;
}
