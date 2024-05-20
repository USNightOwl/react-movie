import { config } from "../../constants/config";
import { Movie } from "../../types/movie.type";
import { getYearFromISOString } from "../../utils/helpers";
import Button from "./Button";
import IconPlay from "./IconPlay";
import IconStar from "./IconStar";

interface Props {
  movie: Movie
  onMovieClicked?: ({ id, name }: { id: string; name: string }) => void
}

const Banner = ({ movie, onMovieClicked }: Props) => {
  return (
    <section className='banner h-[400px] page-container px-3 sm:px-5 cursor-grab'>
      <div className='w-full h-full rounded-lg relative'>
        <img
          src={`${config.imageOriginalURL}${movie.poster_path}`}
          alt='img_banner'
          className='w-full h-full object-cover rounded-lg'
        />
        <div className='absolute left-5 bottom-2 text-white z-10 flex flex-col gap-5'>
          <h2 className='text-xl sm:text-3xl font-bold'>{movie.title}</h2>
          <div className='flex items-center gap-x-5 text-sm sm:text-base'>
            <span className='py-1 px-2 border-2 border-white rounded-lg'>
              {getYearFromISOString(movie.release_date)}
            </span>
            <div className='flex items-center gap-x-1 py-1 px-2 border-2 border-white rounded-lg'>
              <span>6.9</span>
              <IconStar />
            </div>
          </div>
          <Button
            title='Watch'
            titleClassName='text-sm sm:text-base'
            className='flex items-center gap-x-1 py-2 px-6 sm:px-8 rounded-lg bg-primary self-start hover:cursor-pointer hover:bg-primary/80'
            icon={<IconPlay />}
            onClick={() =>
              onMovieClicked &&
              onMovieClicked({
                id: String(movie.id),
                name: movie.title
              })
            }
          />
            
        </div>
        <div className='overlay rounded-lg absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.1)]'></div>
      </div>
    </section>
  )
}

export default Banner