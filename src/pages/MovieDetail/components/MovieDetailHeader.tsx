import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import LikeScrapBtn from '../../../components/LikeScrapBtn/LikeScrapBtn';
import CopyBtn from '../../../components/CopyBtn/CopyBtn';
import { movieHeaderState } from '../../../recoil/MovieDetailState';
import parse from 'html-react-parser';

export default function MovieDetailHeader() {
  const params = useParams();
  const postId = params.id;

  const [moreArrowToggle, setMoreArrowToggle] = useState(false);

  const movieHeaderData = useRecoilValue(movieHeaderState);

  const {
    rating,
    name,
    category,
    region,
    running_time,
    release_date,
    director,
    actor,
    summary,
  } = movieHeaderData;

  const isBlank = (data: string) => {
    return !data || data === '' || data.split('분')[0] === '' ? '미정' : data;
  };

  const actorArray = isBlank(actor) === '미정' ? ['미정'] : actor.split(',');

  const handleMore = () => {
    setMoreArrowToggle(!moreArrowToggle);
  };

  return (
    <div className="px-5 py-5">
      <div className="flex justify-between relative">
        <div className="w-full">
          <div className="text-xl font-semibold mb-4 flex items-center justify-between">
            <div className="flex items-center">
              {!!rating?.id && (
                <img
                  className="h-6 mr-2"
                  src={`/images/movieDetail/movie${rating.id}.svg`}
                  alt="rating"
                />
              )}
              {name}
            </div>
          </div>
          <div className="info flex text-sm text-mkDarkGray mb-1">
            <p className="mr-3 w-7 font-semibold">소개</p>
            <p className="px-1.5">{isBlank(category.name)}</p>
            <p className="text-mkLightGray ml-2 mr-1">|</p>
            <p className="px-1.5">{isBlank(region?.name ?? region)}</p>
            <p className="text-mkLightGray ml-2 mr-1">|</p>
            <p className="px-1.5">{isBlank(running_time)}</p>
          </div>
          <div className="flex text-sm text-mkDarkGray">
            <p className="mr-3 w-7 font-semibold">개봉</p>
            <p className="px-1.5">{isBlank(release_date?.split('T')[0])}</p>
          </div>
        </div>
        <div className="flex items-center absolute right-3 top-1/3 gap-3">
          <LikeScrapBtn
            postType="movie"
            btnType="Like"
            postId={`${postId}`}
            btnSize="text-2xl"
          />
          <CopyBtn />
        </div>
      </div>
      <div>
        {!moreArrowToggle && (
          <div
            className="flex justify-center items-center h-5"
            onClick={handleMore}
          >
            <IoIosArrowDown className="hover:cursor-pointer text-3xl" />
          </div>
        )}
        {moreArrowToggle && (
          <div className="hover:cursor-pointer text-sm" onClick={handleMore}>
            <div className="info flex text-sm text-mkDarkGray mt-3 mb-1">
              <p className="mr-3 w-7 font-semibold">감독</p>
              <p className="px-1.5">{isBlank(director)}</p>
            </div>
            <div className="flex text-sm text-mkDarkGray mb-1">
              <p className="mr-3 w-7 font-semibold">출연</p>
              {actorArray.map((name, idx) => {
                return (
                  <>
                    <span className="px-1.5" key={idx}>
                      {name}
                    </span>
                    <span className="text-mkLightGray ml-2 mr-1 last:hidden">
                      |
                    </span>
                  </>
                );
              })}
            </div>
            <div className="flex text-sm text-mkDarkGray mt-3 mb-1">
              <p className="mr-3 w-7 font-semibold">내용</p>
              <div className="px-1.5 pb-3 w-fit">{parse(isBlank(summary))}</div>
            </div>
            <div className="flex justify-center items-center h-5">
              <IoIosArrowUp className="text-3xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
