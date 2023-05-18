import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { failedNavigateAlert } from '../../../components/Alert/Modal';
import { paymentInputState } from '../../../recoil/PaymentState';
import { PaymentDetail } from './PaymentInfo';

interface PaymentInputProps {
  item: PaymentDetail;
}

export default function PaymentInput({ item }: PaymentInputProps) {
  const token = sessionStorage.getItem('token');
  const { id, detail, placeholder, width } = item;
  const navigate = useNavigate();

  const setPaymentInput = useSetRecoilState(paymentInputState(id));

  const loginCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    if (input.readOnly && e.button === 0) {
      failedNavigateAlert(
        'Login Required',
        'Please login and try again.',
        '/login',
        navigate
      );
    }
  };

  return (
    <div className={`${id === 2 && 'max-sm:col-span-2'}`} key={id}>
      <p className="text-sm sm:text-base">{detail}</p>
      <input
        className={`w-${width} focus:outline-none focus:border-b-black border-[1.5px] border-x-transparent border-t-transparent border-b-mkLightGray mt-1 mb-5 placeholder:text-base`}
        type="input"
        placeholder={placeholder}
        onChange={e => {
          setPaymentInput(e.target.value);
        }}
        readOnly={!token}
        onClick={loginCheck}
      />
    </div>
  );
}
