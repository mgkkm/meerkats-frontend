import useAxios from '../../../../hooks/useAxios';
import { useRecoilValue } from 'recoil';
import { blogPostState, isEditState } from '../../../../recoil/BlogPostState';
import { useNavigate, useParams } from 'react-router-dom';
import {
  failedNavigateAlert,
  infoAlert,
} from '../../../../components/Alert/Modal';
import { warningAlert } from '../../../../components/Alert/Modal';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function PostBtn() {
  const isEdit = useRecoilValue(isEditState);
  const blogPost = useRecoilValue(blogPostState);
  const [, , , fetchData] = useAxios();
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();
  const param = useParams();

  const backClickHandler = () => navigate(-1);

  const clickHandler = () => {
    if (blogPost.title === '') {
      warningAlert('', '제목을 입력해 주세요.');
      return;
    } else if (blogPost.categoryId === 0 && blogPost.spoilerInfoId === 0) {
      warningAlert('', '카테고리를 선택해 주세요.');
      return;
    } else if (blogPost.spoilerInfoId === 0) {
      warningAlert('', '스포 여부를 선택해 주세요.');
      return;
    } else if (blogPost.content === '') {
      warningAlert('', '내용을 입력해 주세요.');
      return;
    }

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
        infoAlert('', '포스트가 등록되었습니다.');
        navigate(`${isEdit ? `/blogDetail/${param.id}` : '/blogMain'}`);
      } else {
        failedNavigateAlert(
          '로그인이 필요합니다.',
          '로그인 후 다시 시도해 주세요.',
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
