import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInput } from './UserInput';
import useAxios from '../../../hooks/useAxios';

export default function UserForm() {
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();

  type UserInfos = { id: string; pw: string };
  const [inputValues, setInputValues] = useState<UserInfos>({
    id: '',
    pw: '',
  });

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

  const gotoPage = (page: string) => {
    navigate(`/${page}`);
  };

  const loginAxios = () => {
    fetchData({
      url: 'https://www.meerkats.monster/users/kakao-login',
      method: 'POST',
      headers: {},
      data: {},
    })
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log(err));
  };

  return (
    <form>
      <div className="block text-center">
        <UserInput
          id="id"
          type="email"
          placeholder="meerkats@hello.com"
          name="id"
          value={inputValues.id}
          handleInput={handleInput}
          margin={false}
        />
        <UserInput
          id="pw"
          type="password"
          placeholder="password"
          name="pw"
          value={inputValues.pw}
          handleInput={handleInput}
          margin={true}
        />
      </div>
      <div className="block text-center">
        <button
          type="submit"
          className={`${
            active && 'bg-mkOrange hover:bg-mkDarkOrange'
          } btn w-1/3 h-14 mt-5 border-none text-white text-base`}
          onClick={() => gotoPage('/')}
          disabled={!active}
        >
          Login
        </button>
      </div>
    </form>
  );
}
