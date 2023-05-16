import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import { navSearchDataState } from '../../../recoil/SearchDataState';
import useAxios from '../../../hooks/useAxios';

type dataType = {
  data: [];
};

export const SearchModal = memo(() => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const navigate = useNavigate();
  const setSearchInput = useSetRecoilState(toggleSelector('navSearch'));
  const [searchData, setSearchData] = useRecoilState(navSearchDataState);
  const setCloseBtn = useSetRecoilState(toggleSelector('close'));
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

  return (
    <div className="relative z-50">
      <div className="flex flex-row items-center h-1/2">
        <input
          className="input input-bordered inline-block w-72 border-2 mr-3 shadow-sm"
          placeholder="검색어를 입력해주세요"
          onChange={searchInputHandler}
        />
        <button
          className="btn btn-ghost btn-circle search-btn2 absolute right-[4rem] opacity-70"
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
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          className="btn btn-circle btn-outline close-btn inline-block border-none hover:bg-mkLightGray hover:text-mkGray"
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
              onClick={() => navigate(`/movieDetail/${id}`)}
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
