import React from 'react';
import { HiLink } from 'react-icons/hi';
import { autoCloseAlert } from '../Alert/Modal';

export default function CopyBtn() {
  const currentUrl = window.location.href;

  const copyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      autoCloseAlert('success', 'Copied!');
    } catch (e) {
      autoCloseAlert('error', 'Sorry! Try again.');
    }
  };

  return (
    <HiLink
      className="text-2xl hover:cursor-pointer"
      onClick={() => {
        copyClipBoard(currentUrl);
      }}
    />
  );
}
