import { Link, createSearchParams } from "react-router-dom";
import { QueryConfig } from "../../types/query.type"
import ArrowLeft from "./ArrowLeft";
import ThreeDot from "./ThreeDot";
import ArrowRight from "./ArrowRight";

interface Props {
  totalPages: number;
  range?: number;
  queryConfig: QueryConfig;
  path: string;
}

const FIRST_PAGE = 1
const MAX_PAGE = 500
const CLICKABLE_CSS = 'h-8 min-w-8 px-2 rounded shadow-sm bg-white flex text-black items-center justify-center'
const UNCLICKABLE_CSS = `${CLICKABLE_CSS} bg-opacity-60 cursor-not-allowed`


const Pagination = ({ totalPages, queryConfig, range = 2, path }: Props) => {
  const LAST_PAGE = totalPages <= MAX_PAGE ? totalPages : MAX_PAGE;
  const currentPage = Number(queryConfig.page) || 1
  const firstRange = Math.max(currentPage - range, 1)
  const lastRange = Math.min(currentPage + range, LAST_PAGE)
  let isHeadDotShowed = false
  let isTailDotShowed = false

  return (
    <div className='mt-4 flex items-center flex-wrap gap-2 justify-center text-primary'>
      {/* Previous */}
      {FIRST_PAGE === currentPage ? (
        <span className={UNCLICKABLE_CSS}>
          <ArrowLeft />
        </span>
      ) : (
        <Link to={{
          pathname: path,
          search: createSearchParams({ ...queryConfig, page: (currentPage - 1).toString() }).toString()
        }}
        className={CLICKABLE_CSS}
        >
          <ArrowLeft />
        </Link>
      )}
      {
        Array(LAST_PAGE).fill(0).map((_, index) => {
          const pageIndex = index + 1;
          if (pageIndex !== FIRST_PAGE && pageIndex < firstRange) {
            if (!isHeadDotShowed) {
              isHeadDotShowed = true
              return <ThreeDot key={pageIndex} />
            }
            return null
          }

          if (pageIndex !== LAST_PAGE && pageIndex > lastRange) {
            if (!isTailDotShowed) {
              isTailDotShowed = true
              return <ThreeDot key={pageIndex} />
            }
            return null
          }

          return pageIndex === currentPage ? (
            <span className={UNCLICKABLE_CSS} key={pageIndex}>
              {pageIndex}
            </span>
          ) : (
            <Link
              to={{
                pathname: path,
                search: createSearchParams({ ...queryConfig, page: pageIndex.toString() }).toString()
              }}
              className={CLICKABLE_CSS}
              key={pageIndex}
            >
              {pageIndex}
            </Link>
          )
        })}

      {LAST_PAGE === currentPage ? (
        <span className={UNCLICKABLE_CSS}>
          <ArrowRight />
        </span>
      ) : (
        <Link
          to={{
            pathname: path,
            search: createSearchParams({ ...queryConfig, page: (currentPage + 1).toString() }).toString()
          }}
          className={CLICKABLE_CSS}
        >
          <ArrowRight />
        </Link>
      )}
    </div>
  )
}

export default Pagination