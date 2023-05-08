import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';
import { ArticleDataState } from '../../../../recoil/ArticleDataState';
import useAxios from '../../../../hooks/useAxios';
import { BlogArticle } from './BlogArticle';
import { tokenState } from '../../../../recoil/TokenState';
import { blogCreatedAt } from '../../../../components/CreatedAt/CreatedAt';

export default function BlogRenderArticle() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const [articleData, setArticleData] = useRecoilState(ArticleDataState);
  const toggle = useRecoilValue(toggleSelector('spo'));

  // token 관리 및 저장
  const setTokenValue = useSetRecoilState(tokenState);
  const token = localStorage.getItem('token');
  token && setTokenValue(token);

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/blog/main?take=6&skip=0`,
      method: 'POST',
      headers: { Authorization: token },
    }).then((res: any) => {
      setArticleData(res);
    });
  }, [toggle]);

  const spoToggle = toggle
    ? articleData?.data?.spoPostData
    : articleData?.data?.nonSpoPostData;

  return (
    <section className="mt-14 xl:mt-10 z-10">
      {spoToggle?.map((el: any) => {
        const nickname = el.user.nickname;
        const blogDate = blogCreatedAt(el.created_at);

        const {
          id,
          thumbnail,
          title,
          commentCount,
          weeklyLikeCount,
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
            weeklyLikeCount={weeklyLikeCount}
            spoiler_info_id={spoiler_info_id}
          />
        );
      })}
    </section>
  );
}
