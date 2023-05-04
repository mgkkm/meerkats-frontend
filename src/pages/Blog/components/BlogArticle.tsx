import React from 'react';

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

export default function BlogArticle(props: BlogArticleProps) {
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
    >
      <div className="blogThumbnail">
        <img src={thumbnail} alt="썸네일" className="w-full" />
      </div>
      <div className="blogText">
        <h1 className="blogTextTitle xl:mt-8">{title}</h1>
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
            <img
              src="/images/blog/blogMain/heart.png"
              alt="heart"
              className="blogLikeImg"
            />
            <span className="text-base">{weeklyLikeCount}</span>
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
}
