import { useEffect, useState } from 'react';
import useAxios from '../../../../hooks/useAxios';
import { blogPostState } from '../../../../recoil/BlogPostState';
import { useRecoilState } from 'recoil';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Category() {
  const [show, setShow] = useState(false);
  const [selectGenre, setSelectGenre] = useState('모든 장르');
  const [selectSpo, setSelectSpo] = useState('스포 여부');
  const [genreCategory, setGenreCategory] = useState([]);
  const [loading, error, data, fetchData] = useAxios();
  const [blogPost, setBlogPost] = useRecoilState(blogPostState);

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/blog/categoryList`,
    }).then((list: any) => setGenreCategory(list.data));

    genreCategory.map((item: { id: number; name: string }): void => {
      if (item.id === blogPost.categoryId) {
        setSelectGenre(item.name);
      }
    });

    SPOILER_DATA.map((item: { id: number; name: string }) => {
      if (item.id === blogPost.spoilerInfoId) {
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
          className="btn w-44 mb-1 bg-white hover:bg-white border-mkBlack border-2 border-solid text-base text-mkBlack cursor-pointer"
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
                  className="h-15 cursor-pointer p-3 "
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
          className="btn w-44 mb-1 bg-white hover:bg-white border-mkBlack border-2 border-solid text-base text-mkBlack cursor-pointer"
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
          className={`dropdown-content menu w-52 p-2 shadow bg-base-100 rounded-box ${
            show ? 'block' : 'hidden'
          } `}
        >
          {SPOILER_DATA.map((item: { id: number; name: string }) => {
            return (
              <li
                key={item.id}
                className="h-15 cursor-pointer p-3 "
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
