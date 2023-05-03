import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MainCarousel() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="h-[700px] mb-36 "
    >
      <SwiperSlide className="mkOrange ">
        <div>
          <img
            className="m-auto w-full "
            alt="main_poster"
            src="/images/MainCarousel/main_poster_2.jpg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="mkOrange">
        <div>
          <img
            className="m-auto w-full "
            alt="main_poster"
            src="/images/MainCarousel/main_poster_1.jpg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="mkOrange">slide3</SwiperSlide>
    </Swiper>
  );
}
