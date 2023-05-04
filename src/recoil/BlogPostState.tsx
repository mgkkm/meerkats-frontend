import { atom } from 'recoil';

export const blogPostState = atom({
  key: 'postDataState',
  default: {
    userId: 2,
    title: '',
    content: '',
    categoryId: 0,
    spoilerInfoId: 0,
    thumbnail: '썸네일',
  },
});
