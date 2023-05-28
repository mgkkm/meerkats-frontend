import { atom } from 'recoil';
import { PaymentInputData } from '../pages/Subscribe/components/PaymentInput';

export const subscriptionIdState = atom({
  key: 'subscriptionIdState',
  default: 0,
});

export const paymentMethodState = atom<undefined | number>({
  key: 'paymentMethodState',
  default: undefined,
});

export const paymentInputState = atom<PaymentInputData>({
  key: 'paymentInputState',
  default: {
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    dateOfBirth: '',
    email: '',
  },
});

export const validInputState = atom({
  key: 'validInputState',
  default: {
    method: false,
    cardNumber: false,
    nameOnCard: false,
    expiryDate: false,
    dateOfBirth: false,
    email: false,
    autoRenewAgreement: false,
  },
});
