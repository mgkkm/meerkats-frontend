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

export const blogCommentState = atom({
  key: 'blogCommentState',
  default: [
    {
      commentId: 0,
      content: '',
      created_at: '',
      user: {
        id: 0,
        nickname: '',
      },
    },
  ],
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
