import { useRecoilValue } from 'recoil';
import { SearchDataState } from '../../../../recoil/SearchDataState';
import { BlogArticle } from './BlogArticle';
import { blogCreatedAt } from '../../../../components/CreatedAt/CreatedAt';

export default function BlogSearchArticle() {
  const searchArticleData = useRecoilValue(SearchDataState);

  return (
    <section className="mt-14 xl:mt-10 z-10">
      {searchArticleData?.data?.map((el: any) => {
        const nickname = el.user.nickname;
        const blogDate = blogCreatedAt(el.created_at);

        const {
          id,
          thumbnail,
          title,
          commentCount,
          likeCount,
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
            spoiler_info_id={spoiler_info_id}
          />
        );
      })}
    </section>
  );
}
