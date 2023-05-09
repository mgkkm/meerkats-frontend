import { atom, atomFamily } from 'recoil';

export const subscriptionTypeState = atom({
  key: 'subscriptionTypeState',
  default: '',
});

export const subscriptionFeeState = atom({
  key: 'subscriptionFeeState',
  default: 0,
});

export const paymentInputState = atomFamily<string, number>({
  key: 'paymentInputState',
  default: '',
});

export const paymentResponseState = atomFamily<string | {}, string>({
  key: 'paymentResponseState',
  default: '',
});
