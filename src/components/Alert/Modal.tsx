import React from 'react';

const Swal = require('sweetalert2');

//(navigate)버튼 2개 가진 경고창 함수나 이벤트를 인자로 받음
export const failedNavigateAlert = (
  title: string,
  text: string,
  where: string,
  navigate: any
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonText: 'Login',
    confirmButtonColor: '#e35c02',
    focusDeny: true,
    showDenyButton: true,
    denyButtonText: 'Cancel',
    denyButtonColor: '#707070',
    showCancelButton: false,
  }).then((result: any) => {
    result.isConfirmed && navigate(where);
  });
};

//(axios)버튼 2개 가진 경고창 함수나 이벤트를 인자로 받음
export const failedAxiosAlert = (
  title: string,
  text: string,
  axiosFunction: () => void
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonText: 'Delete',
    confirmButtonColor: '#e35c02',
    focusDeny: true,
    showDenyButton: true,
    denyButtonText: 'Cancel',
    denyButtonColor: '#707070',
    showCancelButton: false,
  }).then((result: any) => {
    result.isConfirmed && axiosFunction();
  });
};

//일반 경고창 버튼 ok 한개
export const warningAlert = (title: string, text: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#e35c02',
    showCancelButton: false,
  });
};

//확인 알림창
export const infoAlert = (title: string, text: string) => {
  Swal.fire(title, text, 'info');
};

export const autoCloseAlert = (icon: string, title: string) => {
  Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const successAlert = (title: string, text: string) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#e35c02',
  });
};
