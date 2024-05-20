import { useNavigate, useParams } from "react-router-dom"
import { getIdFromNameId, isoToCustomDateFormat } from "../utils/helpers"
import Spinner from "../components/Spinner"
import movieApi from "../apis/movie.api"
import { useQuery } from "@tanstack/react-query"
import { config } from "../constants/config"
import Genre from "../components/MovieDetail/Genre"
import IconStar from "../components/IconStar"
import useQueryParams from "../hooks/useQueryParams"
import Video from "../components/MovieDetail/Video"

const MovieDetail = () => {
  const searchParams = useQueryParams()
  const page = searchParams.page || 1
  
  const params = useParams()
  const movieId = getIdFromNameId(params.id ?? '')

  const navigate = useNavigate();

  const { data: movieData, isLoading: isMovieLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieApi.getMovieDetail(movieId)
  })

  const { data: videosData, isLoading: isVideoLoading } = useQuery({
    queryKey: ['videos', movieId],
    queryFn: () => movieApi.getMovieVideos(movieId)
  })

  const movie = movieData?.data;
  const videos = videosData?.data.results
  
  const isLoading = isMovieLoading || isVideoLoading;

  return isLoading ? (
    <div className='mt-10'>
      <Spinner />
    </div>
  ) : (
    <div className='w-full mb-10 text-white'>
      {/* Banner */}
      <div className='relative mb-[250px]'>
        <div className='overlay bg-gradient-to-t from-black to-transparent w-full h-[600px] absolute inset-0 z-10' />
        <div className='w-full h-[600px]'>
          <img
            src={`${config.imageOriginalURL}${movie?.backdrop_path}`}
            alt='movie_img'
            className='object-cover h-full w-full'
          />
        </div>
        <div className='w-[70%] h-[400px] lg:w-[60%] absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2'>
          <img
            src={`${config.imageOriginalURL}${movie?.backdrop_path}`}
            alt='movie_img'
            className='object-cover rounded-lg h-full w-full'
          />
        </div>
      </div>

      {/* Description */}
      <div className='mt-10'>
        <h1 className='text-3xl text-center'>{movie?.title}</h1>
        <Genre genres={movie?.genres} />
        <div className='mt-10 text-gray-300 w-[70%] lg:w-[60%] m-auto'>
          <div className='my-2 flex items-center flex-wrap justify-end gap-x-8 gap-y-2 text-gray-300'>
            <div className='flex items-center gap-1'>
              {movie?.vote_count}
              <IconStar />
            </div>
            <p>Release on {isoToCustomDateFormat(movie?.release_date || '')}</p>
          </div>
          <div className='text-center'>{movie?.overview}</div>
        </div>
      </div>

      {/* Trailer */}
      <div className='page-container'>
        <div className='mt-10 px-5'>
          <div className='trailer max-w-[100%] md:max-w-[90%] lg:max-w-[70%] mx-auto relative aspect-video'>
            <h2 className='mb-5 text-3xl text-center'>Trailers</h2>
            <Video videos={videos} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default MovieDetail
