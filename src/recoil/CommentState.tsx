import { atom } from 'recoil';

export const commentState = atom<CommentArrayType>({
  key: 'commentState',
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

interface CommentData {
  commentId: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    nickname: string;
  };
}

export type CommentArrayType = CommentData[];
