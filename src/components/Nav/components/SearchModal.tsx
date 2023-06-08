import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { navSearchDataState } from '../../../recoil/SearchDataState';
import useAxios from '../../../hooks/useAxios';
import { closeSearchState, navSearchState } from '../../../recoil/SearchState';

type dataType = {
  data: [];
};

export const SearchModal = memo(() => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const navigate = useNavigate();
  const setSearchInput = useSetRecoilState(navSearchState);
  const [searchData, setSearchData] = useRecoilState(navSearchDataState);
  const setCloseBtn = useSetRecoilState(closeSearchState);
  const resetSearchData = useResetRecoilState(navSearchDataState);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const closeSearchInput = () => {
    setSearchInput(false);
    setCloseBtn(true);
    resetSearchData();
  };

  const searchAxios = () => {
    fetchData({
      url: `${BASE_URL}/search/movie?movieTitle=${searchValue}`,
    }).then((res: dataType) => {
      setSearchData(res);
      setCloseBtn(false);
    });
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchAxios();
    } else {
    }
  };

  return (
    <div className="absolute top-[4.3rem] right-[2.3rem] xs:top-20 xs:right-14 sm:top-[5.7rem] sm:right-[4rem] md:top-[6.2rem] md:right-[5.3rem] lg:right-[8.7rem] z-50">
      <div className="flex flex-row items-center h-1/2 opacity-90">
        <input
          className="input input-bordered inline-block w-48 xs:w-56 sm:w-72 sm:h-[3.5rem] lg:w-80 border-2 mr-2 sm:mr-3 shadow-sm placeholder:text-xs xs:placeholder:text-sm sm:placeholder:text-base"
          placeholder="검색어를 입력해주세요"
          onChange={searchInputHandler}
          onKeyDown={handleSubmit}
        />
        <button
          className="search-btn2 opacity-70 -translate-x-[2.7rem] sm:-translate-x-[3.3rem]"
          onClick={searchAxios}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          className="close-btn inline-block -translate-y-[3.6rem] -translate-x-[3rem] xs:-translate-y-[4.1rem] xs:-translate-x-[3.2rem] sm:-translate-y-[4.6rem] sm:-translate-x-[4.7rem] md:-translate-y-[4.9rem] md:-translate-x-[5rem] opacity-90"
          onClick={closeSearchInput}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 sm:h-7 sm:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`${
          searchData?.length === 0 || searchData?.data?.length === 0
            ? 'hidden'
            : 'block'
        } absolute left-0 top-14 w-72 h-auto px-5 py-4 border-mkGray border-1 bg-white shadow-md rounded overflow-y-scroll`}
      >
        {searchData?.data?.map((el: { id: number; name: string }) => {
          const { id, name } = el;
          return (
            <li
              key={id}
              className="dropdown block p-3 cursor-pointer hover:bg-mkLightGray hover:rounded"
              onClick={() => {
                setSearchInput(false);
                navigate(`/movieDetail/${id}`);
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <ul
        className={`${
          searchData?.data?.length === 0 ? 'block' : 'hidden'
        } absolute left-0 top-14 w-72 h-auto px-5 py-4 border-mkGray border-1 bg-white shadow-md rounded overflow-y-scroll`}
      >
        <li className="p-3 text-mkGray text-center">검색 결과가 없습니다 :(</li>
      </ul>
    </div>
  );
});
