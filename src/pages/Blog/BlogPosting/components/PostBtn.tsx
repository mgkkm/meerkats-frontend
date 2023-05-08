import React from 'react';
import useAxios from '../../../../hooks/useAxios';
import { useRecoilValue } from 'recoil';
import { blogPostState, isEditState } from '../../../../recoil/BlogPostState';
import { useNavigate, useParams } from 'react-router-dom';
import {
  failedNavigateAlert,
  infoAlert,
} from '../../../../components/Alert/Modal';
import { tokenState } from '../../../../recoil/TokenState';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function PostBtn() {
  const isEdit = useRecoilValue(isEditState);
  const blogPost = useRecoilValue(blogPostState);
  const token = useRecoilValue(tokenState);
  const [loading, error, data, fetchData] = useAxios();

  const navigate = useNavigate();
  const param = useParams();

  const backClickHandler = () => navigate(-1);

  const clickHandler = () => {
    fetchData({
      url: `${BASE_URL}/blog${isEdit ? `/${param.id}` : ''}`,
      method: isEdit ? 'PATCH' : 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
      data: blogPost,
    }).then((res: any) => {
      if (res.message.includes('SUCCESS')) {
        infoAlert('Success Update ! ', 'Move to the Blog Detail Page');
        navigate(`${isEdit ? '/blogDetail' : '/blogMain'}`);
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
        {isEdit ? 'Update' : 'Post'}
      </button>
    </div>
  );
}
