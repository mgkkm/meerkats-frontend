import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useRecoilValue } from 'recoil';
import { blogPostState } from '../../../recoil/BlogPostState';
import { useNavigate } from 'react-router-dom';
const Swal = require('sweetalert2');

interface updateProps {
  isUpdate: boolean;
}

export default function PostBtn({ isUpdate }: updateProps) {
  const [loading, error, data, fetchData] = useAxios();
  const blogPost = useRecoilValue(blogPostState);
  const navigate = useNavigate();

  const backClickHandler = () => {
    navigate(-1);
  };

  const clickHandler = () => {
    isUpdate
      ? fetchData({
          url: 'https://www.meerkats.monster/blog/35',
          method: 'PATCH',
          headers: {
            'Content-Type': `application/json`,
          },
          data: blogPost,
        }).then((res: any) => {
          res.message.includes('SUCCESS') &&
            Swal.fire(
              'Success Update ! ',
              'Move to the Blog Detail Page',
              'info'
            );
          navigate('/blogDetail');
        })
      : fetchData({
          url: 'https://www.meerkats.monster/blog',
          method: 'POST',
          headers: {
            'Content-Type': `application/json`,
          },
          data: blogPost,
        }).then((res: any) => {
          res.message.includes('SUCCESS') &&
            Swal.fire({
              text: 'Post Successful !',
              buttonsStyling: false,
              confirmButtonText:
                '<span class="btn-confirm btn  bg-mkOrange border-mkOrange hover:bg-mkDarkOrange hover:border-mkDarkOrange text-white">CONFIRM</span>',
            });
          navigate('/blogMain');
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
