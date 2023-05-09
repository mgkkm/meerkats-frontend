import { useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import MoviePlayer from '../../MovieDetail/components/MoviePlayer';
import { useParams } from 'react-router-dom';

export default function MovieInfo() {
  const [loading, error, data, fetchData] = useAxios();
  const param = useParams();
  useEffect(() => {
    fetchData({
      url: 'http://localhost:3000/data/eventInfo.json',
    }).then();
  }, []);

  const currentMovieId = param.id && parseInt(param.id);
  const movieData =
    data && data.find((item: any) => item.id === currentMovieId).movieInfo[0];

  return (
    <div className="mt-52 flex justify-around p-10 bg-black">
      <div className="w-2/5 h-96">
        <MoviePlayer
          videoId={movieData?.youtubeId}
          height="380px"
          autoplay={0}
        />
      </div>
      <ul className="px-10 pt-5 text-lg text-mkLightGray w-3/5">
        <div>
          <li className="mb-2 ">개봉 : {movieData?.release}</li>
          <li className="mb-2">감독 : {movieData?.director}</li>
          <li className="mb-2">주연 : {movieData?.mainActor}</li>
          <li className="mb-2">러닝타임 : {movieData?.runningTime}</li>
          <li>소개 : {movieData?.des}</li>
        </div>
      </ul>
    </div>
  );
}
