import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInput } from './UserInput';
import useAxios from '../../../hooks/useAxios';
import { infoAlert, warningAlert } from '../../../components/Alert/Modal';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { inputValueState } from '../../../recoil/InputValueState';
import { DecodeToken } from '../../../components/DecodeToken/DecodeToken';
import { currentUserIdState } from '../../../recoil/JwtDecode';
import { currentUserNicknameState } from '../../../recoil/JwtDecode';

type dataType = {
  accessToken: string;
  response: {
    status: number;
  };
};

export default function UserForm() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();

  const [inputValues, setInputValues] = useRecoilState(inputValueState);
  const { id, pw } = inputValues;
  const resetInputValues = useResetRecoilState(inputValueState);

  const [active, setActive] = useState<boolean>(true);
  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    id.includes('@' && '.') && pw.length >= 8 && setActive(false);
  };

  const loginAxios = () => {
    fetchData({
      url: `${BASE_URL}/users/signin`,
      method: 'POST',
      headers: { 'Content-Type': `application/json` },
      data: { email: id, password: pw },
    }).then((res: dataType) => {
      if (res.accessToken) {
        sessionStorage.setItem('token', res.accessToken);
        DecodeToken(setCurrentId, setCurrentNickname);
        infoAlert('로그인 성공', '환영합니다 :)');
        resetInputValues();
        navigate('/');
      } else if (res.response.status === 401) {
        warningAlert(
          '로그인 실패',
          '이메일이나 비밀번호가 다릅니다. 다시 로그인 해주세요 :)'
        );
      }
    });
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      loginAxios();
    } else {
    }
  };

  return (
    <form>
      <div className="block text-center">
        <UserInput
          id="id"
          type="email"
          placeholder="meerkats@hello.com"
          name="id"
          value={id}
          handleInput={handleInput}
          margin={false}
        />
        <UserInput
          id="pw"
          type="password"
          placeholder="password"
          name="pw"
          value={pw}
          handleInput={handleInput}
          margin={true}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="block text-center">
        <button
          type="button"
          className={`${
            !active && 'bg-mkOrange hover:bg-mkDarkOrange'
          } btn w-[75%] xs:w-[90%] sm:w-[60%] md:w-[70%] lg:w-[60%] h-12 xs:h-14 mt-3 sm:mt-5 border-none text-white text-base`}
          onClick={loginAxios}
          disabled={active}
        >
          Login
        </button>
      </div>
    </form>
  );
}
