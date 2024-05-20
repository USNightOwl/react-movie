import { Movie, MovieType } from "../types/movie.type";
import { PREFIX } from "../types/prefix"
import { SuccessResponse } from "../types/response.type";
import http from "../utils/http";

const URL = PREFIX.MOVIE;
const movieApi = {
  getMovies({ movie_type, page }: {movie_type: MovieType, page?: string | number }) {
    return http.get<SuccessResponse<Movie[]>>(`${URL}/${movie_type}`, {
      params: {
        page: page || 1
      }
    })
  }
}

export default movieApi