import React, { useEffect, useState } from 'react';
import Category from './components/Category';
import CustomEditor from './components/CustomEditor';
import PostBtn from './components/PostBtn';
import Title from './components/Title';
import useAxios from '../../hooks/useAxios';
import { useSetRecoilState } from 'recoil';
import { blogPostState } from '../../recoil/BlogPostState';

export default function BlogPosting() {
  const [isUpdate, setIsUpdate] = useState(false);
  const setBlogPost = useSetRecoilState(blogPostState);
  const [loading, error, data, fetchData] = useAxios();

  useEffect(() => {
    fetchData({
      //⭐️TODO : 35번대신 글 번호로 입력하기
      url: 'https://www.meerkats.monster/blog/35',
      method: 'POST',
      headers: {
        'Content-Type': `application/json`,
      },
      data: { userId: 3 },
    }).then((res: any) => {
      setBlogPost({
        userId: 3,
        title: res.data.postDetails.title,
        content: res.data.postDetails.content,
        categoryId: res.data.postDetails.category_id,
        spoilerInfoId: res.data.postDetails.spoiler_info_id,
        thumbnail: '썸네일',
      });
      res.data.postDetails.title.length > 1 && setIsUpdate(true);
    });
  }, []);

  return (
    <div className=" container md mt-24 h-full ">
      <div className="w-3/4 m-auto px-20 py-5 bg-white">
        <Title />
        <Category />
        <CustomEditor />
        <PostBtn isUpdate={isUpdate} />
      </div>
    </div>
  );
}
