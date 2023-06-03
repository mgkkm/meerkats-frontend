import { useRecoilValue } from 'recoil';
import { SearchDataState } from '../../../recoil/SearchDataState';
import BlogMainTop from './components/BlogMainTop';
import { BlogDropDown } from './components/BlogDropDown';
import { BlogSpoToggle } from './components/BlogSpoToggle';
import BlogSearchArticle from './components/BlogSearchArticle';
import BlogRenderArticle from './components/BlogRenderArticle';
import BlogScrollArticle from './components/BlogScrollArticle';
import { closeSearchState } from '../../../recoil/SearchState';

export default function BlogMain() {
  const searchArticleData = useRecoilValue(SearchDataState);
  const closeBtn = useRecoilValue(closeSearchState);

  // *** to do 기능 ***
  // 조건부 렌더링 (토글=완료 / my blog=완료 / 카테고리 필터링)

  return (
    <div className="px-4 sm:px-10 pt-40 sm:pt-48 pb-28 bg-mkBg">
      <section className="px-8 lg:mb-14 xl:px-14">
        <BlogMainTop />
        <div className="flex justify-between sm:justify-normal items-center my-5 mx-2">
          <BlogDropDown />
          <BlogSpoToggle />
        </div>
      </section>
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
