import { useRecoilState } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';
import SearchModal from './SearchModal';

export default function Search() {
  const [searchInput, setSearchInput] = useRecoilState(
    toggleSelector('search')
  );

  return (
    <div>
      <button
        className={`btn btn-ghost btn-circle mr-7 opacity-70 ${
          searchInput ? 'hidden' : 'block'
        }`}
        onClick={() => setSearchInput(!searchInput)}
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {searchInput ? <SearchModal /> : ''}
    </div>
  );
}
