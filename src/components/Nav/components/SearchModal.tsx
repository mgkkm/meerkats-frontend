import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import axios from 'axios';

type itemType = {
  title: string;
};

export default function SearchModal() {
  const [searchInput, setSearchInput] = useRecoilState(
    toggleSelector('search')
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchData, setSearchData] = useState([] as any);
  const [searchList, setSearchList] = useState(false);

  const closeBtnHandler = () => {
    setSearchInput(false);
  };

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // nav 검색 데이터는 영화 제목으로
  // 블로그 메인 페이지 검색 데이터는 블로그 제목으로
  const searchAxios = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        const result = res.data;
        setSearchData(result);
      })
      .catch(err => console.log(err));

    setSearchList(true);
  };

  const filterData = searchData?.filter((data: itemType) => {
    return data.title.toLowerCase().includes(searchValue.toLowerCase());
  });

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
      <ul
        className={`${
          searchList ? 'block' : 'hidden'
        } absolute left-0 top-14 h-64 px-5 py-4 border-mkGray border-1 bg-white shadow-md rounded overflow-y-scroll`}
      >
        {filterData?.map((data: { title: string }, i: number) => {
          return (
            <li key={i} className="px-3 py-2 rounded hover:bg-mkLightGray">
              {/* {data.title ? data.title : '검색결과가 없습니다.'} */}
              {data.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
