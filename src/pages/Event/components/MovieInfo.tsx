import { useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import MoviePlayer from '../../MovieDetail/components/MoviePlayer';
import { useParams } from 'react-router-dom';

export default function MovieInfo() {
  const [loading, error, data, fetchData] = useAxios();

  const param = useParams();
  useEffect(() => {
    fetchData({
      url: '/data/eventInfo.json',
    }).then();
  }, []);

  const currentMovieId = param.id && parseInt(param.id);
  const movieData =
    data && data.find((item: any) => item.id === currentMovieId).movieInfo[0];

  return (
    <div className="mt-52 bg-black justify-around xs:p-5 xs:block sm:p-3 md:p-5 md:flex xl:flex xl:p-10">
      <div className="h-96 xs:w-full sm:w-full md:w-[550px] xl:w-[1000px]">
        <MoviePlayer videoId={movieData?.youtubeId} height="380" autoplay={0} />
      </div>
      <ul className="px-10 py-5 text-mkLightGray xs:w-full xs:text-xs sm:text-sm md:text-base xl:text-lg xl:w-3/5">
        <li className="mb-2 ">개봉 : {movieData?.release}</li>
        <li className="mb-2">감독 : {movieData?.director}</li>
        <li className="mb-2">주연 : {movieData?.mainActor}</li>
        <li className="mb-2">러닝타임 : {movieData?.runningTime}</li>
        <li>소개 : {movieData?.des}</li>
      </ul>
    </div>
  );
}
