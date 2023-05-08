import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInput } from './UserInput';
import useAxios from '../../../hooks/useAxios';
import { infoAlert, warningAlert } from '../../../components/Alert/Modal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenState } from '../../../recoil/TokenState';
import { inputValueState } from '../../../recoil/InputValueState';
import { toggleSelector } from '../../../recoil/ToggleState';

export default function UserForm() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();

  const [inputValues, setInputValues] = useRecoilState(inputValueState);
  const { id, pw } = inputValues;

  // const [active, setActive] = useState<boolean>(false);
  const [active, setActive] = useRecoilState(toggleSelector('active'));
  const setTokenState = useSetRecoilState(tokenState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    activeLogin();
  };

  const activeLogin = () => {
    return id.includes('@' && '.') && pw.length >= 8
      ? setActive(true)
      : setActive(false);
  };

  const loginAxios = () => {
    fetchData({
      url: `${BASE_URL}/users/signin`,
      method: 'POST',
      headers: { 'Content-Type': `application/json` },
      data: { email: id, password: pw },
    }).then((res: any) => {
      if (res.accessToken) {
        localStorage.setItem('token', res.accessToken);
        const token = localStorage.getItem('token');
        token && setTokenState(token);
        infoAlert('로그인 성공', '환영합니다 :)');
        navigate('/');
      } else if (res.message === '이메일과 비밀번호를 확인해주세요') {
        warningAlert(
          '로그인 실패',
          '이메일이나 비밀번호가 다릅니다. 다시 로그인 해주세요 :)'
        );
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
