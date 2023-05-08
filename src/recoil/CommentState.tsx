import { atomFamily } from 'recoil';

export const commentState = atomFamily<CommentData[], string>({
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

export interface CommentData {
  commentId: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    nickname: string;
  };
}
