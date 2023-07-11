import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  paymentMethodState,
  validInputState,
} from '../../../recoil/PaymentState';
import PaymentInput from './PaymentInput';

export interface PaymentDetail {
  id: number;
  name: string;
  detail: string;
  placeholder: string;
  maxLength: number | undefined;
  invalidMessage: string;
  width: number;
}

export default function PaymentInfo() {
  const [paymentBox, setPaymentBox] = useState(false);
  const setPaymentMethod = useSetRecoilState(paymentMethodState);
  const [allValid, setAllValid] = useRecoilState(validInputState);
  const [selectedPayment, setSelectedPayment] = useState('카드 선택');

  const paymentHandler = (id: number, method: string) => {
    setPaymentBox(!paymentBox);
    setPaymentMethod(id);
    setSelectedPayment(method);
    setAllValid({ ...allValid, method: true });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xl font-semibold py-5">|&nbsp; 결제 수단</p>
        <div
          className="dropdown cursor-pointer"
          onClick={() => setPaymentBox(!paymentBox)}
        >
          <label
            tabIndex={0}
            className="btn w-64 text-black flex justify-between bg-white border border-mkLightGray hover:bg-white hover:border hover:border-mkLightGray cursor-pointer"
          >
            <p>{selectedPayment}</p>
            <img
              src="/images/blog/dropdown_arrow.png"
              alt="dropdown_arrow"
              className="w-3 ml-3"
            />
          </label>
          {paymentBox && (
            <ul
              tabIndex={0}
              className="dropdown-content menu w-64 p-2 shadow bg-base-100 rounded-box"
            >
              {PAYMENT_METHOD.map(item => {
                return (
                  <li
                    key={item.id}
                    className="text-sm cursor-pointer"
                    onClick={() => paymentHandler(item.id, item.method)}
                  >
                    <a className="active:bg-mkLightGray rounded-md">
                      {item.method}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold py-5">|&nbsp; 결제 정보</p>
        <div className="grid grid-cols-2 gap-x-14 sm:gap-x-32 items-center">
          {PAYMENT_DETAILS.map(item => {
            return <PaymentInput key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

const PAYMENT_DETAILS = [
  {
    id: 1,
    name: 'cardNumber',
    detail: '카드 번호',
    placeholder: '0000 0000 0000 0000',
    maxLength: 19,
    invalidMessage: '16자리 숫자를 입력해 주세요.',
    width: 52,
  },
  {
    id: 2,
    name: 'nameOnCard',
    detail: '카드 소유자',
    placeholder: '김미어캣츠',
    maxLength: undefined,
    invalidMessage: '이름을 정확히 입력해 주세요.',
    width: 40,
  },
  {
    id: 3,
    name: 'expiryDate',
    detail: '유효기간',
    placeholder: 'MM/YY',
    maxLength: 7,
    invalidMessage: '날짜를 형식에 맞게 입력해 주세요.',
    width: 16,
  },
  {
    id: 4,
    name: 'dateOfBirth',
    detail: '생년월일',
    placeholder: 'YYMMDD',
    maxLength: 6,
    invalidMessage: '날짜를 형식에 맞게 입력해 주세요.',
    width: 24,
  },
  {
    id: 5,
    name: 'email',
    detail: '이메일 주소',
    placeholder: 'example@gmail.com',
    maxLength: undefined,
    invalidMessage: '이메일 주소를 형식에 맞게 입력해 주세요.',
    width: 52,
  },
];

const PAYMENT_METHOD = [
  { id: 1, method: '신용카드' },
  { id: 2, method: '체크카드' },
];
