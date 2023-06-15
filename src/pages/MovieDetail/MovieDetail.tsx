import React, { useEffect, useRef, useState } from 'react';
import MoviePlayer from './components/MoviePlayer';
import MovieDetailHeader from './components/MovieDetailHeader';
import MovieDetailTab from './components/MovieDetailTab';
import TrailerPlaylist from './components/TrailerPlaylist';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../recoil/ToggleState';
import {
  movieHeaderState,
  movieBlogState,
  playlistYoutubeState,
} from '../../recoil/MovieDetailState';
import {
  currentUserIdState,
  currentUserNicknameState,
} from '../../recoil/JwtDecode';
import { DecodeToken } from '../../components/DecodeToken/DecodeToken';
import { MoviePlayerSkeleton } from '../../components/Skeleton/MovieDetailSkeleton';
import YouTube from 'react-youtube';

export interface MovieHeaderData {
  category: {
    id: number;
    name: string;
  };
  release_date: string;
  name: string;
  english_name: string;
  summary: string;
  director: string;
  actor: string;
  rating: { id: number; name: string };
  running_time: string;
  region: {
    id: number;
    name: string;
  };
  movieLikesCount: number;
  isLikedByThisUser: boolean;
}

export interface MovieBlogData {
  id: number;
  user: {
    id: number;
    nickname: string;
  };
  title: string;
  content: string;
  thumbnail: string;
  created_at: string;
  weeklyLikeCount: number;
  blogLikes: number;
  blogScrap: number;
}

interface MainYoutubeData {
  videoId: string;
}

export interface PlaylistYoutubeData extends MainYoutubeData {
  title: string;
  channel: string;
  thumbnail: string;
  viewCount: string;
  publishedAt: string;
}

interface MovieDetailData {
  data: {
    movieInfo: MovieHeaderData;
    andMore: MovieBlogData[];
    mainYoutube: MainYoutubeData;
    playlistYoutube: PlaylistYoutubeData[];
  };
}

export default function MovieDetail() {
  const params = useParams();
  const postId = params.id;

  const token = sessionStorage.getItem('token');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [loading, error, data, fetchData] = useAxios();
  const [playerHeight, setPlayerHeight] = useState('');
  const playerRef = useRef<YouTube>(null);

  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const setMovieHeaderData = useSetRecoilState(movieHeaderState);
  const setMovieBlogData = useSetRecoilState(movieBlogState);
  const [mainVideoId, setMainVideoId] = useState('');
  const setPlaylistYoutubeData = useSetRecoilState(playlistYoutubeState);
  const setIsMovieLiked = useSetRecoilState(
    toggleSelector(`movieLike${postId}`)
  );

  const resetMovieHeaderState = useResetRecoilState(movieHeaderState);
  const resetMovieBlogState = useResetRecoilState(movieBlogState);
  const resetPlaylistYoutubeState = useResetRecoilState(playlistYoutubeState);
  const resetIsMovieLiked = useResetRecoilState(
    toggleSelector(`movieLike${postId}`)
  );

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/movie/${postId}?skip=0&take=10`,
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
    }).then((result: MovieDetailData) => {
      if (result) {
        const { movieInfo, andMore, mainYoutube, playlistYoutube } =
          result.data;
        setMovieHeaderData(movieInfo);
        setMovieBlogData(andMore);
        setMainVideoId(mainYoutube.videoId);
        setPlaylistYoutubeData(playlistYoutube);
        setIsMovieLiked(movieInfo.isLikedByThisUser);
        DecodeToken(setCurrentId, setCurrentNickname);
      }
    });

    return () => {
      resetMovieHeaderState();
      resetMovieBlogState();
      setMainVideoId('');
      resetPlaylistYoutubeState();
      resetIsMovieLiked();
    };
  }, [postId]);

  useEffect(() => {
    const handleHeight = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setPlayerHeight('350');
      } else if (screenWidth >= 640 && screenWidth < 1024) {
        setPlayerHeight('550');
      } else {
        setPlayerHeight('630');
      }
    };
    handleHeight();

    window.addEventListener('resize', handleHeight);

    return () => {
      window.removeEventListener('resize', handleHeight);
    };
  }, []);

  return (
    <div className="container xl pt-24">
      {loading || !mainVideoId ? (
        <MoviePlayerSkeleton height={playerHeight} />
      ) : (
        <div className="w-full">
          <MoviePlayer
            videoId={mainVideoId}
            height={playerHeight}
            autoplay={1}
            playerRef={playerRef}
          />
        </div>
      )}
      <div className="lg:flex justify-around gap-5 mt-5">
        <div className="movieDetailLeft w-full lg:w-2/3 max-lg:mb-24">
          <MovieDetailHeader />
          <MovieDetailTab />
        </div>
        <TrailerPlaylist loading={loading} playerRef={playerRef} />
      </div>
    </div>
  );
}
