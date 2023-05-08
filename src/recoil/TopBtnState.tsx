import { atom } from 'recoil';

export const topBtnState = atom<boolean>({
  key: 'topBtnState',
  default: true,
});
