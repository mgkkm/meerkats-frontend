import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRecoilState } from 'recoil';
import { mainDataState } from '../../../recoil/MainDataState';

export default function MainTopRankCarousel() {
  const [mainData] = useRecoilState(mainDataState);

  const bestMovie = mainData[0].bestMovie.map((row: { poster_img: string }) => {
    return row.poster_img;
  });
  return (
    <>
      <h1 className=" text-4xl text-center mb-8">Best Movie in Meerkats</h1>

      <Swiper
        slidesPerView={4.5}
        spaceBetween={30}
        loop={true}
        navigation
        autoplay={{ delay: 2000 }}
        modules={[Navigation, Autoplay]}
        className="h-[500px]  p-4"
      >
        {bestMovie.map((url, idx) => {
          return (
            <SwiperSlide className="bg-white" key={idx}>
              <img src={url} alt="best_movie" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
