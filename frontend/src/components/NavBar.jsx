import {useState, useEffect} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {BiSearchAlt, BiPlus, BiChevronRight,BiChevronLeft} from 'react-icons/bi'
import {RiHome7Fill} from 'react-icons/ri'

import logo from '../assets/logo.png'

const categories = [
  {name: "Animals"},
  {name: "Nature"},
  {name: "Funny"},
  {name: "Food"},
  {name: "Travel"},
  {name: "Weird"},
  {name: "Places"},
  {name: "Art"},
  {name: "Crypto"},
  {name: "Animals"},
  {name: "Nature"},
  {name: "Funny"},
  {name: "Food"},
  {name: "Travel"},
  {name: "Weird"},
  {name: "Places"},
  {name: "Art"},
  {name: "Crypto"},
]

const NavBar = ({searchTerm, setSearchTerm, user}) => {

  const navigate = useNavigate()

  const isActiveStyle = "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-extrabold transition-all duration-200 ease-all-in"

  const isNotActiveStyle = "flex items-center px-2 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-black transition-all duration-200"

  const [isScroll, setScroll] = useState(false);

  useEffect(() => {}, [isScroll]);

  const scrollOnClick = (side) => {
    setScroll(true);
    // Move right or left 200px
    side === "right"
      ? (document.getElementById("category").scrollLeft += 200)
      : (document.getElementById("category").scrollLeft -= 200);
    // Do not show scroll if left less than 199px
    document.getElementById("category").scrollLeft < 199
      ? setScroll(false)
      : setScroll(true);
  };
 
  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full py-2">
        <Link to="/">
          <img src={logo} alt="logo" className='w-40 cursor-pointer' />
        </Link>
      {/* Search */}
      <div className="flex justify-between items-center w-full bg-white shadow-md rounded-lg mx-4">
        <BiSearchAlt fontSize={30} className="text-gray-700" />
        <input 
        type="text" 
        placeholder='Search' 
        className='w-full outline-none border-none px-3 text-gray-800 font-semibold text-base'
        onFocus={() => navigate('/search')}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Submit photo */}
      <div className="flex justify-center items-center">
        <Link to="create-pin">
          <button type="button"><div className="bg-black w-10 h-10 rounded-md md-hidden flex items-center justify-center">
          <BiPlus fontSize={24} className="text-white" />
        </div></button>
        </Link>
      </div>
      {/* Profile */}
      <Link to={`user-profile/${user?._id}`} className='flex items-center justify-center shadow-lg rounded-full bg-slate-500 ml-4' >
        <img src={user?.image} className="rounded-full" alt="user profile" />
      </Link>
      </div>

      {/* Categories */}
      <div className="flex items-center w-full py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <RiHome7Fill fontSize={30} />
        </NavLink>

        <div className="h-6 w-[1px] bg-slate-500 mr-2"></div>

        <div className="flex items-center w-full h-10 overflow-y-hidden hide_scrollbar relative">
          <div
            className={`${
              isScroll ? "flex" : "hidden"
            } absolute left-0 w-32 h-10 justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
            onClick={() => scrollOnClick("left")}
            id="leftSide"
          >
            <BiChevronLeft fontSize={30} />
          </div>
          <div
            className="flex items-center w-full overflow-y-hidden hide_scrollbar scroll-smooth duration-150 ease-in-out"
            id="category"
          >
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                key={category.name}
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <div
            className="absolute right-0 w-32 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer "
            onClick={() => scrollOnClick("right")}
          >
            <BiChevronRight fontSize={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar