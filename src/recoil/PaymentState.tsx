import { atom, atomFamily } from 'recoil';

export const subscriptionIdState = atom({
  key: 'subscriptionIdState',
  default: 0,
});

export const paymentInputState = atomFamily<string, number>({
  key: 'paymentInputState',
  default: '',
});
