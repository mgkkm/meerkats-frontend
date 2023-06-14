import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userInputState } from '../../recoil/UserInputState';
import { infoAlert } from '../../components/Alert/Modal';
import { EmailInput } from './components/EmailInput';

export default function Signin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [userInput, setUserInput] = useRecoilState(userInputState);
  const resetUserInput = useResetRecoilState(userInputState);
  const { email, nickname, password } = userInput;

  const userInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const pwvalue: string = password;
  const pwchk: RegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,20}$/;

  const signInBtn = async () => {
    await axios({
      method: 'post',
      url: `${BASE_URL}/users/signup`,
      headers: { 'Content-Type': `application/json` },
      data: {
        email: email,
        password: password,
        nickname: nickname,
      },
    }).then(() => {
      infoAlert(
        'meerkats 회원이 되신 것을 축하드립니다!',
        '로그인 해 주세요 :)'
      );
      navigate('/login');
      resetUserInput();
    });
  };

  return (
    <div className="h-full py-10 xs:pt-16 sm:pt-32 bg-mkBg text-mkBlack">
      <div className="w-[80%] sm:w-[70%] md:w-[55%] lg:w-[45%] xl:w-1/3 h-1.5 m-auto mt-16 bg-mkOrange " />
      <div className="w-[80%] sm:w-[70%] md:w-[55%] lg:w-[45%] xl:w-1/3 h-2/4 m-auto py-12 px-8 xs:px-10 xs:py-14 sm:py-16 sm:px-14 lg:py-20 lg:px-16 bg-white">
        <header className="mb-6 sm:mb-8 lg:mb-10 text-center text-lg sm:text-xl lg:text-2xl text-mkDarkGray">
          <span className="font-semibold">이메일과 비밀번호</span>만으로
          <br />
          <span className="font-semibold">meerkats</span>을 즐길 수 있어요!
        </header>
        <section className="block text-center">
          <EmailInput userInputHandler={userInputHandler} />
          <div className="block mt-2 sm:mt-3">
            <input
              required
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className={`input input-bordered w-full h-14 mt-2 text-sm lg:text-base ${
                (pwchk.test(pwvalue) && pwvalue.length >= 8) ||
                pwvalue.length === 0
                  ? ''
                  : 'border-red-500 border-2'
              }`}
              onChange={userInputHandler}
            />
            <p
              className={`text-left text-xs sm:text-sm mt-2 ${
                (pwchk.test(pwvalue) && pwvalue.length >= 8) ||
                pwvalue.length === 0
                  ? ''
                  : '!text-red-500 !opacity-100'
              } text-mkGray opacity-50`}
            >
              * 비밀번호는 8~20자 이내로 영문 대소문자, 숫자, 특수문자 중 3가지
              이상을 혼용하여 입력해 주세요!
            </p>
            <input
              required
              type="text"
              name="nickname"
              value={nickname}
              placeholder="Nickname"
              className="input input-bordered w-full h-14 mt-3 xs:mt-4 sm:mt-5 text-sm lg:text-base"
              onChange={userInputHandler}
            />
          </div>
        </section>
        <div className="block text-center">
          <button
            className="btn w-full h-14 sm:h-16 mt-4 sm:mt-6 border-none bg-mkOrange hover:bg-mkDarkOrange text-mkWhite text-sm sm:text-base"
            onClick={signInBtn}
            disabled={
              pwchk.test(pwvalue) && pwvalue.length >= 8 && nickname.length
                ? false
                : true
            }
          >
            meerkats 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
