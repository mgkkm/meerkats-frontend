import React from 'react';
import { useRecoilValue } from 'recoil';
import { commentState } from '../../../recoil/CommentState';
// import DropDownBtn from './DropDownBtn';
import { currentUserIdState } from '../../../recoil/JwtDecode';
import { displayCreatedAt } from '../../CreatedAt/CreatedAt';

export default function CommentList() {
  const currentUserId = useRecoilValue(currentUserIdState);
  const commentData = useRecoilValue(commentState);

  return (
    <div>
      {commentData?.map(({ commentId, content, user, created_at }) => {
        return (
          <div
            className={`commentBox border border-x-transparent border-t-transparent border-b-mkLightGray pt-5 pb-8 relative ${
              user.id === currentUserId &&
              'hover:bg-gray-50 hover:cursor-pointer'
            }`}
            key={commentId}
          >
            <div className="px-5">
              <div className="flex items-center mb-3">
                <p className="text-sm font-semibold py-1">{user.nickname}</p>
                <span className="px-2">·</span>
                <p className="text-mkGray text-xs py-1">
                  {created_at && displayCreatedAt(created_at)}
                </p>
              </div>
              {user.id === currentUserId && (
                <div className="absolute top-5 right-5">
                  {/* <DropDownBtn
                    content={content}
                    commentId={commentId}
                    user={user}
                  /> */}
                </div>
              )}
              <p className="text-sm">{content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
