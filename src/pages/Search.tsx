import { Link, createSearchParams, useNavigate } from "react-router-dom"
import useQueryParams from "../hooks/useQueryParams"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../apis/movie.api";
import { MovieType } from "../types/movie.type";
import { searchApi } from "../apis/search.api";
import { path } from "../constants/path";
import classNames from "classnames";
import MovieSkeleton from "../components/Skeleton/MovieSkeleton";
import MovieCard from "../components/MovieCard";
import CastCard from "../components/MovieDetail/CastCard";
import Pagination from "../components/Pagination";
import NoResultFound from "../components/NoResultFound";
import { generateNameId } from "../utils/helpers";

interface FormType {
  searchKey: string
  searchType: 'Movie' | 'Cast'
}

const movieTypeConst = {
  popular: 'popular',
  top_rated: 'top_rated',
  upcoming: 'upcoming',
  now_playing: 'now_playing'
} as const

const Search = () => {
  const navigate = useNavigate();
  const params = useQueryParams();
  const { movieType, searchKey, searchType, page = 1 } = params;

  const [formData, setFormData] = useState<FormType>({
    searchKey: '',
    searchType: 'Movie'
  })

  useEffect(() => {
    const isMovieTypeSelected = ['popular', 'top_rated', 'upcoming', 'now_playing'].includes(movieType);
    const hasSearchType = ['Movie', 'Cast'].includes(searchType);
    const hasSearchKey = searchKey !== undefined;

    if (!isMovieTypeSelected && hasSearchType && hasSearchKey) {
      setFormData({ searchKey: searchKey, searchType: searchType as 'Movie' | 'Cast' })
    } else {
      setFormData({ searchKey: '', searchType: 'Movie' })
    }

  },[movieType, searchKey, searchType])
  
  const isMovieTypeSelected = ['popular', 'top_rated', 'upcoming', 'now_playing'].includes(movieType)
  const { data: movieListData, isLoading: isMovieListLoading } = useQuery({
    queryKey: ['movies', params],
    queryFn: () => movieApi.getMovies({ movie_type: movieType as MovieType, page: page }),
    staleTime: 60 * 1000,
    enabled: isMovieTypeSelected
  });

  const { data: moviesData, isLoading: isMovieLoading } = useQuery({
    queryKey: ['searchMovie', params],
    queryFn: () => searchApi.searchMovies({ keyword: searchKey, page: page }),
    enabled: !isMovieTypeSelected && searchType === 'Movie',
    staleTime: 60 * 1000
  });

  const { data: castsData, isLoading: isCastLoading } = useQuery({
    queryKey: ['searchCast', params],
    queryFn: () => searchApi.searchActors({ keyword: searchKey, page: page }),
    enabled: !isMovieTypeSelected && searchType === 'Cast',
    staleTime: 60 * 1000
  })

  const movies = movieListData?.data.results || moviesData?.data.results
  const casts = castsData?.data.results
  const totalPages = movieListData?.data.total_pages || moviesData?.data.total_pages || castsData?.data.total_pages
  const isLoading = isMovieListLoading || isMovieLoading || isCastLoading

  const isNoResultFound = !isLoading && (movies?.length == 0 || casts?.length == 0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate({
      pathname: path.search,
      search: createSearchParams({
        searchKey: formData.searchKey,
        searchType: formData.searchType
      }).toString()
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onMovieClicked = ({ id, name }: { id: string; name: string }) => {
    const nameId = generateNameId({ id, name })
    navigate(`${path.movie}/${nameId}`)
  }
  
  return (
    <div className='page-container mb-10'>
      <form className='w-[90%] sm:w-[80%] mx-auto' onSubmit={onSubmit}>
        <div className='flex items-center'>
          <select
            className='flex-shrink-0 py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
            name='searchType'
            value={formData.searchType}
            onChange={onChange}
          >
            <option value='Movie'>Movie</option>
            <option value='Cast'>Cast</option>
          </select>
          <div className='relative w-full'>
            <input
              type='search'
              name='searchKey'
              value={formData.searchKey}
              onChange={onChange}
              className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder='Enter keywords'
            />
            <button
              type='submit'
              className='absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className='mt-6 w-[90%] sm:w-[80%] flex items-center flex-wrap gap-x-4 gap-y-2 text-white mx-auto justify-center'>
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              movieType: movieTypeConst.now_playing
            }).toString()
          }}
          className={classNames('py-2 px-3 border border-primary hover:bg-primary rounded-md', {
            'bg-primary': movieType === movieTypeConst.now_playing
          })}
        >
          Now Playing
        </Link>
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              movieType: movieTypeConst.upcoming
            }).toString()
          }}
          className={classNames('py-2 px-3 border border-primary hover:bg-primary rounded-md', {
            'bg-primary': movieType === movieTypeConst.upcoming
          })}
        >
          Upcoming
        </Link>
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              movieType: movieTypeConst.top_rated
            }).toString()
          }}
          className={classNames('py-2 px-3 border border-primary hover:bg-primary rounded-md', {
            'bg-primary': movieType === movieTypeConst.top_rated
          })}
        >
          Top Rated
        </Link>
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              movieType: movieTypeConst.popular
            }).toString()
          }}
          className={classNames('py-2 px-3 border border-primary hover:bg-primary rounded-md', {
            'bg-primary': movieType === movieTypeConst.popular
          })}
        >
          Popular
        </Link>
      </div>

      <div className='mt-10 grid grid-cols-12 gap-4 px-5'>
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3'>
                <MovieSkeleton />
              </div>
        ))}

        {movies &&
          movies.map((movie) => (
            <div className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3' key={movie.id}>
              <MovieCard movie={movie} onMovieClicked={onMovieClicked} />
            </div>
        ))}

        {casts &&
          casts.map((cast) => (
            <div className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3' key={cast.id}>
              <CastCard cast={cast} />
            </div>
        ))}

        {isNoResultFound && (
          <div className='col-span-12'>
            <NoResultFound />
          </div>
        )}
      </div>

      {!isLoading && !isNoResultFound && (
        <div className='mt-6'>
          <Pagination path={path.search} totalPages={totalPages || 1} queryConfig={params} />
        </div>
      )}
    </div>
  )
}

export default Search