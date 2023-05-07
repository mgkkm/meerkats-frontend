import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../recoil/ToggleState';
import { numberSelector } from '../../recoil/NumberState';
import useAxios from '../../hooks/useAxios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { currentUserIdState } from '../../recoil/JwtDecode';
import { failedNavigateAlert, warningAlert } from '../Alert/Modal';

interface LikeScrapType {
  postType: string;
  btnType: string;
  postId: string;
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
}: LikeScrapType) {
  const navigate = useNavigate();

  const type = postType + btnType + postId;

  const currentUserId = useRecoilValue(currentUserIdState);

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

  const failedAlert = (errorType: string) => {
    if (errorType === 'loginRequired') {
      failedNavigateAlert(
        'Login Required',
        'Please login and try again.',
        '/login',
        navigate
      );
    } else {
      warningAlert('Something went wrong!', 'Please try again.');
    }
  };

  const LikeScrapHandler = () => {
    if (currentUserId === 0) {
      failedAlert('loginRequired');
      return;
    }
    postBtnState();
  };

  let fetchUrl = '';
  if (postType === 'blog') {
    fetchUrl = `https://www.meerkats.monster/blog/post${btnType}/${postId}`;
  } else if (postType === 'movie') {
    fetchUrl = `https://www.meerkats.monster/movie/${postId}/likes`;
  }

  const token = localStorage.getItem('token');

  const [loading, error, data, fetchData] = useAxios();

  const postBtnState = () => {
    fetchData({
      url: fetchUrl,
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': `application/json`,
      },
    }).then((result: LikeScrapResultType) => {
      if (result) {
        const messageData = result.message.split(' ');
        const response = messageData[messageData?.length - 1];
        if (response === 'SUCCESS') {
          setCounterN(1);
          setIsClicked(true);
        }
      } else {
        failedAlert('failed');
      }
    });
  };

  return (
    <Icon
      className={`text-2xl ${
        Icon === FaRegHeart || Icon === FaRegBookmark
          ? 'text-black hover:text-mkOrange hover:cursor-pointer'
          : 'text-mkOrange hover:opacity-80 hover:cursor-pointer'
      }`}
      onClick={LikeScrapHandler}
    />
  );
}
