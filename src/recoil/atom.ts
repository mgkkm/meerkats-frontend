import { atom } from 'recoil';

const myAtom = atom({
  key: 'myAtom', // 유일한 식별자 역할을 하는 문자열 키
  default: 'default value', // 초기 상태 값
});
