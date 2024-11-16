import { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightToBracket, faSearch, faSignOutAlt, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TokenContext } from '../../Context/TokenContext';
export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (window.scrollY > lastScrollY) {
          setShowNavBar(false);
        } else {
          setShowNavBar(true);
        }
        setLastScrollY(window.scrollY);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  let { userToken, setUserToken } = useContext(TokenContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("user");
    setUserToken(null);
    navigate("/login");
  }


  return (
    <>
      <header className="sticky top-0 inset-x-0 z-50 w-full">
        <nav
          className={`relative max-w-[66rem] w-full bg-[#101010] bg-opacity-90 rounded-2xl md:rounded-full shadow-xl shadow-black py-4 px-6 md:flex md:items-center md:justify-between transition-all duration-300 ease-in-out lg:mx-auto  ${showNavBar ? "translate-y-4" : "-translate-y-full"
            }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-none rounded-md text-xl inline-block font-semibold">
              <img src={logo} alt="logo" className="w-28 h-auto" />
            </Link>
            <div className='flex justify-center items-center gap-4'>
              {userToken ? (<>
                {/* Logout Button */}
                <div className="relative block md:hidden transition-all duration-500 ease-in-out group">
                  <button
                    type="button"
                    onClick={logOut}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white transition-transform duration-500 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </button>
                  <span
                    className="absolute right-12 hidden group-hover:block bg-gray-700 text-white text-sm rounded-full py-1 px-3 transition-opacity duration-500 ease-in-out"
                    style={{
                      transform: 'translateY(-50%)',
                      top: '50%',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Logout <FontAwesomeIcon icon={faSignOutAlt} className="ml-1" />
                  </span>
                </div>
              </>) : (<>
                {/* Dropdown Button */}
                <div className="relative block md:hidden transition-all duration-500 ease-in-out group">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white transition-transform duration-500 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  <span
                    className="absolute right-12 hidden group-hover:block bg-gray-700 text-white text-sm rounded-full py-1 px-3 transition-opacity duration-500 ease-in-out"
                    style={{
                      transform: 'translateY(-50%)',
                      top: '50%',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    LOGIN <FontAwesomeIcon icon={faRightToBracket} className="ml-1" />
                  </span>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg z-10">
                      <Link to="/register" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded-lg">
                        Register
                      </Link>
                      <Link to="/login" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded-lg">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </>)}

              <button
                onClick={toggleMenu}
                className="md:hidden text-white focus:outline-none hover:text-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={isOpenMenu ? faXmark : faBars} size="lg" />
              </button>
            </div>
          </div>

          <div
            className={`md:flex md:items-center md:gap-0 lg:gap-10 xl:gap-14 ${isOpenMenu ? "block" : "hidden"
              } md:block`}
          >

            <ul className="flex flex-col mt-3 md:mt-0 md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <li className="relative group">
                <NavLink
                  to="/"
                  className="block w-full md:w-auto text-center text-white bg-transparent py-2 px-4 transition duration-300 ease-in-out transform rounded-xl hover:shadow-red-600 hover:shadow-2xl"
                >
                  Movies
                </NavLink>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-red-600 transition-all duration-300 ease-in-out group-hover:w-3/4"></span>
              </li>
              <li className="relative group">
                <NavLink
                  to="tranding"
                  className="block w-full md:w-auto text-center text-white bg-transparent py-2 px-4 transition duration-300 ease-in-out transform rounded-xl hover:shadow-red-600 hover:shadow-2xl"
                >
                  Tranding
                </NavLink>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-red-600 transition-all duration-300 ease-in-out group-hover:w-3/4"></span>
              </li>
              <li className="relative group">
                <NavLink
                  to="discover"
                  className="block w-full md:w-auto text-center text-white bg-transparent py-2 px-4 transition duration-300 ease-in-out transform rounded-xl hover:shadow-red-600 hover:shadow-2xl"
                >
                  <FontAwesomeIcon icon={faSearch} />{" "}Discover
                </NavLink>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-red-600 transition-all duration-300 ease-in-out group-hover:w-3/4"></span>
              </li>
              <li className="relative group">
                <NavLink
                  to="tv"
                  className="block w-full md:w-auto text-center text-white bg-transparent py-2 px-4 transition duration-300 ease-in-out transform rounded-xl hover:shadow-red-600 hover:shadow-2xl"
                >
                  TVs
                </NavLink>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-[1px] bg-red-600 transition-all duration-300 ease-in-out group-hover:w-3/4"></span>
              </li>
            </ul>
            {userToken ? (<>
              {/* Logout Button */}
              <div className="relative md:block hidden transition-all duration-500 ease-in-out group">
                <button
                  type="button"
                  onClick={logOut}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white transition-transform duration-500 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
                <span
                  className="absolute right-12 hidden group-hover:block bg-gray-700 text-white text-sm rounded-full py-1 px-3 transition-opacity duration-500 ease-in-out"
                  style={{
                    transform: 'translateY(-50%)',
                    top: '50%',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Logout <FontAwesomeIcon icon={faSignOutAlt} className="ml-1" />
                </span>
              </div>
            </>) : (<>
              {/* Dropdown Button */}
              <div className="relative md:block hidden transition-all duration-500 ease-in-out group">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white transition-transform duration-500 ease-in-out"
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <span
                  className="absolute right-12 hidden group-hover:block bg-gray-700 text-white text-sm rounded-full py-1 px-3 transition-opacity duration-500 ease-in-out"
                  style={{
                    transform: 'translateY(-50%)',
                    top: '50%',
                    whiteSpace: 'nowrap'
                  }}
                >
                  LOGIN <FontAwesomeIcon icon={faRightToBracket} className="ml-1" />
                </span>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg z-10">
                    <Link to="/register" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded-lg">
                      Register
                    </Link>
                    <Link to="/login" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-700 rounded-lg">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </>)}
          </div>
        </nav>
      </header>
    </>
  )
}
