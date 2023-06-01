import { AxiosError } from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { successAlert, warningAlert } from '../../../components/Alert/Modal';
import useAxios from '../../../hooks/useAxios';
import {
  paymentInputState,
  paymentMethodState,
  subscriptionIdState,
  validInputState,
} from '../../../recoil/PaymentState';

export default function SubscribeBtn() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = sessionStorage.getItem('token');
  const [loading, error, data, fetchData] = useAxios();

  const subscriptionId = useRecoilValue(subscriptionIdState);
  const paymentMethodId = useRecoilValue(paymentMethodState);
  const paymentInput = useRecoilValue(paymentInputState);

  const { cardNumber, nameOnCard, expiryDate, dateOfBirth, email } =
    paymentInput;

  const cardExpirationYear = expiryDate.slice(2, 4);
  const cardExpirationMonth = expiryDate.slice(0, 2);

  const allValid = useRecoilValue(validInputState);
  const isAllValid = Object.values(allValid).every(value => value === true);

  const paymentRequest = () => {
    fetchData({
      url: `${BASE_URL}/payment/toss`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
      data: {
        membershipId: subscriptionId,
        paymentMethodId: paymentMethodId,
        cardNumber: cardNumber,
        paymentOwner: nameOnCard,
        cardExpirationYear: cardExpirationYear,
        cardExpirationMonth: cardExpirationMonth,
        customerIdentityNumber: dateOfBirth,
        customerEmail: email,
      },
    }).then((result: any) => {
      if (result.message.includes('failed')) {
        warningAlert('Wait!', result.response.data.message);
      } else {
        successAlert('Success!', result.message);
      }
    });
  };

  return (
    <button
      className="btn bg-mkOrange border-none hover:bg-mkDarkOrange hover:border-none"
      onClick={() => paymentRequest()}
      disabled={!isAllValid}
    >
      SUBSCRIBE
    </button>
  );
}
