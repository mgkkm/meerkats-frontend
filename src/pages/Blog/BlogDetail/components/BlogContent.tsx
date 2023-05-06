import React from 'react';
import { useRecoilValue } from 'recoil';
import { blogDetailState } from '../../../../recoil/BlogDetailState';

export default function BlogContent() {
  const blogDetailData = useRecoilValue(blogDetailState);

  return (
    <div className="mt-20">
      <div className="blogContent">
        <p>{blogDetailData.content}</p>
      </div>
    </div>
  );
}
