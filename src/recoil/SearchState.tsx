import { atom } from 'recoil';

export const searchState = atom({
  key: 'searchState',
  default: false,
});

export const navSearchState = atom({
  key: 'navSearchState',
  default: false,
});
