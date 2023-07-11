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
      <div className="flex justify-center items-start xs:mb-5 sm:mb-10 xl:mb-20">
        <img
          src="/images/logo_b.png"
          alt="logo"
          className="xs:h-[22px] sm:h-[26px] xl:h-[34px]"
        />
        <h1 className="text-center font-semibold tracking-tight xs:text-lg sm:text-2xl xl:text-4xl">
          &nbsp;인기 영화
        </h1>
      </div>
      <Swiper
        slidesPerView={4.5}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 1500 }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="p-4 xl:h-[500px] max-md:h-fit"
      >
        {bestMovie.map((item, idx) => {
          return (
            <SwiperSlide key={idx} className="w-fit h-fit">
              <TopRankItems item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
