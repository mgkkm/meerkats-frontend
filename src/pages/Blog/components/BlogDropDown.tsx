import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ArticleDataState } from '../../../recoil/ArticleDataState';

export default function BlogDropDown() {
  const [selectGenre, setSelectGenre] = useState('모든 장르');
  const [show, setShow] = useState(false);
  const articleData = useRecoilValue(ArticleDataState);

  const dropDownHandler = (el: string) => {
    setShow(show => !show);
    setSelectGenre(el);
  };

  return (
    <div className="dropdown cursor-pointer" onClick={() => setShow(!show)}>
      <label
        tabIndex={0}
        className="btn w-36 mb-1 bg-white hover:bg-white border-mkBlack border-2 border-solid text-base text-mkBlack cursor-pointer"
      >
        {selectGenre}
        <img
          src="/images/blog/blogMain/dropdown_arrow.png"
          alt="dropdown_arrow"
          className="w-3 ml-3"
        />
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded-box ${
          show ? 'block' : 'hidden'
        }`}
      >
        {articleData?.data?.category?.map(
          (item: { id: number; name: string }) => {
            return (
              <li
                key={item.id}
                className="h-15 cursor-pointer"
                onClick={() => dropDownHandler(item.name)}
              >
                <a className="active:bg-mkOrange rounded-md">{item.name}</a>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
