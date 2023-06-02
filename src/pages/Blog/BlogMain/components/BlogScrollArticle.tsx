import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';
import { scrollArticleDataState } from '../../../../recoil/ArticleDataState';
import useAxios from '../../../../hooks/useAxios';
import { BlogArticle } from './BlogArticle';
import { blogCreatedAt } from '../../../../components/CreatedAt/CreatedAt';
import { myBlogBtnState } from '../../../../recoil/MyBlogBtnState';

type elType = {
  data: {
    nonSpoPostData: [
      category_id: number,
      commentCount: number,
      created_at: string,
      id: number,
      likeCount: number,
      spoiler_info_id: number,
      thumbnail: string,
      title: string,
      user: {
        nickname: string;
      }
    ];
    spoPostData: [
      category_id: number,
      commentCount: number,
      created_at: string,
      id: number,
      likeCount: number,
      spoiler_info_id: number,
      thumbnail: string,
      title: string,
      user: {
        nickname: string;
      }
    ];
  };
};

// type elelType = {
//   category_id: number;
//   commentCount: number;
//   created_at: string;
//   id: number;
//   likeCount: number;
//   spoiler_info_id: number;
//   thumbnail: string;
//   title: string;
//   user: {
//     nickname: string;
//   };
// };

// Intersection Observer API 를 활용한 무한스크롤 페이지네이션
export default function BlogScrollArticle() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const pageEnd = useRef<any>();
  const [articles, setArticles] = useRecoilState(scrollArticleDataState);
  const myBlogBtn = useRecoilValue(myBlogBtnState);
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
      <section className="flex flex-col lg:flex-row lg:flex-wrap justify-center m-auto">
        {myBlogBtn ||
          articles?.map((el: elType) => {
            const nonSpoData = el?.data?.nonSpoPostData;
            const spoData = el?.data?.spoPostData;
            const spoToggleData = toggle ? spoData : nonSpoData;
            return spoToggleData?.map((el: any) => {
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
