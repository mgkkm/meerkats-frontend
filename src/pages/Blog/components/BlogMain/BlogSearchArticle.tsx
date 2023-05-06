import { useRecoilValue } from 'recoil';
import BlogArticle from './BlogArticle';
import { SearchDataState } from '../../../../recoil/SearchDataState';

export default function BlogSearchArticle() {
  const searchArticleData = useRecoilValue(SearchDataState);

  console.log('검색데이터 =>', searchArticleData);

  return (
    <section className="float-left mt-14 xl:mt-10 z-10">
      {searchArticleData?.data?.map((el: any) => {
        const nickname = el.user.nickname;
        // ** created_at UTC 날짜 가공하여, 며칠 전인지 구하는 로직
        // 1. created_at 날짜를 new Date 객체로 변환 (한국표준시로 자동변경됨)
        // 2. 지금 날짜와 created_at의 날짜의 오차를 구해서, date만 구해야 함
        const dateString = el.created_at;
        const utcToKst = new Date(dateString);
        const createdY = utcToKst.getFullYear();
        const createdM = utcToKst.getMonth();
        const createdD = utcToKst.getDate();

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const date = now.getDate();

        const createdDate = new Date(createdY, createdM, createdD);
        const nowDate = new Date(year, month, date);

        const cd_nd = nowDate.getTime() - createdDate.getTime(); // 오차구하기
        const blogDate = cd_nd / (1000 * 60 * 60 * 24); // 밀리초로 나눔

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
