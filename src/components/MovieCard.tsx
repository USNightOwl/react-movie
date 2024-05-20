import { config } from "../constants/config";
import { Movie } from "../types/movie.type";
import { getYearFromISOString } from "../utils/helpers";
import Button from "./Button";
import IconPlay from "./IconPlay";
import IconStar from "./IconStar";

interface Props {
  movie: Movie;
  onMovieClicked?: ({ id, name }: { id: string; name: string }) => void;
}

const MovieCard = ({ movie, onMovieClicked }: Props) => {
  return (
    <div className='p-3 bg-slate-800 rounded-lg text-white select-none cursor-grab h-full flex flex-col'>
      <div className='w-full h-[250px] overflow-hidden rounded-lg'>
        <img
          src={movie.backdrop_path ? `${config.imageW500URL}${movie.backdrop_path}` : config.defaultMovieImg}
          alt='movie_img'
          className='w-full h-full rounded-lg object-cover'
        />
      </div>
      <div className='grow flex flex-col justify-between items-stretch'>
        <h3 className='mt-2 text-xl font-bold line-clamp-1'>{movie.title}</h3>
        <div className='mt-2'>
          <div className='flex items-center justify-between text-gray-400 text-sm'>
            <span>{getYearFromISOString(movie.release_date)}</span>
            <div className='flex items-center gap-x-2'>
              <span>{movie.vote_count}</span>
              <IconStar />
            </div>
          </div>
          <Button
            title='Watch'
            onClick={() => {
              onMovieClicked &&
                onMovieClicked({
                  id: String(movie.id),
                  name: movie.title
                })
            }}
            titleClassName='text-sm sm:text-base'
            className='mt-2 gap-x-1 py-2 sm:px-8 flex items-center rounded-lg bg-primary justify-center hover:cursor-pointer hover:bg-primary/80 w-full'
            icon={<IconPlay />}
          />
        </div>
      </div>
    </div>
  )
}

export default MovieCard