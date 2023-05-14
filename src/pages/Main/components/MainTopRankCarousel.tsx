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
      <h1 className="text-center font-[ChosunGs] xs:text-lg xs:mb-5 sm:mb-10 sm:text-2xl xl:text-4xl xl:mb-20">
        Best Movie in Meerkats
      </h1>

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
