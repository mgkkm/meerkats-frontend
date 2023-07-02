import { HiLink } from 'react-icons/hi';
import { autoCloseAlert } from '../Alert/Modal';

export default function CopyBtn() {
  const currentUrl = window.location.href;

  const copyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      autoCloseAlert('success', '링크가 클립보드에 복사되었습니다.');
    } catch (e) {
      autoCloseAlert('error', '다시 시도해 주세요.');
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
