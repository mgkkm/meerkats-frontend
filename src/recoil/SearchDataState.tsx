import { atom } from 'recoil';

export const SearchDataState = atom<any>({
  key: 'SearchDataState', // 유일한 식별자 역할을 하는 문자열 키
  default: [], // 초기 상태 값
});
