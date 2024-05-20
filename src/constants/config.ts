import defaultCast from '../assets/img/default_cast.jpg'
import defaultMovie from '../assets/img/default_movie.jpg'

export const config = {
  baseURL: 'https://api.themoviedb.org/3/',
  imageOriginalURL: 'https://image.tmdb.org/t/p/original/',
  imageW500URL: 'https://image.tmdb.org/t/p/w500/',
  defaultCastImg: defaultCast,
  defaultMovieImg: defaultMovie,
  apiKey: import.meta.env.VITE_THEMOVIEDB_API_KEY
}