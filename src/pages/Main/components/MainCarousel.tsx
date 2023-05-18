import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MainCarousel() {
  return (
    <Swiper
      centeredSlides={true}
      slidesPerView={1.5}
      spaceBetween={50}
      loop={true}
      autoplay={{ delay: 5000 }}
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mt-24 xs:h-[200px] sm:h-[300px] md:h-[400px] xl:h-[550px]"
    >
      <SwiperSlide>
        <a href="movieDetail/71" className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster"
            src="/images/Main/main_poster_1.jpeg"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a className="h-full shadow-xl" href="movieDetail/1191">
          <img
            className="m-auto w-full h-full"
            alt="main_poster"
            src="/images/Main/main_poster_2.jpeg"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="movieDetail/11" className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster3"
            src="/images/Main/main_poster_3.jpg"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="movieDetail/23" className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster4"
            src="/images/Main/main_poster_4.jpg"
          />
        </a>
      </SwiperSlide>
    </Swiper>
  );
}
