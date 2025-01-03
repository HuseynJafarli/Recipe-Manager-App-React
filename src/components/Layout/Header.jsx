import React from "react";
import { NavLink } from "react-router-dom";

function Header() {

    const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to={'/'}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Recipe Manager
          </span>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`${navOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
            <NavLink
                to="/"
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive
                    ? "block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0"
                }
                aria-current="page"
                >
                Home
            </NavLink>
            </li>
            <li>
            <NavLink
                to="/recipe"
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive
                    ? "block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0"
                }
                aria-current="page"
                >
                Recipe
            </NavLink>
            </li>
            <li>
            <NavLink
                to="/contact"
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                    isActive
                    ? "block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "block py-2 px-3 text-black rounded md:bg-transparent md:text-black md:p-0"
                }
                aria-current="page"
                >
                Contact
            </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Header;
