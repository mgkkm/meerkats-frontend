import axios from 'axios';
import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { warningAlert } from '../../../components/Alert/Modal';

type propsType = {
  email: string;
  certifiNumber: string;
  userInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type dataType = {
  message: string;
};

export default function EmailInput(props: propsType) {
  const BASE_URL = process.env.BASE_URL;
  const { email, certifiNumber, userInputHandler } = props;
  const [loading, error, data, fetchData] = useAxios();
  const [certifiNumInput, setCertifiNumInput] = useState(false);
  const [emailChk, setEmailChk] = useState(false);
  const [duplicationEmailBtn, setDuplicationEmailBtn] = useState(false);
  const [duplicationEmailErr, setDuplicationEmailErr] = useState(true);
  const [certifiBtn, setCertifiBtn] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isAvailableEmail, setIsAvailableEmail] = useState(false);

  const getUserCertification = (arg: string) => {
    setEmailChk(true);
    emailChkHandler(arg);
  };

  //* useAxios는 에러핸들링이 안되어서 적용 X
  const emailChkHandler = async (email: string) => {
    try {
      await axios({
        method: 'post',
        url: 'https://www.meerkats.monster/users/email-check',
        data: {
          email: email,
        },
        timeout: 5000,
      }).then(res => {
        let msg = res.data.message;

        if (msg === '사용 가능한 이메일입니다.') {
          setDuplicationEmailBtn(true);
          setDuplicationEmailErr(true);
          setIsAvailableEmail(true);
        } else {
          setDuplicationEmailBtn(false);
        }
      });
    } catch (err: any) {
      let errMsg = err.response.data.message;

      if (errMsg === '이메일이 이미 존재합니다.') {
        setDuplicationEmailErr(false);
        setEmailChk(false);
      } else {
        setDuplicationEmailErr(true);
      }
    }
  };

  const emailConfirmBtn = async (email: string) => {
    setCertifiNumInput(true);
    fetchData({
      url: 'https://www.meerkats.monster/users/email-send',
      method: 'POST',
      headers: { 'Content-Type': `application/json` },
      data: { email: email },
    }).then((data: dataType) => {
      // 인증버튼 비활성화
      setCertifiBtn(false);
    });
  };

  const emailConfirmNum = () => {
    if (certifiNumber.length === 6) {
      emailConfirm(certifiNumber);
    }
  };

  //* useAxios는 에러핸들링이 안되어서 적용 X
  const emailConfirm = async (certifiNum: string) => {
    try {
      await axios({
        method: 'post',
        url: 'https://www.meerkats.monster/users/email-confirm',
        data: {
          userEmailCode: certifiNum,
        },
        timeout: 5000,
      }).then(res => {
        // 인증번호 인풋창 사라짐
        // 인증버튼 비활성화 됨
        // 이메일 인풋창 비활성화 됨
        setIsValid(true);
      });
    } catch (error: any) {
      let err = error.response.data.message;
      err === '인증번호가 일치하지 않습니다.' &&
        warningAlert('인증번호가 틀립니다.', '다시 시도해주세요 :)');
    }
  };

  return (
    <div className="block relative">
      <button
        className={`btn ${
          duplicationEmailBtn ? '' : 'hidden'
        } absolute right-1 top-1 w-16 border-none border-rose-700 bg-mkOrange hover:bg-mkDarkOrange text-mkWhite`}
        onClick={() => emailConfirmBtn(email)}
        disabled={certifiBtn || !isValid ? false : true}
      >
        인증
      </button>
      {/* 중복체크 검사가 올바르게 끝나면 인증버튼이 보이고 중복체크버튼이 사라집니다. */}
      <button
        className={`btn ${emailChk && `loading`} ${
          duplicationEmailBtn && 'hidden'
        } absolute right-1 top-1 w-24 border-none border-rose-700 bg-mkOrange hover:bg-mkDarkOrange text-mkWhite`}
        onClick={() => getUserCertification(email)}
        disabled={email.includes('@' && '.') ? false : true}
      >
        {emailChk ? '' : '중복체크'}
      </button>
      <input
        required
        type="email"
        name="email"
        value={email}
        placeholder="email@meerkats.com"
        className={`${
          duplicationEmailErr ? '' : 'border-red-500 border-2'
        } input input-bordered w-full h-14`}
        onChange={userInputHandler}
        disabled={isValid ? true : false}
      />
      <p
        className={`${
          certifiNumInput ? 'hidden' : 'block'
        } mt-2 text-left text-mkGray text-sm opacity-50 ${
          duplicationEmailErr ? '' : 'text-red-500 opacity-100'
        }`}
      >
        {duplicationEmailErr
          ? isAvailableEmail
            ? '사용 가능한 이메일입니다. 인증을 진행해주세요 :)'
            : '* 로그인, 비밀번호 찾기에 사용되니 정확한 이메일을 입력해주세요!'
          : '* 이미 존재하는 이메일입니다. 새로운 이메일을 입력해주세요.'}
      </p>
      <input
        type="number"
        name="certifiNumber"
        placeholder={
          isValid ? '인증 성공! 비밀번호를 설정해주세요 :)' : '인증번호 입력'
        }
        className={`${
          certifiNumInput ? 'block' : 'hidden'
        } input input-bordered w-full h-14 mt-2`}
        maxLength={6}
        value={isValid ? '' : certifiNumber}
        onChange={userInputHandler}
        onKeyUp={emailConfirmNum}
        disabled={isValid ? true : false}
      />
      {/* 인증번호 입력창 : 6글자(인증번호.length) 및 유효한숫자 조건이 참이면, 자동 disabled 처리되게끔 */}
    </div>
  );
}
