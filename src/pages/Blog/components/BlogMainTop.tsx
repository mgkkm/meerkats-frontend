import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';

export default function BlogMainTop() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const tabClickHandler = (id: number, title: string) => {
    setActiveTab(id);
    const token = localStorage.getItem('token');
    title === 'My blog' &&
      axios.get(
        'https://www.meerkats.monster/blog/main/mypost?take=6&skip=0&userId=2',
        {
          headers: {
            Authorization: token,
          },
        }
      );
  };

  return (
    <div className="blog_top flex justify-between">
      <div className="blog_top_left flex items-center text-xl">
        {TAB_DATA.map(({ id, title }) => {
          return (
            <div
              key={id}
              className={`tab w-48 text-xl font-semibold mr-8 ${
                activeTab === id
                  ? 'bg-white border-4 border-solid border-mkOrange rounded-lg text-black h-14'
                  : ''
              }`}
              onClick={() => {
                tabClickHandler(id, title);
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className="blog_top_right flex items-center">
        <Search />
        <button
          className="btn w-28 text-xl rounded-lg text-white bg-mkOrange hover:bg-mkDarkOrange border-none"
          onClick={() => navigate('/posting')}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}

const TAB_DATA = [
  {
    id: 1,
    title: 'Trending',
  },
  {
    id: 2,
    title: 'My blog',
  },
];
