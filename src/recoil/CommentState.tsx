import { atom } from 'recoil';

export const commentState = atom<CommentData[]>({
  key: 'commentState',
  default: [],
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
