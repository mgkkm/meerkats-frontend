import { useRecoilState } from 'recoil';
import { toggleSelector } from '../../../recoil/ToggleState';
import { SearchModal } from './SearchModal';

export default function Search() {
  const [searchInput, setSearchInput] = useRecoilState(
    toggleSelector('navSearch')
  );

  return (
    <div>
      <button
        className={`btn btn-ghost btn-circle opacity-90${
          searchInput ? 'hidden' : 'block'
        }`}
        onClick={() => setSearchInput(!searchInput)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 max-sm:w-6 max-sm:h-6 ml-[0.5rem]"
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
      {searchInput && <SearchModal />}
    </div>
  );
}
