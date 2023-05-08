import { atom } from 'recoil';

export const userInputState = atom({
  key: 'userInputState',
  default: {
    email: '',
    password: '',
    certifiNumber: '',
    nickname: '',
  },
});
