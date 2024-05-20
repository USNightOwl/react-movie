import { Link } from "react-router-dom"
import { Actor } from "../../types/actor.type"
import { generateNameId } from "../../utils/helpers"
import { config } from "../../constants/config"

interface Props {
  cast: Actor
}

const CastCard = ({ cast }: Props) => {
  const nameId = generateNameId({ id: String(cast.id), name: cast.name })

  return (
    <Link to={`/cast/${nameId}`} className='cast relative group'>
      <img
        src={cast.profile_path ? `${config.imageW500URL}${cast.profile_path}` : config.defaultCastImg}
        alt='cast_img'
        className='w-full h-full max-h-[350px] object-cover rounded-lg'
      />
      <div className='flex justify-center items-center rounded-b-lg opacity-0 w-full h-[100px] absolute bottom-[100px] bg-[rgba(0,0,0,0.8)] translate-y-full group-hover:opacity-100 transition-all'>
        <p className='text-xl px-4 text-primary'>{cast.name}</p>
      </div>
    </Link>
  )
}

export default CastCard