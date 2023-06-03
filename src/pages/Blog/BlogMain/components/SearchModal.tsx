import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { SearchDataState } from '../../../../recoil/SearchDataState';
import { closeSearchState, searchState } from '../../../../recoil/SearchState';
import useAxios from '../../../../hooks/useAxios';

// type itemType = {
//   title: string;
// };

export const SearchModal = React.memo(() => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const setSearchInput = useSetRecoilState(searchState);
  const setSearchArticleData = useSetRecoilState(SearchDataState);
  const resetSearchArticleData = useResetRecoilState(SearchDataState);
  const setCloseBtn = useSetRecoilState(closeSearchState);
  const [searchValue, setSearchValue] = useState<string>('');
  // const [searchData, setSearchData] = useState([] as any);
  // const [searchList, setSearchList] = useState(false);

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const closeSearchInput = () => {
    setSearchInput(false);
    setCloseBtn(true);
    resetSearchArticleData();
  };

  // 검색어를 입력하여, 검색 버튼을 클릭했을 때 통신이 되고
  // 해당 검색어가 들어가있는 포스트정보들을 내가 받게된다
  // 받은 데이터가 뿌려져야 하는데...
  const searchAxios = () => {
    fetchData({
      url: `${BASE_URL}/search/blog?postTitle=${searchValue}`,
    }).then((res: any) => {
      setSearchArticleData(res);
      setCloseBtn(false);
      setSearchInput(false);
    });

    // setSearchList(true);
  };

  //* 자동검색기능
  // const filterData = searchData?.filter((data: itemType) => {
  //   return data.title.toLowerCase().includes(searchValue.toLowerCase());
  // });

  return (
    <div className="relative z-50">
      {/* Desktop */}
      <div className="hidden sm:flex flex-row items-center h-1/2 mr-5">
        <input
          className="input input-bordered relative inline-block w-72 mr-3 border-2 shadow-sm"
          placeholder="검색어를 입력해주세요"
          onChange={searchInputHandler}
          // onKeyUp={searchAxios}
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
        {/* <button
          className="btn btn-circle btn-outline inline-block border-none text-mkGray hover:bg-mkLightGray hover:text-mkGray"
          onClick={closeSearchInput}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-[1rem]"
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
        </button> */}
      </div>
    </div>
  );
});

// * 자동 필터 검색 기능
// {/* <ul
//         className={`${
//           searchList ? 'block' : 'hidden'
//         } absolute left-0 top-14 h-64 px-5 py-4 border-mkGray border-1 bg-white shadow-md rounded overflow-y-scroll`}
//       >
//         {filterData?.map((data: { title: string }, i: number) => {
//           return (
//             <li key={i} className="px-3 py-2 rounded hover:bg-mkLightGray">
//               {/* {data.title ? data.title : '검색결과가 없습니다.'} */}
//               {data.title}
//             </li>
//           );
//         })}
//       </ul> */}
