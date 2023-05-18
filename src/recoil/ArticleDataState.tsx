import { atom } from 'recoil';

export const ArticleDataState = atom<any>({
  key: 'ArticleDataState',
  default: [],
});

export const scrollArticleDataState = atom<any>({
  key: 'scrollArticleDataState',
  default: [],
});

export const myblogArticleDataState = atom<any>({
  key: 'myblogArticleDataState',
  default: [],
});
