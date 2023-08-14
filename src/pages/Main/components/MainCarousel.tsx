import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MainCarousel() {
  const breakpoints = {
    640: {
      slidesPerView: 1.5,
    },
  };

  return (
    <Swiper
      centeredSlides={true}
      slidesPerView={1}
      breakpoints={breakpoints}
      spaceBetween={30}
      loop={true}
      autoplay={{ delay: 5000 }}
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mt-24 min-h-[200px] min-w-[100px] max-h-[500px]"
    >
      <SwiperSlide>
        <a href="/" className="shadow-xl">
          <img
            className="min-h-[200px] min-w-[375px]"
            alt="main_poster"
            src="/images/mainPoster/main_poster_1.png"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="/" className="shadow-xl">
          <img
            className="min-h-[200px] min-w-[375px]"
            alt="main_poster"
            src="/images/mainPoster/main_poster_2.png"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="/" className="shadow-xl">
          <img
            className="min-h-[200px] min-w-[375px]"
            alt="main_poster3"
            src="/images/mainPoster/main_poster_3.png"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="/" className="shadow-xl">
          <img
            className="min-h-[200px] min-w-[375px]"
            alt="main_poster4"
            src="/images/mainPoster/main_poster_4.png"
          />
        </a>
      </SwiperSlide>
    </Swiper>
  );
}
