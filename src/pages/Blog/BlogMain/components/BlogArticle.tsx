import { memo, useEffect } from 'react';
import LikeScrapBtn from '../../../../components/LikeScrapBtn/LikeScrapBtn';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { numberState } from '../../../../recoil/NumberState';
import { toggleState } from '../../../../recoil/ToggleState';

interface BlogArticleProps {
  id: number;
  title: string;
  thumbnail: string;
  blogDate: number;
  commentCount: number;
  nickname: string;
  likeCount: number;
  isLikedByThisUser: boolean;
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
    likeCount,
    isLikedByThisUser,
    spoiler_info_id,
  } = props;

  const setLikeToggle = useSetRecoilState(toggleState(`blogLike${id}`));
  const [likeNumber, setLikeNumber] = useRecoilState(
    numberState(`blogLike${id}`)
  );

  useEffect(() => {
    setLikeNumber(likeCount);
    setLikeToggle(isLikedByThisUser);
  }, []);

  const toBlogDetail = () => {
    navigate(`/blogDetail/${id}`);
  };

  return (
    <article key={id} className="blogPost shadow-sm">
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
              btnSize="text-xl xs:text-lg"
            />
            <span className="text-base xs:text-sm ml-2 xs:ml-[0.4rem]">
              {likeNumber || 0}
            </span>
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
