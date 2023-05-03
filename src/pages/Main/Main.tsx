import React, { useEffect } from 'react';
import MainCarousel from './components/MainCarousel';
import MainTab from './components/MainTab';
import MainTopRankCarousel from './components/MainTopRankCarousel';
import useAxios from '../../hooks/useAxios';
import { useRecoilState } from 'recoil';
import { mainDataState } from '../../recoil/MainDataState';

export default function Main() {
  const [loading, error, data, fetchData] = useAxios();
  const [, setMainData] = useRecoilState(mainDataState);

  useEffect(() => {
    fetchData({
      url: 'https://www.meerkats.monster/movie/main?skip=0&take=10',
      method: 'GET',
    }).then((data: any) =>
      setMainData([
        {
          bestMovie: data[0].bestMovie,
          foreignMovieWithLikes: data[0].foreignMovieWithLikes,
          koreanMovieWithLikes: data[0].koreanMovieWithLikes,
          latestMovie: data[0].latestMovie,
        },
      ])
    );
  }, []);

  return (
    <div className="container xl mt-24">
      <MainCarousel />
      <MainTab />
      <MainTopRankCarousel />
      {/* <Membership /> */}
    </div>
  );
}
