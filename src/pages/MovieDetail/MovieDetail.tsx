import React, { useEffect, useState, useRef } from 'react';
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
import { CommentData, commentState } from '../../recoil/CommentState';
import {
  currentUserIdState,
  currentUserNicknameState,
} from '../../recoil/JwtDecode';
import { DecodeToken } from '../../components/DecodeToken/DecodeToken';

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
    andMore: {
      movieTrailerComments: CommentData[];
      blogLikesAndPopularitySorting: MovieBlogData[];
    };
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

  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const setMovieHeaderData = useSetRecoilState(movieHeaderState);
  const setMovieCommentData = useSetRecoilState(commentState('movie'));
  const setMovieBlogData = useSetRecoilState(movieBlogState);
  const [mainVideoId, setMainVideoId] = useState('');
  const setPlaylistYoutubeData = useSetRecoilState(playlistYoutubeState);
  const setIsMovieLiked = useSetRecoilState(
    toggleSelector(`movieLike${postId}`)
  );

  const resetMovieHeaderState = useResetRecoilState(movieHeaderState);
  const resetMovieCommentState = useResetRecoilState(commentState('movie'));
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
        setMovieCommentData(andMore.movieTrailerComments);
        setMovieBlogData(andMore.blogLikesAndPopularitySorting);
        setMainVideoId(mainYoutube.videoId);
        setPlaylistYoutubeData(playlistYoutube);
        setIsMovieLiked(movieInfo.isLikedByThisUser);
        DecodeToken(setCurrentId, setCurrentNickname);
      }
    });

    return () => {
      resetMovieHeaderState();
      resetMovieCommentState();
      resetMovieBlogState();
      setMainVideoId('');
      resetPlaylistYoutubeState();
      resetIsMovieLiked();
    };
  }, []);

  return (
    <div className="container xl pt-24">
      <div className="h-[630px] w-full">
        <MoviePlayer videoId={mainVideoId} height="630" autoplay={1} />
      </div>
      <div className="lg:flex justify-around gap-5 mt-5">
        <div className="movieDetailLeft w-full lg:w-2/3 max-lg:mb-24">
          <MovieDetailHeader />
          <MovieDetailTab />
        </div>
        <TrailerPlaylist />
      </div>
    </div>
  );
}
