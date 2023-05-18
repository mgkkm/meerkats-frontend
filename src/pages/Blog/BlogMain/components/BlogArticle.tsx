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
  likeCount: number;
  spoiler_info_id: number;
}

// likeCount 로 바꾸기

export const BlogArticle = memo((props: BlogArticleProps) => {
  const navigate = useNavigate();

  const {
    id,
    thumbnail,
    title,
    blogDate,
    commentCount,
    nickname,
    likeCount,
    spoiler_info_id,
  } = props;

  const toBlogDetail = () => {
    navigate(`/blogDetail/${id}`);
  };

  return (
    <article
      key={id}
      className="blogPost shadow-sm xl:mx-[1.6rem] xl:my-[2rem] xl:pb-2 2xl:pb-2"
    >
      <div className="blogThumbnail cursor-pointer" onClick={toBlogDetail}>
        <img src={thumbnail} alt="썸네일" className="w-full" />
      </div>
      <div className="blogText">
        <h1 className="blogTextTitle cursor-pointer" onClick={toBlogDetail}>
          {title}
        </h1>
        <p className="blogTextInfo text-mkGray">
          {blogDate}일 전 • {commentCount}개의 댓글
        </p>
        <hr />
        <div className="blogTextBottom">
          <span>
            by <span className="font-semibold">{nickname}</span>
          </span>
          <div className="blogLike">
            <LikeScrapBtn
              postType="blog"
              btnType="Like"
              postId={`${id}`}
              btnSize="text-xl"
            />
            <span className="text-base ml-2">{likeCount}</span>
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
