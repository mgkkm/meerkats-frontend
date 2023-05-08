import { atom } from 'recoil';

export const currentUserState = atom<number | null>({
  key: 'currentUserState',
  default: 2,
});
