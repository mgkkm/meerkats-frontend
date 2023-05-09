import { memo } from 'react';
import LikeScrapBtn from '../../../../components/LikeScrapBtn/LikeScrapBtn';
import { useNavigate } from 'react-router-dom';

interface BlogArticleProps {
  id: number;
  title: string;
  thumbnail: string;
  blogDate: number;
  commentCount: number;
  nickname: string;
  weeklyLikeCount: number;
  spoiler_info_id: number;
}

export const BlogArticle = memo((props: BlogArticleProps) => {
  const navigate = useNavigate();

  const {
    id,
    thumbnail,
    title,
    blogDate,
    commentCount,
    nickname,
    weeklyLikeCount,
    spoiler_info_id,
  } = props;

  return (
    <article
      key={id}
      className="blogPost shadow-sm xl:mx-[1.6rem] xl:my-[2rem] xl:pb-2 2xl:pb-2"
      onClick={() => navigate(`/blogDetail/${id}`)}
    >
      <div className="blogThumbnail cursor-pointer">
        <img src={thumbnail} alt="썸네일" className="w-full" />
      </div>
      <div className="blogText">
        <h1 className="blogTextTitle cursor-pointer">{title}</h1>
        <p className="blogTextInfo text-mkGray">
          {blogDate}일 전 • {commentCount}개의 댓글
        </p>
        <hr />
        <div className="blogTextBottom">
          <span>
            by <span className="font-semibold">{nickname}</span>
          </span>
          <div className="blogLike">
            {/* 조아요 버튼 서윤님껄로 바꾸기 */}
            <LikeScrapBtn
              postType="blog"
              btnType="Like"
              postId={`${id}`}
              btnSize="text-xl"
            />
            <span className="text-base ml-2">{weeklyLikeCount}</span>
          </div>
        </div>
      </div>
      <div
        className={`spoTag bg-mkOrange ${
          spoiler_info_id === 1 ? 'block' : 'hidden'
        }`}
      >
        <span className="spoTxt">스포</span>
      </div>
    </article>
  );
});
