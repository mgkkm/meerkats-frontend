import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../recoil/ToggleState';
import { numberSelector } from '../../recoil/NumberState';
import useAxios from '../../hooks/useAxios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { currentUserIdState } from '../../recoil/JwtDecode';

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

  const currentUserId = useRecoilValue(currentUserIdState);

  const type = postType + btnType + postId;

  const [isClicked, setIsClicked] = useRecoilState(toggleSelector(type));
  const setCounterN = useSetRecoilState(numberSelector(type));

  const Swal = require('sweetalert2');

  const failedAlert = (errorType: string) => {
    if (errorType === 'loginRequired') {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login and try again.',
        icon: 'warning',
        confirmButtonText: 'Login',
        confirmButtonColor: '#e35c02',
        focusDeny: true,
        showDenyButton: true,
        denyButtonText: 'Cancel',
        denyButtonColor: '#707070',
        showCancelButton: false,
      }).then((result: any) => {
        result.isConfirmed && navigate('/login');
      });
    } else {
      Swal.fire({
        title: 'Something went wrong!',
        text: 'Please try again.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e35c02',
        showCancelButton: false,
      });
    }
  };

  const BtnClick = () => {
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
    fetchUrl = `127.0.0.1:3000/movie/${postId}/likes`;
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
      const messageData = (result?.message).split(' ');
      const response = messageData[messageData.length - 1];
      if (response === 'SUCCESS') {
        setCounterN(1);
        setIsClicked(true);
      } else {
        failedAlert('failed');
      }
    });
  };

  const iconMap: IconMapType = {
    Like: {
      true: FaHeart,
      false: FaRegHeart,
    },
    Scrap: {
      true: FaBookmark,
      false: FaRegBookmark,
    },
  };

  const clickedValue = String(isClicked);
  const Icon = iconMap[btnType][clickedValue];

  return (
    <Icon
      className={`text-2xl ${
        Icon === FaRegHeart || Icon === FaRegBookmark
          ? 'text-black hover:text-mkOrange hover:cursor-pointer'
          : 'text-mkOrange hover:opacity-80 hover:cursor-pointer'
      }`}
      onClick={BtnClick}
    />
  );
}
