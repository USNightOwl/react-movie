import { useQuery } from "@tanstack/react-query"
import { MovieType } from "../constants/movieType"
import movieApi from "../apis/movie.api"

const Home = () => {

  const { data: nowPlayingMovies, isLoading: isLoadingNowPlayingMovies } = useQuery({
    queryKey: ['movies', MovieType.now_playing],
    queryFn: () =>
      movieApi.getMovies({
        movie_type: MovieType.now_playing
      })
  })

  console.log(nowPlayingMovies);

  return (
    <div>Home</div>
  )
}

export default Home