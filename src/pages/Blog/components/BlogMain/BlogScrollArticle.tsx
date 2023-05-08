import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';
import useAxios from '../../../../hooks/useAxios';
import { BlogArticle } from './BlogArticle';

// Intersection Observer API 를 활용한 무한스크롤 페이지네이션
export default function BlogScrollArticle() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const pageEnd = useRef<any>();
  const [articles, setArticles] = useState([] as any); // article list
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [load, setLoad] = useState<boolean>(false); // 로딩 성공, 실패를 담을 sstate
  let [offset, setOffset] = useState<number>(6); // offset 상태관리
  const toggle = useRecoilValue(toggleSelector('spo'));

  const axiosArticles = async (page: number) => {
    fetchData({
      url: `${BASE_URL}/blog/main/post?take=6&skip=${offset}&spoilerInfoId=${
        toggle ? 1 : 2
      }`,
    }).then((res: any) => {
      setArticles((prev: any) => [...prev, res]);
      setLoad(true);
      setOffset(offset + 6);
    });
  };

  useEffect(() => {
    axiosArticles(page);
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (load) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      // observer 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [load, setLoad]);

  return (
    <>
      <section>
        {articles?.map((el: any) => {
          console.log(articles);
          const nonSpoData = el.data.nonSpoPostData;
          const spoData = el?.data?.spoPostData;
          const spoToggleData = toggle ? spoData : nonSpoData;
          return spoToggleData.map((el: any) => {
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
          });
        })}
      </section>

      {/* observer */}
      <div
        className="float-left w-full h-10 pt-5 mb-5 text-center text-xl text-mkBg"
        ref={pageEnd}
      >
        observer
      </div>
    </>
  );
}
