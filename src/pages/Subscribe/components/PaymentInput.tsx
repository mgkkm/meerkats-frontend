import React from 'react';
import { useSetRecoilState } from 'recoil';
import { paymentInputState } from '../../../recoil/PaymentState';
import { PaymentDetail } from './PaymentInfo';

interface PaymentInputProps {
  item: PaymentDetail;
}

export default function PaymentInput({ item }: PaymentInputProps) {
  const { id, detail, placeholder, width } = item;

  const setPaymentInput = useSetRecoilState(paymentInputState(id));

  return (
    <div key={id}>
      <p>{detail}</p>
      <input
        className={`w-${width} focus:outline-none focus:border-b-black border-[1.5px] border-x-transparent border-t-transparent border-b-mkLightGray mt-1 mb-5 placeholder:text-base`}
        type="input"
        placeholder={placeholder}
        onChange={e => {
          setPaymentInput(e.target.value);
        }}
      />
    </div>
  );
}
