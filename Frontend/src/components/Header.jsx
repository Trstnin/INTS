import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-full before:bg-neutral-500/30 before:backdrop-blur-md">
        <nav className="relative max-w-5xl w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <a
                className="flex-none rounded-md text-xl flex font-semibold focus:outline-hidden focus:opacity-80 "
                href="/"
                aria-label="INTS"
              >
                <img
                  src="https://i.pinimg.com/736x/23/3b/5f/233b5fac19d3360b84fa9814b981e6f8.jpg"
                  alt=""
                  className="h-12 rounded-4xl"
                />
                <h1 className="mt-3 ml-3 mb-1 hover:text-blue-300 text-white">
                  Into Startups
                </h1>
              </a>
              {/* End Logo */}

              <div className="ms-1 sm:ms-2"></div>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:pointer-events-none"
                id="hs-navbar-floating-dark-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-floating-dark"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-floating-dark"
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collapse */}
          <div
            id="hs-navbar-floating-dark"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
            aria-labelledby="hs-navbar-floating-dark-collapse"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-y-3 py-2 md:py-0 md:ps-7">
              <a
                className="pe-3 ps-px sm:px-3 md:py-4 text-xl text-white hover:text-blue-300 focus:outline-hidden focus:text-neutral-300"
                href="/"
                aria-current="page"
              >
                Home
              </a>
              <a
                className="pe-3 ps-px sm:px-3 md:py-4 text-xl text-white hover:text-blue-300 focus:outline-hidden focus:text-neutral-300"
                href="#"
              >
                Stories
              </a>
              <a
                className="pe-3 ps-px sm:px-3 md:py-4 text-xl text-white hover:text-blue-300 focus:outline-hidden focus:text-neutral-300"
                href="#"
              >
                Reviews
              </a>
              <a
                className="pe-3 ps-px sm:px-3 md:py-4 text-xl text-white hover:text-blue-300 focus:outline-hidden focus:text-neutral-300"
                href="#"
              >
                Learn
              </a>

              <div className="ml-16">
                <Link
                  className="group inline-flex items-center  gap-x-2 py-1 px-8 bg-green-500 hover:bg-blue-600 font-semibold text-xl text-neutral-800 rounded-full focus:outline-hidden"
                  to={"/signIn"} 
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </>
  );
};

export default Header;
