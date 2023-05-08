import React from 'react';
import { useRecoilValue } from 'recoil';
import { blogDetailState } from '../../../../recoil/BlogDetailState';
import parse from 'html-react-parser';

export default function BlogContent() {
  const blogDetailData = useRecoilValue(blogDetailState);

  return (
    <div className="mt-16">
      <div>
        <p>{parse(blogDetailData.content)}</p>
      </div>
    </div>
  );
}
