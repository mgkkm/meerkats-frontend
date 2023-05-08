import { atom } from 'recoil';

export const UserInputState = atom({
  key: 'UserInputState',
  default: {
    email: '',
    password: '',
    certifiNumber: '',
    nickname: '',
  },
});
