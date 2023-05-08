import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInputState } from '../../recoil/UserInputState';
import { infoAlert } from '../../components/Alert/Modal';
import EmailInput from './components/EmailInput';

export default function Signin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [userInput, setUserInput] = useRecoilState(UserInputState);
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
    })
      .then((res: any) => {
        infoAlert(
          'meerkats 회원이 되신 것을 축하드립니다!',
          '로그인 해 주세요 :)'
        );
        navigate('/login');
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <div className="h-full pt-28 pb-16 bg-mkBg text-mkBlack">
      <div className="w-1/3 h-1.5 m-auto mt-16 bg-mkOrange " />
      <div className="w-1/3 h-2/4 m-auto py-20 px-16 bg-white">
        <header className="mb-10 text-center text-2xl text-mkDarkGray">
          <span className="font-semibold">이메일과 비밀번호</span>만으로
          <br />
          <span className="font-semibold">meerkats</span>을 즐길 수 있어요!
        </header>
        <section className="block text-center">
          <EmailInput userInputHandler={userInputHandler} />
          <div className="block mt-3">
            <input
              required
              type="password"
              name="password"
              value={password}
              placeholder="password"
              className={`input input-bordered w-full h-14 mt-2 ${
                (pwchk.test(pwvalue) && pwvalue.length >= 8) ||
                pwvalue.length === 0
                  ? ''
                  : 'border-red-500 border-2'
              }`}
              onChange={userInputHandler}
            />
            <p
              className={`text-left text-sm mt-2 ${
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
              placeholder="nickname"
              className="input input-bordered w-full h-14 mt-5"
              onChange={userInputHandler}
            />
          </div>
        </section>
        <div className="block text-center">
          <button
            className="btn w-full h-14 mt-6 border-none bg-mkOrange hover:bg-mkDarkOrange text-mkWhite text-base"
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
