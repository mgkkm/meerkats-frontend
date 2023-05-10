import { atom } from 'recoil';

export const currentUserIdState = atom<number>({
  key: 'currentUserIdState',
  default: 0,
});

export const currentUserNicknameState = atom<string>({
  key: 'currentUserNicknameState',
  default: '',
});
