import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInput } from './UserInput';
import useAxios from '../../../hooks/useAxios';
import { infoAlert } from '../../../components/Alert/Modal';

export default function UserForm() {
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();

  type UserInfos = { id: string; pw: string };
  const [inputValues, setInputValues] = useState<UserInfos>({
    id: '',
    pw: '',
  });

  const { id, pw } = inputValues;
  const [active, setActive] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    activeLogin();
  };

  const activeLogin = () => {
    return inputValues.id.includes('@' && '.') && inputValues.pw.length >= 8
      ? setActive(true)
      : setActive(false);
  };

  const loginAxios = () => {
    fetchData({
      url: 'https://www.meerkats.monster/users/signin',
      method: 'POST',
      headers: { 'Content-Type': `application/json` },
      data: { email: id, password: pw },
    }).then((res: any) => {
      console.log(res);
      if (res.accessToken) {
        localStorage.setItem('token', res.accessToken);
        navigate('/');
        infoAlert('로그인 성공', '환영합니다 :)');
      } else if (res === undefined) {
        alert('아이디나 비밀번호가 다릅니다. 다시 로그인 해주세요 :)');
      }
    });
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
        />
      </div>
      <div className="block text-center">
        <button
          type="button"
          className={`${
            active && 'bg-mkOrange hover:bg-mkDarkOrange'
          } btn w-1/3 h-14 mt-5 border-none text-white text-base`}
          onClick={loginAxios}
          disabled={!active}
        >
          Login
        </button>
      </div>
    </form>
  );
}
