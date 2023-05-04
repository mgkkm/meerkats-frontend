import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useRecoilValue } from 'recoil';
import { blogPostState } from '../../../../recoil/BlogPostState';
import { useNavigate } from 'react-router-dom';
import {
  failedNavigateAlert,
  infoAlert,
} from '../../../../components/Alert/Modal';

interface updateProps {
  isUpdate: boolean;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function PostBtn({ isUpdate }: updateProps) {
  const [loading, error, data, fetchData] = useAxios();
  const blogPost = useRecoilValue(blogPostState);
  const navigate = useNavigate();

  const backClickHandler = () => {
    navigate(-1);
  };

  const clickHandler = () => {
    fetchData({
      url: `${BASE_URL}/blog/${isUpdate && 35}`,
      method: isUpdate ? 'PATCH' : 'POST',
      headers: {
        //⭐️ TODO : 토큰 추가하기
        'Content-Type': `application/json`,
      },
      data: blogPost,
    }).then((res: any) => {
      if (res.message.includes('SUCCESS')) {
        infoAlert('Success Update ! ', 'Move to the Blog Detail Page');
        navigate(`${isUpdate ? '/blogDetail' : '/blogMain'}`);
      } else {
        failedNavigateAlert(
          'Login Required',
          'Please login and try again.',
          './login',
          navigate
        );
      }
    });
  };

  return (
    <div className="flex justify-between ">
      <button onClick={backClickHandler} className="btn btn-ghost">
        <i className="fa-solid fa-arrow-left mr-2.5" />
        <span>Exit</span>
      </button>
      <button
        onClick={() => clickHandler()}
        className="btn bg-mkOrange border-mkOrange hover:bg-mkDarkOrange hover:border-mkDarkOrange"
      >
        {isUpdate ? 'Update' : 'Post'}
      </button>
    </div>
  );
}
