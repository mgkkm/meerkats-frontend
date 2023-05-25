import React from 'react';
import { useRecoilValue } from 'recoil';
import { successAlert, warningAlert } from '../../../components/Alert/Modal';
import useAxios from '../../../hooks/useAxios';
import {
  paymentInputState,
  subscriptionIdState,
} from '../../../recoil/PaymentState';

export default function SubscribeBtn() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = sessionStorage.getItem('token');
  const [loading, error, data, fetchData] = useAxios();

  const subscriptionId = useRecoilValue(subscriptionIdState);

  const cardNumber = useRecoilValue(paymentInputState(1));

  const expiryDate = useRecoilValue(paymentInputState(3));
  const cardExpirationYear = expiryDate?.match(/.{1,2}/g)?.[1];
  const cardExpirationMonth = expiryDate?.match(/.{1,2}/g)?.[0];

  const customerIdentityNumber = useRecoilValue(paymentInputState(4));
  const customerEmail = useRecoilValue(paymentInputState(5));

  const paymentRequest = () => {
    fetchData({
      url: `${BASE_URL}/payment/toss`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
      data: {
        membershipId: subscriptionId,
        cardNumber: cardNumber,
        cardExpirationYear: cardExpirationYear,
        cardExpirationMonth: cardExpirationMonth,
        customerIdentityNumber: customerIdentityNumber,
        customerEmail: customerEmail,
      },
    }).then((result: any) => {
      if (result.message === 'SUCCESS') {
        successAlert('Success!', '결제가 완료되었습니다.');
      } else {
        warningAlert('Wait!', result.response.data.message);
      }
    });
  };

  return (
    <button
      className="btn bg-mkOrange border-none hover:bg-mkDarkOrange hover:border-none"
      onClick={() => paymentRequest()}
      disabled={!token}
    >
      SUBSCRIBE
    </button>
  );
}
