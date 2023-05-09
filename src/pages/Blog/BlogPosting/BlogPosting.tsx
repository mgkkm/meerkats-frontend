import { useEffect } from 'react';
import Category from './components/Category';
import CustomEditor from './components/CustomEditor';
import PostBtn from './components/PostBtn';
import Title from './components/Title';
import useAxios from '../../../hooks/useAxios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { blogPostState, isEditState } from '../../../recoil/BlogPostState';
import { useLocation, useParams } from 'react-router-dom';
import { tokenState } from '../../../recoil/TokenState';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function BlogPosting() {
  const token = useRecoilValue(tokenState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const setBlogPost = useSetRecoilState(blogPostState);
  const [loading, error, data, fetchData] = useAxios();

  const location = useLocation();
  const param = useParams();

  if (location.pathname.includes('/edit')) setIsEdit(true);

  useEffect(() => {
    isEdit &&
      fetchData({
        url: `${BASE_URL}/blog/${param.id}`,
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': `application/json`,
        },
        data: { userId: 3 },
      }).then((res: any) => {
        setBlogPost({
          userId: 3,
          title: res.data.postDetails.title,
          content: res.data.postDetails.content,
          categoryId: res.data.postDetails.category.id,
          spoilerInfoId: res.data.postDetails.spoiler_info_id,
          thumbnail: '썸네일',
        });
      });
  }, [isEdit]);

  return (
    <div className=" container md pt-24 h-full ">
      <div className="w-3/4 m-auto px-20 py-5 bg-white">
        <Title />
        <Category />
        <CustomEditor />
        <PostBtn />
      </div>
    </div>
  );
}
