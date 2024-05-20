interface Props {
  genres?: {
    id: number
    name: string
  }[]
}

const Genre = ({ genres }: Props) => {
  return genres ? (
    <div className='mt-10 flex items-center flex-wrap justify-center gap-4'>
      {genres.map((genre) => (
        <span key={genre.id} className='py-2 px-4 border-2 border-primary rounded-lg'>
          {genre.name}
        </span>
      ))}
    </div>
  ) : null
}

export default Genre