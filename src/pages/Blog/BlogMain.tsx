import { useRecoilValue } from 'recoil';
import { SearchDataState } from '../../recoil/SearchDataState';
import { toggleSelector } from '../../recoil/ToggleState';
import BlogMainTop from './components/BlogMain/BlogMainTop';
import { BlogDropDown } from './components/BlogMain/BlogDropDown';
import { BlogSpoToggle } from './components/BlogMain/BlogSpoToggle';
import BlogSearchArticle from './components/BlogMain/BlogSearchArticle';
import BlogRenderArticle from './components/BlogMain/BlogRenderArticle';
import BlogScrollArticle from './components/BlogMain/BlogScrollArticle';

export default function BlogMain() {
  const searchArticleData = useRecoilValue(SearchDataState);
  const closeBtn = useRecoilValue(toggleSelector('close'));

  // *** to do 기능 ***
  // 무한 스크롤 기능 (완료. 추후 리팩토링.)
  // 조건부 렌더링 (토글=완료 / my blog / 카테고리 필터링)
  // 좋아요 기능 (서윤)
  // 검색 기능 (완료.)

  return (
    <div className="px-32 pt-48 pb-28 bg-mkBg">
      <section className="container xl">
        <BlogMainTop />
        <div className="flex items-center my-5 mx-2">
          <BlogDropDown />
          {/* <BlogSpoToggle setIsSpo={setIsSpo} /> */}
          <BlogSpoToggle />
        </div>
      </section>
      {/* 나중에 중복되는 가공코드 한큐에 사용할 수 있게 리팩토링 필요 */}
      <div className="m-auto">
        {!closeBtn && <BlogSearchArticle />}
        {(searchArticleData.length === 0 || closeBtn === true) && (
          <BlogRenderArticle />
        )}
        {(searchArticleData.length === 0 || closeBtn === true) && (
          <BlogScrollArticle />
        )}
      </div>
    </div>
  );
}
