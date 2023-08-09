/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { transportLinks, mainlinks } from "../links"
import { FaHome } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import { MdFeedback } from "react-icons/md"
import { Divider } from "./Divider"
import { v4 as uuidv4 } from "uuid"

export const NavBar = () => {
  const isActive = (path) => {
    if (path === window.location.pathname) {
      return true
    }
    return false
  }
  return (
    <>
      <div className="fixed bottom-0 z-30 flex h-16 w-screen justify-center border-t border-solid border-slate-100 bg-white shadow-lg md:h-full md:w-16 md:flex-col md:justify-between">
        <div className="flex items-center md:flex-col">
          <Link to="/" className="h-full w-full p-3 px-5 md:px-3">
            <FaHome className="icon-bar-icon" />
          </Link>

          {/* <Divider className="invisible md:hidden" orientation={"vertical"} /> */}

          <hr className="my-2 hidden w-4/5 border md:block" />

          <ul className=" flex md:flex-col ">
            {transportLinks.map((link) => {
              return (
                <li
                  key={uuidv4()}
                  className={
                    "flex " + ` ${isActive(link.url) && "bg-slate-300"}`
                  }
                >
                  <div
                    key={uuidv4()}
                    className="h-16 w-20 cursor-pointer p-3 md:w-16"
                  >
                    <Link
                      to={link.url}
                      className="block h-full w-full px-2 md:px-0 "
                    >
                      {link.iconSvg}
                    </Link>
                  </div>
                  {/* <Divider
                    key={uuidv4()}
                    className="invisible md:hidden"
                    orientation={"vertical"}
                  /> */}
                </li>
              )
            })}
          </ul>

          <hr className="my-2 hidden w-4/5 border md:block" />

          <ul className="hidden md:flex md:flex-col">
            {mainlinks.map((link) => {
              return (
                <li
                  key={uuidv4()}
                  className={
                    "h-16 w-16 cursor-pointer p-3" +
                    ` ${isActive(link.url) && "bg-slate-300"}`
                  }
                >
                  <Link to={link.url} className="block h-full w-full">
                    {link.iconSvg}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center md:flex-col">
          <hr className="my-2 hidden w-4/5 border md:block" />

          <Link
            to="/profile"
            className={
              "h-full w-full p-3 px-5 md:px-3" +
              ` ${isActive("/profile") && "bg-slate-300"}`
            }
          >
            <IoPerson className="icon-bar-icon" />
          </Link>

          <Link
            to="/feedback"
            className={
              "hidden h-full w-full p-3 md:block" +
              ` ${isActive("/feedback") && "bg-slate-300"}`
            }
          >
            <MdFeedback className="icon-bar-icon" />
          </Link>
        </div>
      </div>
    </>
  )
}
