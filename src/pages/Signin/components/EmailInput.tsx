import axios from 'axios';
import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';

type propsType = {
  email: string;
  certifiNumber: string;
  userInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
};

export default function EmailInput({
  email,
  certifiNumber,
  userInputHandler,
  nickname,
}: propsType) {
  const [loading, error, data, fetchData] = useAxios();
  const [certifiNumInput, setCertifiNumInput] = useState(false);
  const [emailChk, setEmailChk] = useState(false);
  const [duplicationEmailBtn, setDuplicationEmailBtn] = useState(false);
  const [duplicationEmailErr, setDuplicationEmailErr] = useState(true);
  const [certifiBtn, setCertifiBtn] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const getUserCertification = (arg: string) => {
    setEmailChk(true);
    emailChkHandler(arg);
  };

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
        console.log(res.data.message);
        let msg = res.data.message;

        if (msg === '사용 가능한 이메일입니다.') {
          setDuplicationEmailBtn(true);
          setDuplicationEmailErr(true);
        } else {
          setDuplicationEmailBtn(false);
        }
      });
    } catch (err: any) {
      console.log(err.response.data.message);
      let errMsg = err.response.data.message;

      if (errMsg === '이메일이 이미 존재합니다.') {
        setDuplicationEmailErr(false);
        setEmailChk(false);
      } else {
        setDuplicationEmailErr(true);
      }
    }
  };
  //   fetchData({
  //     url: 'https://www.meerkats.monster/users/email-check',
  //     method: 'POST',
  //     headers: { 'Content-Type': `application/json` },
  //     data: { email: email },
  //   })
  //     .then((data: any) => {
  //       if (data) {
  //         let msg = data.message;

  //         if (msg === '사용 가능한 이메일입니다.') {
  //           setDuplicationEmailBtn(true);
  //           setDuplicationEmailErr(true);
  //         } else {
  //           setDuplicationEmailBtn(false);
  //         }
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log(err);

  // let errMsg = error.response.data.message;

  // if (errMsg === '이메일이 이미 존재합니다.') {
  //   setDuplicationEmailErr(false);
  //   setEmailChk(false);
  // } else {
  //   setDuplicationEmailErr(true);
  // }
  //     });
  // };

  const emailConfirmBtn = async (email: string) => {
    setCertifiNumInput(true);
    // fetchData({
    //   url: 'https://www.meerkats.monster/users/email-send',
    //   method: 'POST',
    //   headers: { 'Content-Type': `application/json` },
    //   data: { email: email },
    // }).then((data: any) => {
    //   console.log(data);
    //   // 인증버튼 비활성화
    //   setCertifiBtn(false);
    // });

    try {
      await axios({
        method: 'post',
        url: 'https://www.meerkats.monster/users/email-send',
        data: {
          email: email,
        },
      }).then(res => {
        console.log(res);
        // 인증버튼 비활성화
        setCertifiBtn(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const emailConfirmNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 6) {
      emailConfirm(e.target.value);
    }
  };

  const emailConfirm = async (certifiNum: string) => {
    // fetchData({
    //   url: 'https://www.meerkats.monster/users/email-confirm',
    //   method: 'POST',
    //   headers: { 'Content-Type': `application/json` },
    //   data: { userEmailCode: certifiNum },
    // }).then((data: any) => {
    //   console.log(data);
    //   // 인증번호 인풋창 사라짐
    //   // 인증버튼 비활성화 됨
    //   // 이메일 인풋창 비활성화 됨
    //   setIsValid(true);
    // });

    try {
      await axios({
        method: 'post',
        url: 'https://www.meerkats.monster/users/email-confirm',
        data: {
          userEmailCode: certifiNum,
        },
        timeout: 5000,
      }).then(res => {
        console.log(res);
        // 인증번호 인풋창 사라짐
        // 인증버튼 비활성화 됨
        // 이메일 인풋창 비활성화 됨
        setIsValid(true);
      });
    } catch {}
  };

  return (
    <div className="block relative">
      <button
        className={`btn ${
          duplicationEmailBtn ? '' : 'hidden'
        } bg-mkOrange hover:bg-mkDarkOrange text-mkWhite border-none absolute right-1 top-1 w-16 border-rose-700`}
        onClick={() => emailConfirmBtn(email)}
        disabled={certifiBtn || !isValid ? false : true}
      >
        인증
      </button>
      {/* 중복체크 검사가 올바르게 끝나면 인증버튼이 보이고 중복체크버튼이 사라집니다. */}
      <button
        className={`btn ${emailChk && `loading`} ${
          duplicationEmailBtn && 'hidden'
        } bg-mkOrange hover:bg-mkDarkOrange text-mkWhite border-none absolute right-1 top-1 w-24 border-rose-700`}
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
        } text-left text-mkGray opacity-50 text-sm mt-2 ${
          duplicationEmailErr ? '' : 'text-red-500 opacity-100'
        }`}
      >
        {duplicationEmailErr
          ? '* 로그인, 비밀번호 찾기에 사용되니 정확한 이메일을 입력해주세요!'
          : '* 이미 존재하는 이메일입니다. 새로운 이메일을 입력해주세요.'}
      </p>
      <input
        type="number"
        name="certifiNumber"
        placeholder="인증번호 입력"
        className={`${
          certifiNumInput ? 'block' : 'hidden'
        } input input-bordered w-full h-14 mt-2`}
        maxLength={6}
        value={certifiNumber}
        onChange={emailConfirmNum}
      />
      {/* 인증번호 입력창 : 6글자(인증번호.length) 및 유효한숫자 조건이 참이면, 자동 disabled 처리되게끔 */}
    </div>
  );
}
