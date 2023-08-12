import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../recoil/ToggleState';
import { numberSelector } from '../../recoil/NumberState';
import useAxios from '../../hooks/useAxios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import {
  autoCloseAlert,
  failedNavigateAlert,
  warningAlert,
} from '../Alert/Modal';

interface LikeScrapType {
  postType: string;
  btnType: string;
  postId: string;
  btnSize: string;
}

interface LikeScrapResultType {
  message: string;
}

interface IconMapType {
  [key: string]: {
    [key: string]: IconType;
  };
}

type IconType = React.ElementType;

export default function LikeScrapBtn({
  postType,
  btnType,
  postId,
  btnSize,
}: LikeScrapType) {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [, , , fetchData] = useAxios();

  const token = sessionStorage.getItem('token');

  const type = postType + btnType + postId;

  const [isClicked, setIsClicked] = useRecoilState(toggleSelector(type));
  const setCounterN = useSetRecoilState(numberSelector(type));

  const clickedValue = String(isClicked);

  const iconMap: IconMapType = {
    Like: {
      true: FaHeart,
      false: FaRegHeart,
      undefined: FaRegHeart,
    },
    Scrap: {
      true: FaBookmark,
      false: FaRegBookmark,
      undefined: FaRegBookmark,
    },
  };

  const Icon = iconMap[btnType][clickedValue];

  const LikeScrapHandler = () => {
    if (!token) {
      failedNavigateAlert(
        '로그인이 필요합니다.',
        '로그인 후 다시 시도해 주세요.',
        '/login',
        navigate
      );
      return;
    }
    postBtnState();
  };

  let fetchUrl = '';
  if (postType === 'blog') {
    fetchUrl = `${BASE_URL}/blog/post${btnType}/${postId}`;
  } else if (postType === 'movie') {
    fetchUrl = `${BASE_URL}/movie/${postId}/likes`;
  }

  const postBtnState = () => {
    fetchData({
      url: fetchUrl,
      method: 'POST',
      headers: {
        Authorization: token,
      },
    }).then((result: LikeScrapResultType) => {
      if (result) {
        if (result.message.includes('SUCCESS')) {
          setCounterN(1);
          setIsClicked(true);
          if (result.message.includes('create')) {
            autoCloseAlert('success', '저장되었습니다.');
          } else if (result.message.includes('delete')) {
            autoCloseAlert('success', '삭제되었습니다.');
          }
        }
      } else {
        warningAlert('오류가 발생했습니다.', '잠시 후 다시 시도해 주세요.');
      }
    });
  };

  return (
    <Icon
      className={`${btnSize} ${
        Icon === FaRegHeart || Icon === FaRegBookmark
          ? 'text-black hover:text-mkOrange hover:cursor-pointer'
          : 'text-mkOrange hover:opacity-80 hover:cursor-pointer'
      }`}
      onClick={LikeScrapHandler}
    />
  );
}
