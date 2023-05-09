import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { successAlert, warningAlert } from '../../../components/Alert/Modal';
import useAxios from '../../../hooks/useAxios';
import {
  paymentInputState,
  paymentResponseState,
  subscriptionFeeState,
  subscriptionTypeState,
} from '../../../recoil/PaymentState';

export default function SubscribeBtn() {
  const [loading, error, data, fetchData] = useAxios();

  // const customerKey = useRecoilValue(paymentInputState(0));
  const customerKey = 'BeAmbitious';

  const subscriptionType = useRecoilValue(subscriptionTypeState);
  const subscriptionFee = useRecoilValue(subscriptionFeeState);

  const cardNumber = useRecoilValue(paymentInputState(1));

  const expiryDate = useRecoilValue(paymentInputState(3));
  const cardExpirationMonth = expiryDate?.match(/.{1,2}/g)?.[0];
  const cardExpirationYear = expiryDate?.match(/.{1,2}/g)?.[1];

  const customerIdentityNumber = useRecoilValue(paymentInputState(4));
  const customerEmail = useRecoilValue(paymentInputState(5));

  const [userBillingKey, setUserBillingKey] = useRecoilState(
    paymentResponseState('billingKey')
  );

  const setPaymentStartDate = useSetRecoilState(
    paymentResponseState('approvedAt')
  );

  const setCardInfo = useSetRecoilState(paymentResponseState('card'));
  const setPaymentKey = useSetRecoilState(paymentResponseState('paymentKey'));

  const orderId = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const dateString = year + '-' + month + '-' + day;

    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const timeString = hours + ':' + minutes + ':' + seconds;

    return dateString + '_' + timeString;
  };

  orderId();

  const billingKeyRequest = () => {
    fetchData({
      url: 'https://api.tosspayments.com/v1/billing/authorizations/card',
      method: 'POST',
      headers: {
        Authorization:
          'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
        'Content-Type': 'application/json',
      },
      data: {
        customerKey: customerKey,
        cardNumber: cardNumber,
        cardExpirationMonth: cardExpirationMonth,
        cardExpirationYear: cardExpirationYear,
        customerIdentityNumber: customerIdentityNumber,
        customerEmail: customerEmail,
      },
    }).then((result: any) => {
      if (result && result.billingKey) {
        console.log(result);
        setUserBillingKey(result.billingKey);
        fetchData({
          method: 'POST',
          url: `https://api.tosspayments.com/v1/billing/${userBillingKey}`,
          headers: {
            Authorization:
              'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            'Content-Type': 'application/json',
          },
          data: {
            customerKey: customerKey,
            amount: subscriptionFee,
            orderId: orderId(),
            orderName: `${subscriptionType} Membership Subscription`,
          },
        }).then((result: any) => {
          if (result && result.status === 'DONE') {
            setPaymentStartDate(result.approvedAt);
            setCardInfo(result.card);
            setPaymentKey(result.paymentKey);
            successAlert('Success!', '결제가 완료되었습니다.');
          } else {
            warningAlert('Wait!', result.response.data.message);
          }
        });
      } else {
        warningAlert('Wait!', result.response.data.message);
      }
    });
  };

  return (
    <button
      className="btn bg-mkOrange border-none hover:bg-mkDarkOrange hover:border-none"
      onClick={() => billingKeyRequest()}
    >
      SUBSCRIBE
    </button>
  );
}
