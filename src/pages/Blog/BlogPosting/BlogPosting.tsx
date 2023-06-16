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
import { currentUserIdState } from '../../../recoil/JwtDecode';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function BlogPosting() {
  const token = useRecoilValue(tokenState);
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  const currentUserId = useRecoilValue(currentUserIdState);
  const setBlogPost = useSetRecoilState(blogPostState);
  const [loading, error, data, fetchData] = useAxios();

  const location = useLocation();
  const param = useParams();

  if (location.pathname.includes('/edit')) {
    setIsEdit(true);
  } else {
    setIsEdit(false);
  }

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
          userId: currentUserId,
          title: res.data.postDetails.title,
          content: res.data.postDetails?.content,
          categoryId: res.data.postDetails.category.id,
          spoilerInfoId: res.data.postDetails.spoiler_info_id,
          thumbnail:
            'https://velog.velcdn.com/images/ijinkyung/post/20935c86-64b5-4b1d-abbc-01ed7d5e0e7d/image.jpg',
        });
      });
  }, [isEdit]);

  return (
    <div className="container  h-full ">
      <div className="m-auto pt-24  pb-5 bg-white xs:px-6 sm:px-10 md:px-16 xl:px-20 xl:w-3/4">
        <Title />
        <Category />
        <CustomEditor />
        <PostBtn />
      </div>
    </div>
  );
}
