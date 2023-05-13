import { useRecoilValue } from 'recoil';
import { SearchDataState } from '../../recoil/SearchDataState';
import { toggleSelector } from '../../recoil/ToggleState';
import BlogMainTop from './BlogMain/BlogMainTop';
import { BlogDropDown } from './BlogMain/BlogDropDown';
import { BlogSpoToggle } from './BlogMain/BlogSpoToggle';
import BlogSearchArticle from './BlogMain/BlogSearchArticle';
import BlogRenderArticle from './BlogMain/BlogRenderArticle';
import BlogScrollArticle from './BlogMain/BlogScrollArticle';

export default function BlogMain() {
  const searchArticleData = useRecoilValue(SearchDataState);
  const closeBtn = useRecoilValue(toggleSelector('close'));

  // *** to do 기능 ***
  // 조건부 렌더링 (토글=완료 / my blog / 카테고리 필터링)

  return (
    <div className="px-32 pt-48 pb-28 bg-mkBg">
      <section className="container xl">
        <BlogMainTop />
        <div className="flex items-center my-5 mx-2">
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
