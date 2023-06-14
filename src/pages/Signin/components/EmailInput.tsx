import axios from 'axios';
import React, { memo, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { warningAlert } from '../../../components/Alert/Modal';
import { userInputState } from '../../../recoil/UserInputState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';

type propsType = {
  userInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type dataType = {
  message: string;
};

export const EmailInput = memo((props: propsType) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const { userInputHandler } = props;
  const userInput = useRecoilValue(userInputState);
  const { email, certifiNumber } = userInput;
  const [certifiNumInput, setCertifiNumInput] = useRecoilState(
    toggleSelector('certificationNumber')
  );
  const [emailChk, setEmailChk] = useRecoilState(toggleSelector('emailCheck'));
  const [duplicationEmailBtn, setDuplicationEmailBtn] = useRecoilState(
    toggleSelector('duplicationEmailButton')
  );
  const [certifiBtn, setCertifiBtn] = useRecoilState(
    toggleSelector('certificationButton')
  );
  const [isValid, setIsValid] = useRecoilState(
    toggleSelector('userValidation')
  );
  const [isAvailableEmail, setIsAvailableEmail] = useRecoilState(
    toggleSelector('availableEmail')
  );
  const [duplicationEmailErr, setDuplicationEmailErr] = useState(true);

  const getUserCertification = (arg: string) => {
    setEmailChk(true);
    emailChkHandler(arg);
  };

  //* useAxios는 에러핸들링이 안되어서 적용 X
  const emailChkHandler = async (email: string) => {
    try {
      await axios({
        method: 'post',
        url: `${BASE_URL}/users/email-check`,
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
      url: `${BASE_URL}/users/email-send`,
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
        url: `${BASE_URL}/users/email-confirm`,
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
    <div>
      {/* 데스크탑 */}
      <div className="desktop hidden sm:block relative">
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
      {/* 모바일 */}
      <div className="mobile block sm:hidden relative">
        <button
          className={`btn ${
            duplicationEmailBtn || 'hidden'
          } absolute right-1 top-1 w-14 border-none border-rose-700 bg-mkOrange hover:bg-mkDarkOrange text-xs text-mkWhite`}
          onClick={() => emailConfirmBtn(email)}
          disabled={certifiBtn || !isValid ? false : true}
        >
          인증
        </button>
        {/* 중복체크 검사가 올바르게 끝나면 인증버튼이 보이고 중복체크버튼이 사라집니다. */}
        <button
          className={`emailChkImg btn ${emailChk && `loading`} ${
            duplicationEmailBtn && 'hidden'
          } flex justify-center items-center absolute top-1 right-1 w-12 bg-mkOrange hover:bg-mkDarkOrange border-none rounded-lg
          `}
          onClick={() => getUserCertification(email)}
          disabled={email.includes('@' && '.') ? false : true}
        >
          <span className="w-4">
            <img
              src="/images/signin/check.png"
              alt="중복체크이미지"
              className="w-full"
            />
          </span>
        </button>
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          className={`${
            duplicationEmailErr ? '' : 'border-red-500 border-2'
          } input input-bordered w-full h-14 text-sm`}
          onChange={userInputHandler}
          disabled={isValid ? true : false}
        />
        <p
          className={`${
            certifiNumInput ? 'hidden' : 'block'
          } mt-2 text-left text-xs text-mkGray opacity-50 ${
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
          } input input-bordered w-full h-14 mt-2 text-sm`}
          maxLength={6}
          value={isValid ? '' : certifiNumber}
          onChange={userInputHandler}
          onKeyUp={emailConfirmNum}
          disabled={isValid ? true : false}
        />
        {/* 인증번호 입력창 : 6글자(인증번호.length) 및 유효한숫자 조건이 참이면, 자동 disabled 처리되게끔 */}
      </div>
    </div>
  );
});
