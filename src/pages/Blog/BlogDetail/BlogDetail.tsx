import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import { numberSelector, numberState } from '../../../recoil/NumberState';
import useAxios from '../../../hooks/useAxios';
import { useParams } from 'react-router-dom';
import BlogHeader from './components/BlogHeader';
import BlogContent from './components/BlogContent';
import BlogFooter from './components/BlogFooter';
import Comments from '../../../components/Comment/Comments';
import { blogDetailState } from '../../../recoil/BlogDetailState';
import { commentState, CommentData } from '../../../recoil/CommentState';
import { tokenState } from '../../../recoil/TokenState';

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
    comments: CommentData[];
  };
}

export default function BlogDetail() {
  const params = useParams();
  const postId = params.id;

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = useRecoilValue(tokenState);

  const setBlogDetailData = useSetRecoilState(blogDetailState);

  const setIsLiked = useSetRecoilState(toggleSelector(`blogLike${postId}`));
  const setIsScraped = useSetRecoilState(toggleSelector(`blogScrap${postId}`));

  const setLikeN = useSetRecoilState(numberSelector(`blogLike${postId}`));
  const setScrapN = useSetRecoilState(numberSelector(`blogScrap${postId}`));
  const setCommentN = useSetRecoilState(numberState(`blogComment${postId}`));

  const setBlogDetailComment = useSetRecoilState(commentState('blog'));

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

  const resetCommentState = useResetRecoilState(commentState('blog'));

  const [loading, error, data, fetchData] = useAxios();

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
        setIsLiked(result.data.postDetails.isLikedByThisUser);
        setIsScraped(result.data.postDetails.isScrapedByThisUser);
        setLikeN(result.data.postDetails.likeCount);
        setScrapN(result.data.postDetails.scrapCount);
        setCommentN(result.data.comments.length);
        setBlogDetailComment(result.data.comments);
      }
    });

    return () => {
      resetBlogDetailState();
      resetIsLiked();
      resetIsScraped();
      resetLikeN();
      resetScrapN();
      resetCommentN();
      resetCommentState();
    };
  }, []);

  return (
    <div className="container xl flex justify-center pt-48">
      <div className="flex-row max-lg:w-full lg:w-3/4 bg-white px-20 py-10">
        <BlogHeader />
        <BlogContent />
        <BlogFooter />
        <Comments />
      </div>
    </div>
  );
}
