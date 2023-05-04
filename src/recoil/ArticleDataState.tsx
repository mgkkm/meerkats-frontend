import { atom } from 'recoil';

export const ArticleDataState = atom<any>({
  key: 'ArticleDataState', // 유일한 식별자 역할을 하는 문자열 키
  default: [], // 초기 상태 값
});
