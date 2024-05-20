import Skeleton from "react-loading-skeleton";
import { Movie } from "../../types/movie.type";
import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Banner from "./Banner";

interface Props {
  movies?: Movie[];
  onMovieClicked?: ({ id, name }: { id: string; name: string }) => void;
  isLoading: boolean;
}

const BannerSlider = ({ movies, onMovieClicked, isLoading }: Props) => {
  if (isLoading) return <Skeleton width={200} height={40}/>

  return (
    <section className='banner h-[400px] page-container px-3 sm:px-5'>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        className='mt-6'
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
      >
        {
          movies?.map(movie => (
            <SwiperSlide key={movie.id}>
              <Banner movie={movie} onMovieClicked={onMovieClicked}/>
            </SwiperSlide>
          )) 
        }
      </Swiper>
    </section>
  )
}

export default BannerSlider