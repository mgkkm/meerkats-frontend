import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LikeScrapBtn from '../../../../components/LikeScrapBtn/LikeScrapBtn';
import { numberSelector } from '../../../../recoil/NumberState';

export default function BlogFooter() {
  const params = useParams();
  const postId = params.id;

  const likeN = useRecoilValue(numberSelector(`blogLike${postId}`));
  const scrapN = useRecoilValue(numberSelector(`blogScrap${postId}`));
  const commentN = useRecoilValue(numberSelector(`blogComment${postId}`));

  return (
    <div className="mt-16 mb-5 text-sm flex justify-end items-center">
      <span className="mr-1">
        <LikeScrapBtn
          postType="blog"
          btnType="Like"
          postId={`${postId}`}
          btnSize="text-lg"
        />
      </span>
      <span className="mr-5">{likeN}</span>
      <span className="mr-1">
        <LikeScrapBtn
          postType="blog"
          btnType="Scrap"
          postId={`${postId}`}
          btnSize="text-lg"
        />
      </span>
      <span className="mr-5">{scrapN}</span>
      <span className="mr-1">
        <FaRegCommentDots className="text-lg" />
      </span>
      <span>{commentN}</span>
    </div>
  );
}
