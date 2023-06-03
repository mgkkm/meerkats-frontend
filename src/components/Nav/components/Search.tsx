import { useRecoilState } from 'recoil';
import { navSearchState } from '../../../recoil/SearchState';
import { SearchModal } from './SearchModal';

export default function Search() {
  const [searchInput, setSearchInput] = useRecoilState(navSearchState);

  return (
    <div>
      <button
        className={`search-btn relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${
          searchInput ? 'hidden' : 'block'
        }`}
        onClick={() => setSearchInput(!searchInput)}
      >
        <img
          src="/images/search.png"
          alt="검색"
          className="opacity-70 hover:opacity-100"
        />
      </button>
      {searchInput && <SearchModal />}
    </div>
  );
}
