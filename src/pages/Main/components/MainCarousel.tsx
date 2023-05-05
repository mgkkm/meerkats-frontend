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
      className="h-[650px] mt-24"
    >
      <SwiperSlide>
        <div className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full "
            alt="main_poster"
            src="/images/MainCarousel/main_poster_2.jpg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster"
            src="/images/MainCarousel/main_poster_1.jpg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster"
            src="https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20230420_107%2F1681956724322CsJcl_JPEG%2Fmovie_image.jpg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full shadow-xl">
          <img
            className="m-auto w-full h-full"
            alt="main_poster"
            src="https://image.wavve.com/v1/thumbnails/2480_1016_20_80/banner/pooq/2023/20230504_banner_143602.webp"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
