import React from "react";
import { Link } from "react-router-dom";

const Headerforlogin = () => {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-full before:bg-neutral-500/30 before:backdrop-blur-md">
        <nav className="relative max-w-5xl w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-center md:py-0 mx-2 lg:mx-auto">
          <div className="flex items-center justify-center align-center">
            <div className="flex items-center p-2">
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
            </div>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </>
  );
};

export default Headerforlogin;
