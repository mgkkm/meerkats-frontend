import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import { numberSelector, numberState } from '../../../recoil/NumberState';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import BlogHeader from './components/BlogHeader';
import BlogContent from './components/BlogContent';
import BlogFooter from './components/BlogFooter';
import Comments from '../../../components/Comment/Comments';
import { blogDetailState } from '../../../recoil/BlogDetailState';
import { DecodeToken } from '../../../components/DecodeToken/DecodeToken';
import {
  currentUserIdState,
  currentUserNicknameState,
} from '../../../recoil/JwtDecode';

export interface BlogDetailData {
  id: number;
  title: string;
  content: string;
  created_at: string;
  category: { id: number; name: string };
  spoiler_info_id: number;
  user: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  isLikedByThisUser: boolean;
  scrapCount: number;
  isScrapedByThisUser: boolean;
}

interface ResultData {
  data: {
    postDetails: BlogDetailData;
  };
}

export default function BlogDetail() {
  const params = useParams();
  const postId = params.id;

  const token = sessionStorage.getItem('token');

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();

  const setCurrentId = useSetRecoilState(currentUserIdState);
  const setCurrentNickname = useSetRecoilState(currentUserNicknameState);

  const setBlogDetailData = useSetRecoilState(blogDetailState);

  const setIsLiked = useSetRecoilState(toggleSelector(`blogLike${postId}`));
  const setIsScraped = useSetRecoilState(toggleSelector(`blogScrap${postId}`));

  const setLikeN = useSetRecoilState(numberSelector(`blogLike${postId}`));
  const setScrapN = useSetRecoilState(numberSelector(`blogScrap${postId}`));

  const resetBlogDetailState = useResetRecoilState(blogDetailState);
  const resetIsLiked = useResetRecoilState(toggleSelector(`blogLike${postId}`));
  const resetIsScraped = useResetRecoilState(
    toggleSelector(`blogScrap${postId}`)
  );
  const resetLikeN = useResetRecoilState(numberSelector(`blogLike${postId}`));
  const resetScrapN = useResetRecoilState(numberSelector(`blogScrap${postId}`));
  const resetCommentN = useResetRecoilState(
    numberState(`blogComment${postId}`)
  );

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/blog/${postId}`,
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
    }).then((result: ResultData) => {
      if (result) {
        setBlogDetailData(result.data.postDetails);
        resetIsLiked();
        resetLikeN();
        setIsLiked(result.data.postDetails.isLikedByThisUser);
        setIsScraped(result.data.postDetails.isScrapedByThisUser);
        setLikeN(result.data.postDetails.likeCount);
        setScrapN(result.data.postDetails.scrapCount);
        DecodeToken(setCurrentId, setCurrentNickname);
      }
    });

    return () => {
      resetBlogDetailState();
      resetIsLiked();
      resetIsScraped();
      resetLikeN();
      resetScrapN();
      resetCommentN();
    };
  }, []);

  return (
    <div className="container xl flex justify-center pt-48">
      <div className="flex-row max-lg:w-full lg:w-3/4 bg-white px-10 md:px-20 py-10">
        <BlogHeader />
        <BlogContent />
        <BlogFooter />
        <Comments />
      </div>
    </div>
  );
}
