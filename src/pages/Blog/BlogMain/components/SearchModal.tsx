import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { SearchDataState } from '../../../../recoil/SearchDataState';
import { closeSearchState, searchState } from '../../../../recoil/SearchState';
import useAxios from '../../../../hooks/useAxios';

type resType = {
  data: [];
};

export const SearchModal = React.memo(() => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const setSearchInput = useSetRecoilState(searchState);
  const setSearchArticleData = useSetRecoilState(SearchDataState);
  const resetSearchArticleData = useResetRecoilState(SearchDataState);
  const setCloseBtn = useSetRecoilState(closeSearchState);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const closeSearchInput = () => {
    setSearchInput(false);
    setCloseBtn(true);
    resetSearchArticleData();
  };

  const searchAxios = () => {
    fetchData({
      url: `${BASE_URL}/search/blog?postTitle=${searchValue}`,
    }).then((res: resType) => {
      setSearchArticleData(res);
      setCloseBtn(false);
      setSearchInput(false);
    });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchAxios();
    } else {
    }
  };

  return (
    <div className="relative z-50">
      {/* Desktop */}
      <div className="hidden sm:flex flex-row items-center h-1/2 mr-5">
        <input
          className="input input-bordered relative inline-block w-72 mr-3 border-2 shadow-sm"
          placeholder="검색어를 입력해주세요"
          onChange={searchInputHandler}
          onKeyDown={handleSearch}
        />
        <button
          className="btn btn-ghost btn-circle absolute right-[4rem] mr-7 opacity-70"
          onClick={searchAxios}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          className="btn btn-circle btn-outline inline-block border-none text-mkGray hover:bg-mkLightGray hover:text-mkGray"
          onClick={closeSearchInput}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 ml-[0.6rem]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* mobile */}
      <div className="flex sm:hidden flex-row items-center h-1/2 mr-3">
        <input
          className="input input-bordered relative inline-block w-44 sm:w-50 sm:mr-3 border-2 shadow-sm placeholder:text-[0.9rem]"
          placeholder="검색어 입력 ..."
          onChange={searchInputHandler}
          onKeyDown={handleSearch}
        />
        <button
          className="btn btn-ghost btn-circle absolute right-[0.1rem] mr-[0.7rem] opacity-60"
          onClick={searchAxios}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});
