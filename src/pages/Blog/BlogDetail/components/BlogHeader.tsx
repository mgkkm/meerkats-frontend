import LikeScrapBtn from '../../../../components/LikeScrapBtn/LikeScrapBtn';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { currentUserIdState } from '../../../../recoil/JwtDecode';
import { useRecoilValue } from 'recoil';
import { blogDetailState } from '../../../../recoil/BlogDetailState';
import { displayCreatedAt } from '../../../../components/CreatedAt/CreatedAt';
import { useNavigate } from 'react-router-dom';

export default function BlogHeader() {
  const currentUserId = useRecoilValue(currentUserIdState);
  const blogDetailData = useRecoilValue(blogDetailState);
  const navigate = useNavigate();

  const { id, title, created_at, category, spoiler_info_id, user } =
    blogDetailData;

  const postId = id;

  const updateHandler = () => {
    navigate(`/edit/${id}`);
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
      <div className="flex justify-between items-center">
        <p className="text-3xl font-semibold mt-10 mb-3">{title}</p>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <HiOutlineDotsHorizontal
              className={`text-xl hover:cursor-pointer ${
                currentUserId !== user.id && 'hidden'
              }`}
            />
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
            <li>
              <p className="text-sm flex justify-center active:bg-mkOrange">
                삭제
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-sm">by {user.nickname}</span>
          <span className="px-3">·</span>
          <span className="text-sm text-mkGray">
            {created_at && displayCreatedAt(created_at)}
          </span>
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
