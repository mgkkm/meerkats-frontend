import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CommentData, commentState } from '../../../recoil/CommentState';
import DropDownBtn from './DropDownBtn';
import { currentUserIdState } from '../../../recoil/JwtDecode';
import { displayCreatedAt } from '../../CreatedAt/CreatedAt';
import useAxios from '../../../hooks/useAxios';
import { renderingState } from '../../../recoil/BlogPostState';
import { numberState } from '../../../recoil/NumberState';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface CommentListData {
  data: CommentData[];
}

export default function CommentList() {
  const param = useParams();
  const location = useLocation();
  const [loading, error, data, fetchData] = useAxios();

  const rendering = useRecoilValue(renderingState);
  const [commentData, setCommentData] = useRecoilState(commentState);
  const setCommentN = useSetRecoilState(numberState(`blogComment${param.id}`));

  const currentUserId = useRecoilValue(currentUserIdState);

  const getAxiosUrl = location.pathname.includes('blogDetail')
    ? `${BASE_URL}/blog/${param.id}`
    : `${BASE_URL}/movie/${param.id}/comments`;

  useEffect(() => {
    fetchData({
      url: getAxiosUrl,
    }).then((data: CommentListData) => {
      setCommentData(data.data);
      setCommentN(data.data.length);
    });
  }, [rendering]);

  return (
    <div>
      {commentData?.map(({ commentId, content, user, created_at }) => {
        return (
          <div
            className={`border border-x-transparent border-t-transparent border-b-mkLightGray first:border-t-mkLightGray pt-5 pb-8 relative ${
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
                  <DropDownBtn
                    content={content}
                    commentId={commentId}
                    user={user}
                  />
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
