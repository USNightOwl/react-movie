import { Actor } from '../types/actor.type'
import { Movie, MovieType } from '../types/movie.type'
import { PREFIX } from '../types/prefix'
import { SuccessResponse } from '../types/response.type'
import http from '../utils/http'
import movieApi from './movie.api'

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
  search({
    searchKey,
    searchType,
    movieType,
    page
  }: {
    searchKey?: string
    searchType?: string
    movieType?: string
    page?: string
  }) {
    if (movieType && ['popular', 'top_rated', 'upcoming', 'now_playing'].includes(movieType)) {
      return movieApi.getMovies({ movie_type: movieType as MovieType })
    } else {
      const searchURL = searchType === 'Movie' ? `${URL}/movie` : `${URL}/person`
      return http.get<Movie[] | Actor[]>(searchURL, {
        params: {
          query: searchKey,
          page: page || 1
        }
      })
    }
  }
}