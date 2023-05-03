import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const navigate = useNavigate();

  type UserInfos = { id: string; pw: string };
  const [inputValues, setInputValues] = useState<UserInfos>({
    id: '',
    pw: '',
  });

  const [active, setActive] = useState(false);

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

  // + 유효성 검사 표시해주기 (빨간 글씨? 인풋창 빨간 테두리?)
  return (
    <form>
      <div className="block text-center">
        <div className="block">
          <input
            id="id"
            className="input input-bordered w-1/3 h-14"
            type="email"
            placeholder="meerkats@hello.com"
            name="id"
            value={inputValues.id}
            onChange={handleInput}
          />
        </div>
        <div className="block">
          <input
            id="pw"
            className="input input-bordered w-1/3 h-14 mt-3"
            type="password"
            placeholder="password"
            name="pw"
            value={inputValues.pw}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="block text-center">
        <button
          type="submit"
          className={`${
            active && 'bg-mkOrange hover:bg-mkDarkOrange'
          } btn text-white text-base border-none w-1/3 mt-5 h-14`}
          onClick={() => gotoPage('')}
          disabled={!active}
        >
          Login
        </button>
      </div>
    </form>
  );
}
