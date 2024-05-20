import { Actor } from '../types/actor.type'
import { Movie } from '../types/movie.type'
import { PREFIX } from '../types/prefix'
import { SuccessResponse } from '../types/response.type'
import http from '../utils/http'

const URL = PREFIX.SEARCH;
export const searchApi = {
  searchMovies({ keyword, page }: { keyword: string; page: string | number }) {
    return http.get<SuccessResponse<Movie[]>>(`${URL}/movie`, {
      params: {
        query: keyword,
        page: page
      }
    })
  },
  searchActors({ keyword, page }: { keyword: string; page: string | number }) {
    return http.get<SuccessResponse<Actor[]>>(`${URL}/person`, {
      params: {
        query: keyword,
        page: page
      }
    })
  },
}