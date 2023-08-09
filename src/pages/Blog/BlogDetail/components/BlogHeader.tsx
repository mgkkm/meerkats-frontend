import LikeScrapBtn from '../../../../components/LikeScrapBtn/LikeScrapBtn';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { currentUserIdState } from '../../../../recoil/JwtDecode';
import { useRecoilValue } from 'recoil';
import { blogDetailState } from '../../../../recoil/BlogDetailState';
import { createdAt } from '../../../../components/CreatedAt/CreatedAt';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../../hooks/useAxios';
import {
  failedAxiosAlert,
  successAlert,
} from '../../../../components/Alert/Modal';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function BlogHeader() {
  const currentId = useRecoilValue(currentUserIdState);
  const blogDetailData = useRecoilValue(blogDetailState);
  const [, , , fetchData] = useAxios();
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const { id, title, created_at, category, spoiler_info_id, user } =
    blogDetailData;

  const postId = id;

  const updateHandler = () => {
    navigate(`/edit/${id}`);
  };

  const deleteHandler = () => {
    failedAxiosAlert(
      '삭제하시겠습니까?',
      '삭제 후에는 데이터를 복구할 수 없습니다.',
      () => {
        fetchData({
          url: `${BASE_URL}/blog/${postId}`,
          method: 'DELETE',
          headers: {
            Authorization: token,
            'Content-Type': `application/json`,
          },
        }).then((result: any) => {
          if (result.message.includes('SUCCESS')) {
            successAlert('삭제 완료', '포스트가 삭제되었습니다.');
            navigate('/blogMain');
          }
        });
      }
    );
  };

  return (
    <div className="pt-10 pb-12 border border-b-mkLightGray border-x-transparent border-t-transparent">
      <div>
        <span className="text-sm text-white bg-mkOrange rounded font-semibold px-1 py-[0.5px]">
          {SPOILER_ID_DATA[spoiler_info_id - 1]?.name}
        </span>
        <span className="px-3">·</span>
        <span className="text-sm border-2 border-b-mkOrange border-x-transparent border-t-transparent">
          {category?.name}
        </span>
      </div>
      <div className="flex justify-between items-center mt-10 mb-3">
        <p className="text-3xl font-semibold">{title}</p>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            {currentId === user.id && (
              <HiOutlineDotsHorizontal className="text-xl hover:cursor-pointer" />
            )}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box w-16"
          >
            <li onClick={updateHandler}>
              <p className="text-sm flex justify-center active:bg-mkOrange">
                수정
              </p>
            </li>
            <li onClick={deleteHandler}>
              <p className="text-sm flex justify-center active:bg-mkOrange">
                삭제
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-sm">by {user.nickname}</span>
          <div>
            <span className="px-3">·</span>
            <span className="text-sm text-mkGray">
              {created_at && createdAt(created_at)}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <LikeScrapBtn
            postType="blog"
            btnType="Like"
            postId={`${postId}`}
            btnSize="text-2xl"
          />
          <LikeScrapBtn
            postType="blog"
            btnType="Scrap"
            postId={`${postId}`}
            btnSize="text-2xl"
          />
        </div>
      </div>
    </div>
  );
}

const SPOILER_ID_DATA = [
  { id: 1, name: 'Spoiler' },
  { id: 2, name: 'Non Spoiler' },
];
