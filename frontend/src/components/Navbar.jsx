import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

function Navbar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className="shadow-lg px-4 py-3">
        <div className="flex justify-between mx-auto max-w-7xl px-4 items-center">
          <div className="text-xl font-semibold">
            Blog<span className="text-blue-700">Verse</span>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex space-x-7 font-semibold">
            <Link to={"/"} className="hover:text-blue-500">
              HOME
            </Link>
            <Link to={"/blogs"} className="hover:text-blue-500">
              BLOGS
            </Link>
            <Link to={"/creators"} className="hover:text-blue-500">
              CREATORS
            </Link>
            <Link to={"/about"} className="hover:text-blue-500">
              ABOUT
            </Link>
            <Link to={"/contact"} className="hover:text-blue-500">
              CONTACT
            </Link>
          </div>
          <div>
            {/* THis is for close and hamburger button for making website responsive */}

            <div
              className="md:hidden"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? (
                <IoCloseOutline size={24} />
              ) : (
                <GiHamburgerMenu size={24} />
              )}
            </div>
          </div>
          <div className="hidden md:flex gap-5">
            <Link
              to={"/dashboard"}
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              to={"/login"}
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              Login
            </Link>
          </div>
        </div>
        {/* Mobile */}
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen items-center justify-center space-y-4 md:hidden text-xl font-semibold">
              <Link
                to={"/"}
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                activeClass="active"
                className="hover:text-blue-500"
              >
                HOME
              </Link>
              <Link
                to={"/blogs"}
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                activeClass="active"
                className="hover:text-blue-500"
              >
                BLOGS
              </Link>
              <Link
                to={"/creators"}
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                activeClass="active"
                className="hover:text-blue-500"
              >
                CREATORS
              </Link>
              <Link
                to={"/about"}
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                activeClass="active"
                className="hover:text-blue-500"
              >
                ABOUT
              </Link>
              <Link
                to={"/contact"}
                onClick={() => setShow(!show)}
                smooth="true"
                duration={500}
                // activeClass="active"
                className="hover:text-blue-500"
              >
                CONTACT
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
