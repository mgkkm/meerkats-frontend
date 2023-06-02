import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { failedNavigateAlert } from '../../../components/Alert/Modal';
import {
  paymentInputState,
  validInputState,
} from '../../../recoil/PaymentState';
import { PaymentDetail } from './PaymentInfo';

interface PaymentInputProps {
  item: PaymentDetail;
}

export interface PaymentInputData {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  dateOfBirth: string;
  email: string;
  [key: string]: string;
}

export default function PaymentInput({ item }: PaymentInputProps) {
  const token = sessionStorage.getItem('token');
  const { id, name, detail, placeholder, maxLength, invalidMessage, width } =
    item;
  const navigate = useNavigate();

  const [paymentInput, setPaymentInput] = useRecoilState(paymentInputState);
  const [paymentInputValue, setPaymentInputValue] = useState<PaymentInputData>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    dateOfBirth: '',
    email: '',
  });
  const [invalidMessageText, setInvalidMessageText] = useState('');
  const [allValid, setAllValid] = useRecoilState(validInputState);

  const isLoggedIn = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!token) {
      failedNavigateAlert(
        'Login Required',
        'Please login and try again.',
        '/login',
        navigate
      );
    }
  };

  const invalidResult = (type: string, invalidMessage: string) => {
    setInvalidMessageText(invalidMessage);
    setAllValid({ ...allValid, [type]: false });
  };

  const validResult = (type: string, cleanedInput: string) => {
    setInvalidMessageText('');
    setPaymentInput({ ...paymentInput, [type]: cleanedInput });
    setAllValid({ ...allValid, [type]: true });
  };

  const isValid = (type: string, input: string) => {
    if (type === 'cardNumber') {
      const cleanedInput = input.replace(/\s|\D/g, '');
      const formattedCardNumber = cleanedInput.replace(/(\d{4})(?=\d)/g, '$1 ');

      setPaymentInputValue({ ...paymentInput, [type]: formattedCardNumber });

      if (cleanedInput.length !== 16) {
        invalidResult(type, invalidMessage);
      } else {
        validResult(type, cleanedInput);
      }
    } else if (type === 'nameOnCard') {
      const cleanedInput = input.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');

      setPaymentInputValue({ ...paymentInput, [type]: cleanedInput });

      if (cleanedInput.length < 2) {
        invalidResult(type, invalidMessage);
      } else {
        validResult(type, cleanedInput);
      }
    } else if (type === 'expiryDate') {
      const cleanedInput = input.replace(/\s|\D/g, '');
      const formattedExpiryDate = cleanedInput.replace(
        /(\d{2})(?=\d)/g,
        '$1 / '
      );

      setPaymentInputValue({ ...paymentInput, [type]: formattedExpiryDate });

      const month = parseInt(input.slice(0, 2));
      const currentYear = new Date().getFullYear() % 100;
      const year = parseInt(input.slice(5, 7));

      if (
        month < 1 ||
        month > 12 ||
        year < currentYear ||
        cleanedInput.length !== 4
      ) {
        invalidResult(type, invalidMessage);
      } else {
        validResult(type, cleanedInput);
      }
    } else if (type === 'dateOfBirth') {
      const cleanedInput = input.replace(/\s|\D/g, '');

      setPaymentInputValue({ ...paymentInput, [type]: cleanedInput });

      const month = parseInt(input.slice(2, 4));
      const day = parseInt(input.slice(4, 6));

      if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        cleanedInput.length !== 6
      ) {
        invalidResult(type, invalidMessage);
      } else {
        validResult(type, cleanedInput);
      }
    } else if (type === 'email') {
      setPaymentInputValue({ ...paymentInput, [type]: input });

      if (!input.includes('@') || !input.includes('.') || input.length < 7) {
        invalidResult(type, invalidMessage);
      } else {
        validResult(type, input);
      }
    }
  };

  return (
    <div className={`${id === 2 && 'max-sm:col-span-2'}`} key={id}>
      <p className="text-sm sm:text-base">{detail}</p>
      <input
        className={`w-${width} focus:outline-none focus:border-b-black border-[1.5px] border-x-transparent border-t-transparent border-b-mkLightGray mt-1 placeholder:text-base`}
        type="input"
        placeholder={placeholder}
        onChange={e => {
          isValid(name, e.target.value);
        }}
        value={paymentInputValue[name]}
        readOnly={!token}
        onClick={isLoggedIn}
        maxLength={maxLength}
      />
      <p
        className={`text-xs mt-1 mb-5 h-1 ${
          id === 3 && 'w-52'
        } w-${width} sm:w-full text-mkOrange`}
      >
        {invalidMessageText}
      </p>
    </div>
  );
}
