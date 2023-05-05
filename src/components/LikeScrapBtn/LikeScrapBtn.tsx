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
    // if (currentUserId === 0) {
    //   failedAlert('LoginRequired');
    //   return;
    // }
    postBtnState();
  };

  let fetchUrl = '';
  if (postType === 'blog') {
    fetchUrl = `https://www.meerkats.monster/blog/post${btnType}/${postId}`;
  } else if (postType === 'movie') {
    fetchUrl = `https://www.meerkats.monster/movie/${postId}/likes`;
  }

  // 승기님 엔드 포인트 Like 로 수정 요청해야 함
  // fetchUrl = `127.0.0.1:3000/movie/${postId}/${btnType}` 이렇게 수정하고 싶음

  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY4MzAyOTk1OX0.UXy6D9MtPSWIlIdeC-XehVhqkC2TcXqm6oE0Oi-3EZs';

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY4MzIwMTc3MH0.CcSqdtSLNHjdaTbcoP_JfKJmjMerUDKx7NZR-z37O0A';

  // 통신 테스트를 위한 임시 토큰
  // const token = localStorage.getItem('token');

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
        const messageData = result?.message?.split(' ');
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

  const iconMap: IconMapType = {
    Like: {
      true: FaHeart,
      false: FaRegHeart,
      undefined: FaRegHeart,
    },
    Scrap: {
      true: FaBookmark,
      false: FaRegBookmark,
      undefined: FaRegHeart,
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
