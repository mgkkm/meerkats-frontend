import BlogMainTop from './components/BlogMainTop';
import BlogDropDown from './components/BlogDropDown';
import BlogSpoToggle from './components/BlogSpoToggle';
import BlogRenderArticle from './components/BlogRenderArticle';
import BlogScrollArticle from './components/BlogScrollArticle';

export default function BlogMain() {
  // *** to do 기능 ***
  // 무한 스크롤 기능 (완료. 추후 리팩토링.)
  // 조건부 렌더링 (토글=완료 / my blog / 카테고리 필터링)
  // 좋아요 기능 (서윤)
  // 검색 기능 (나중에 내가 함)

  return (
    <div className="mt-24 px-32 py-28 bg-mkBg">
      <section className="container xl">
        <BlogMainTop />
        <div className="flex items-center my-5 mx-2">
          <BlogDropDown />
          {/* <BlogSpoToggle setIsSpo={setIsSpo} /> */}
          <BlogSpoToggle />
        </div>
      </section>
      {/* 나중에 2개 한 컴포넌트에서 받을 수 있게 리팩토링 필요 */}
      <div className="m-auto">
        <BlogRenderArticle />
        <BlogScrollArticle />
      </div>
    </div>
  );
}
