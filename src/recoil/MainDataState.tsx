import { atom } from 'recoil';

export const mainDataState = atom({
  key: 'mainDataState',
  default: [
    {
      bestMovie: [],
      foreignMovieWithLikes: [],
      koreanMovieWithLikes: [],
      latestMovie: [],
    },
  ],
});
