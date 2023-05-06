import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { numberSelector } from '../../../../recoil/NumberState';

export default function BlogFooter() {
  const params = useParams();
  const postId = params.id;

  const likeN = useRecoilValue(numberSelector(`blogLike${postId}`));
  const scrapN = useRecoilValue(numberSelector(`blogScrap${postId}`));
  const commentN = useRecoilValue(numberSelector(`blogComment${postId}`));

  return (
    <div className="py-10 text-sm border border-x-transparent border-t-transparent border-b-mkLightGray flex justify-end">
      <span className="mr-1">Like</span>
      <span className="mr-5">{likeN}</span>
      <span className="mr-1">Scrap</span>
      <span className="mr-5">{scrapN}</span>
      <span className="mr-1">Comment</span>
      <span>{commentN}</span>
    </div>
  );
}
