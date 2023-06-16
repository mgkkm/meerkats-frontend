import { atom } from 'recoil';

export const blogPostState = atom({
  key: 'postDataState',
  default: {
    userId: 0,
    title: '',
    content: '',
    categoryId: 0,
    spoilerInfoId: 0,
    thumbnail:
      'https://velog.velcdn.com/images/ijinkyung/post/20935c86-64b5-4b1d-abbc-01ed7d5e0e7d/image.jpg',
  },
});

export const blogInputState = atom({
  key: 'blogInputState',
  default: '',
});

export const isEditState = atom({
  key: 'isEditState',
  default: false,
});

export const commentIdState = atom({
  key: 'commentIdState',
  default: 0,
});

export const refState = atom<HTMLTextAreaElement | null>({
  key: 'refState',
  default: null,
});

export const renderingState = atom({
  key: 'renderingState',
  default: false,
});
