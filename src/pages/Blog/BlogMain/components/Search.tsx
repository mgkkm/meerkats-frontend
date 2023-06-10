import React from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../../../../recoil/SearchState';
import { SearchModal } from './SearchModal';

const Search = React.memo(() => {
  const [searchInput, setSearchInput] = useRecoilState(searchState);

  return (
    <div>
      <button
        className={`btn btn-ghost btn-circle mr-3 sm:mr-5 opacity-70 ${
          searchInput ? 'hidden' : 'block'
        }`}
        onClick={() => setSearchInput(!searchInput)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-[1.2rem] xs:h-5 xs:w-5 xs:ml-[0.75rem] sm:h-6 sm:w-6 sm:ml-[0.6rem]"
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
      {searchInput && <SearchModal />}
    </div>
  );
});

export default Search;
