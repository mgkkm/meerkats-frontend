import { atom } from 'recoil';

export const SearchDataState = atom<any>({
  key: 'SearchDataState',
  default: [],
});

export const navSearchDataState = atom<any>({
  key: 'navSearchDataState',
  default: [],
});
