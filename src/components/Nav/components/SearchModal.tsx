import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import useAxios from '../../../hooks/useAxios';

export default function SearchModal() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const [searchInput, setSearchInput] = useRecoilState(
    toggleSelector('search')
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const setSearchList = useSetRecoilState(toggleSelector('searchListData'));

  const closeBtnHandler = () => {
    setSearchInput(false);
  };

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchAxios = () => {
    fetchData({
      url: `${BASE_URL}/search/movie?movieTitle=${searchValue}`,
    }).then((res: any) => {
      console.log(res);
      // const result = res.data;
      // setSearchData(result);
    });

    setSearchList(true);
  };

  return (
    <div className="relative z-50">
      <div className="flex flex-row items-center h-1/2 mr-12">
        <input
          className="input input-bordered inline-block w-72 mr-3 border-2 shadow-sm"
          placeholder="검색어를 입력해주세요"
          onChange={searchInputHandler}
          onKeyUp={searchAxios}
        />
        <button
          className="btn btn-circle btn-outline inline-block border-none hover:bg-mkLightGray hover:text-black opacity-90"
          onClick={closeBtnHandler}
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
    </div>
  );
}
