import { atom } from 'recoil';
import {
  MovieBlogData,
  MovieHeaderData,
  PlaylistYoutubeData,
} from '../pages/MovieDetail/MovieDetail';

export const movieHeaderState = atom<MovieHeaderData>({
  key: 'movieHeaderState',
  default: {
    category: {
      id: 0,
      name: '',
    },
    release_date: '',
    name: '',
    english_name: '',
    summary: '',
    director: '',
    actor: '',
    rating: { id: 0, name: '' },
    running_time: '',
    region: {
      id: 0,
      name: '',
    },
    movieLikesCount: 0,
    isLikedByThisUser: false,
  },
});

export const movieBlogState = atom<MovieBlogData[]>({
  key: 'movieBlogState',
  default: [
    {
      id: 0,
      user: {
        id: 0,
        nickname: '',
      },
      title: '',
      content: '',
      thumbnail: '',
      created_at: '',
      weeklyLikeCount: 0,
      blogLikes: 0,
      blogScrap: 0,
    },
  ],
});

export const playlistYoutubeState = atom<PlaylistYoutubeData[]>({
  key: 'playlistYoutubeState',
  default: undefined,
});
