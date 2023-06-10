import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ArticleDataState,
  myblogArticleDataState,
} from '../../../../recoil/ArticleDataState';
import { toggleSelector } from '../../../../recoil/ToggleState';
import { tokenState } from '../../../../recoil/TokenState';
import { myBlogBtnState } from '../../../../recoil/MyBlogBtnState';
import useAxios from '../../../../hooks/useAxios';
import { BlogArticle } from './BlogArticle';
import { blogCreatedAt } from '../../../../components/CreatedAt/CreatedAt';

type dataType = {
  data: {
    category: [];
    nonSpoPostData: [];
    spoPostData: [];
    spoilerInfo: [];
  };
};

type elType = {
  category_id: number;
  commentCount: number;
  created_at: string;
  id: number;
  likeCount: number;
  isLikedByThisUser: boolean;
  spoiler_info_id: number;
  thumbnail: string;
  title: string;
  user: {
    nickname: string;
  };
  weeklyLikeCount: number;
};

type myBlogElType = {
  category_id: number;
  commentCount: number;
  created_at: string;
  id: number;
  likeCount: number;
  isLikedByThisUser: boolean;
  spoiler_info_id: number;
  thumbnail: string;
  title: string;
  user: {
    nickname: string;
  };
};

const BlogRenderArticle = React.memo(() => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const [articleData, setArticleData] = useRecoilState(ArticleDataState);
  const toggle = useRecoilValue(toggleSelector('spo'));
  const myBlogBtn = useRecoilValue(myBlogBtnState);
  const myBlogData = useRecoilValue(myblogArticleDataState);

  // token 관리 및 저장
  const setTokenValue = useSetRecoilState(tokenState);
  const token = sessionStorage.getItem('token');
  token && setTokenValue(token);

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/blog/main?take=6&skip=0`,
      method: 'POST',
      headers: { Authorization: token },
    }).then((res: dataType) => {
      setArticleData(res);
    });
  }, [toggle]);

  const spoToggle = toggle
    ? articleData?.data?.spoPostData
    : articleData?.data?.nonSpoPostData;

  return (
    <section className="flex flex-col lg:flex-row lg:flex-wrap justify-center m-auto xl:mt-10 z-10">
      {myBlogBtn
        ? myBlogData?.data?.thisUserWrittenPosts.map((el: myBlogElType) => {
            const nickname = el.user.nickname;
            const blogDate = blogCreatedAt(el.created_at);

            const {
              id,
              thumbnail,
              title,
              commentCount,
              spoiler_info_id,
              likeCount,
              isLikedByThisUser,
            } = el;

            return (
              <BlogArticle
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail}
                nickname={nickname}
                commentCount={commentCount}
                blogDate={blogDate}
                likeCount={likeCount}
                isLikedByThisUser={isLikedByThisUser}
                spoiler_info_id={spoiler_info_id}
              />
            );
          })
        : spoToggle?.map((el: elType) => {
            const nickname = el.user.nickname;
            const blogDate = blogCreatedAt(el.created_at);

            const {
              id,
              thumbnail,
              title,
              commentCount,
              likeCount,
              isLikedByThisUser,
              spoiler_info_id,
            } = el;

            return (
              <BlogArticle
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail}
                nickname={nickname}
                commentCount={commentCount}
                blogDate={blogDate}
                likeCount={likeCount}
                isLikedByThisUser={isLikedByThisUser}
                spoiler_info_id={spoiler_info_id}
              />
            );
          })}
    </section>
  );
});

export default BlogRenderArticle;
