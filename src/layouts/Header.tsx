import { NavLink, createSearchParams } from "react-router-dom"
import { path } from "../constants/path"
import classNames from "classnames"

const Header = () => {
  return (
    <header className="flex items-center justify-center gap-x-8 py-5 text-white">
      <NavLink
        to={path.home}
        className={({ isActive }) => classNames({ 'text-primary border-b border-primary': isActive })}
      >Home</NavLink>
      <NavLink
        to={{
          pathname: path.search,
          search: createSearchParams({ movieType: 'now_playing' }).toString()
        }}
        className={({ isActive }) =>
          classNames('flex items-center gap-2', { 'text-primary border-b border-primary': isActive })
        }
      >
        Search
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </NavLink>
    </header>
  )
}

export default Header