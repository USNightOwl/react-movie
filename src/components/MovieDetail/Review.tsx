import { config } from '../../constants/config'
import { Review as ReviewType } from '../../types/review.type'
import { isoToCustomDateFormat } from '../../utils/helpers'
import IconStar from '../IconStar'

interface Props {
  review?: ReviewType
}

const Review = ({ review }: Props) => {
  const avatar = review?.author_details.avatar_path
    ? `${config.imageW500URL}${review?.author_details.avatar_path}`
    : config.defaultCastImg

  return (
    <div className='my-4 p-4 border-[1px] border-gray-600 rounded-lg'>
      <div className='flex items-center mb-4'>
        <img className='w-10 h-10 me-4 rounded-full' src={avatar} alt='author_img' />
        <div className='font-medium dark:text-white'>
          <p>{review?.author_details.name || review?.author_details.username}</p>
          <div className='mt-1 flex items-center flex-wrap gap-x-2 text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex items-center gap-x-1'>
              {review?.author_details.rating} <IconStar />
            </div>
            <p>on {isoToCustomDateFormat(review?.created_at || new Date().toISOString())}</p>
          </div>
        </div>
      </div>
      <div>
        <p className='mb-2 text-gray-500 dark:text-gray-400 line-clamp-3'>{review?.content}</p>
      </div>
    </div>
  )
}

export default Review