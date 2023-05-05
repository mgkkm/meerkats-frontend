import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { useRecoilValue } from 'recoil';
import { mainDataState } from '../../../recoil/MainDataState';
import TopRankItems from './TopRankItems';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MainTopRankCarousel() {
  const mainData = useRecoilValue(mainDataState);

  const bestMovie = mainData[0].bestMovie;

  return (
    <div className="container xl">
      <h1 className=" text-4xl text-center mb-14 font-[ChosunGs]">
        Best Movie in Meerkats
      </h1>

      <Swiper
        slidesPerView={4.5}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 1500 }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="h-[500px]  p-4"
      >
        {bestMovie.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="w-fit h-fit b">
              <TopRankItems item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
