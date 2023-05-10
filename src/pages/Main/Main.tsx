import React, { useEffect } from 'react';
import MainCarousel from './components/MainCarousel';
import MainTab from './components/MainTab';
import MainTopRankCarousel from './components/MainTopRankCarousel';
import useAxios from '../../hooks/useAxios';
import { useSetRecoilState } from 'recoil';
import { mainDataState } from '../../recoil/MainDataState';
import MembershipMain from '../Membership/MembershipMain';

export default function Main() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();
  const setMainData = useSetRecoilState(mainDataState);

  useEffect(() => {
    fetchData({
      url: `${BASE_URL}/movie/main?skip=0&take=10`,
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
    <>
      <MainCarousel />
      <hr id="dash" />
      <MainTab />
      <hr id="dash" />
      <MainTopRankCarousel />
      <hr id="dash" />
      <MembershipMain />
    </>
  );
}
