import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { blogPostState, isEditState } from '../../../../recoil/BlogPostState';
import { useRecoilState, useRecoilValue } from 'recoil';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Category() {
  const [show, setShow] = useState(false);
  const [selectGenre, setSelectGenre] = useState('모든 장르');
  const [selectSpo, setSelectSpo] = useState('스포 여부');
  const [genreCategory, setGenreCategory] = useState([]);
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);
  const isEdit = useRecoilValue(isEditState);
  const [loading, error, data, fetchData] = useAxios();

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/blog/categoryList`,
    }).then((list: any) => setGenreCategory(list.data));

    genreCategory.map((item: { id: number; name: string }): void => {
      if (isEdit && item.id === blogPost.categoryId) {
        setSelectGenre(item.name);
      }
    });

    SPOILER_DATA.map((item: { id: number; name: string }) => {
      if (isEdit && item.id === blogPost.spoilerInfoId) {
        setSelectSpo(item.name);
      }
    });
  }, [blogPost]);

  const cateSelectHandler = (id: number, name: string) => {
    setShow(show => !show);
    setSelectGenre(name);
    setBlogPost(prevData => ({
      ...prevData,
      categoryId: id,
    }));
  };

  const spoSelectHandler = (id: number, name: string) => {
    setShow(show => !show);
    setSelectSpo(name);

    setBlogPost(prevData => ({
      ...prevData,
      spoilerInfoId: id,
    }));
  };

  return (
    <div>
      <div
        className="dropdown cursor-pointer my-5 mr-5"
        onClick={() => setShow(!show)}
      >
        <label
          tabIndex={0}
          className="btn border-mkBlack border-2 border-solid text-mkBlack cursor-pointer max-sm:text-xs xs:w-28 mb-1 bg-white xl:w-44 hover:bg-white"
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
          } `}
        >
          {genreCategory !== undefined &&
            genreCategory.map((item: { id: number; name: string }) => {
              return (
                <li
                  key={item.id}
                  className="h-15 cursor-pointer p-3 max-sm:text-xs"
                  onClick={() => cateSelectHandler(item.id, item.name)}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div
        className="dropdown cursor-pointer my-5"
        onClick={() => setShow(!show)}
      >
        <label
          tabIndex={0}
          className="btn mb-1 bg-white border-2 border-solid text-mkBlack cursor-pointer xs:w-36 max-sm:text-xs xl:w-44 hover:bg-white border-mkBlack"
        >
          {selectSpo}
          <img
            src="/images/blog/blogMain/dropdown_arrow.png"
            alt="dropdown_arrow"
            className="w-3 ml-3"
          />
        </label>
        <ul
          tabIndex={0}
          className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded-box max-sm:w-48 ${
            show ? 'block' : 'hidden'
          } `}
        >
          {SPOILER_DATA.map((item: { id: number; name: string }) => {
            return (
              <li
                key={item.id}
                className="h-15 cursor-pointer p-3 max-sm:text-xs"
                onClick={() => spoSelectHandler(item.id, item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const SPOILER_DATA = [
  { id: 1, name: 'Spoiler' },
  { id: 2, name: 'Non-Spoiler' },
];
