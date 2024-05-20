import { Swiper, SwiperSlide } from 'swiper/react'
import { Video as VideoType } from '../../types/movie.type'
import { Navigation } from 'swiper/modules'

interface Props {
  videos?: VideoType[]
}

const Video = ({ videos }: Props) => {
  return (
    videos && (
      <Swiper
        modules={[Navigation]} 
        spaceBetween={20} 
        slidesPerView={1} 
        navigation={true}
      >
        {videos.slice(0, 3).map((trailer) => (
          <SwiperSlide key={trailer.key}>
            <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${trailer.name}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  )
}

export default Video