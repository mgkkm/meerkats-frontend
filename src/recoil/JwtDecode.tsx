import { atom } from 'recoil';

export const currentUserIdState = atom<number | null>({
  key: 'currentUserIdState',
  default: 0,
});

export const currentUserNicknameState = atom<string | null>({
  key: 'currentUserNicknameState',
  default: '',
});
