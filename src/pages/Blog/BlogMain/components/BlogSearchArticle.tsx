import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { SearchDataState } from '../../../../recoil/SearchDataState';
import { BlogArticle } from './BlogArticle';
import { blogCreatedAt } from '../../../../components/CreatedAt/CreatedAt';
import { useEffect } from 'react';
import { searchState } from '../../../../recoil/SearchState';

export default function BlogSearchArticle() {
  const searchArticleData = useRecoilValue(SearchDataState);
  const resetSearchArticleData = useResetRecoilState(SearchDataState);
  const setSearchInput = useSetRecoilState(searchState);

  useEffect(() => {
    // unmount 시, 검색된 데이터 reset
    return () => {
      setSearchInput(false);
      resetSearchArticleData();
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row lg:flex-wrap justify-center m-auto xl:mt-10">
      {searchArticleData?.data?.map((el: any) => {
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
}
