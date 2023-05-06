import { atom } from 'recoil';
import { BlogDetailData } from '../pages/Blog/BlogDetail/BlogDetail';

export const blogDetailState = atom<BlogDetailData>({
  key: 'blogDetailState',
  default: {
    id: 0,
    title: '',
    content: '',
    created_at: '',
    category: { id: 0, name: '' },
    spoiler_info_id: 0,
    user: { id: 0, nickname: '' },
    likeCount: 0,
    isLikedByThisUser: false,
    scrapCount: 0,
    isScrapedByThisUser: false,
  },
});
