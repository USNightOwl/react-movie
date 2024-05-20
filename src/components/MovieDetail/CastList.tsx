import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import MovieSkeleton from "../Skeleton/MovieSkeleton"
import CastCard from "./CastCard"
import { Actor } from "../../types/actor.type"

interface Props {
  title?: string
  titleClassName?: string
  casts?: Actor[]
  isLoading?: boolean
}

const CastList = ({
  title,
  titleClassName = 'text-2xl text-white font-bold mt-5',
  casts,
  isLoading
}: Props) => {
  return (
    <div className='relative cast-list'>
      {title && <h2 className={titleClassName}>{title}</h2>}
      {casts && casts.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          className='mt-6'
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
        >
          {isLoading &&
            Array(4)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <MovieSkeleton />
                </SwiperSlide>
              ))}
            {!isLoading &&
            casts.map((cast) => {
              return (
                <SwiperSlide key={cast.id}>
                  <CastCard cast={cast} />
                </SwiperSlide>
              )
            })}
        </Swiper>
      )}
    </div>
  )
}

export default CastList