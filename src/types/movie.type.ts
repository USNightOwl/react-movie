export type MovieType = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'

export type Movie = {
  id: number
  adult: boolean
  backdrop_path?: string
  poster_path?: string
  original_title: string
  title: string
  overview: string
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}