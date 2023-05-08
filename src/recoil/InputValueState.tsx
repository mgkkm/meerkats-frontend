import { atom } from 'recoil';

export const InputValueState = atom({
  key: 'inputValueState',
  default: {
    id: '',
    pw: '',
  },
});
