"use client";

import { FaHome, FaSearch, FaSignOutAlt } from "react-icons/fa";
import NavListItem from "./NavListItem";
import { FiFilm, FiLogIn, FiMenu } from "react-icons/fi";
import { ChangeEvent, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import Link from "next/link";
import SearchResults from "./SearchResults";
import { MdSettings } from "react-icons/md";

function Header() {
  const [hideMobileMenu, setHideMobileMenu] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const debouncedSearchTerm = useDebounce(searchPhrase, 500);

  const toggleMobileMenu = () => {
    setHideMobileMenu(!hideMobileMenu);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(event.target.value);
  };

  const onClick = () => {
    // dispatch(newSearch(searchPhrase));
    setSearchPhrase("");
  };

  return (
    <header className="flex flex-wrap bg-main-dark">
      <div className="flex flex-1">
        <button
          onClick={toggleMobileMenu}
          className="nav-btn mr-1 block md:hidden"
        >
          <FiMenu />
        </button>
        <NavListItem href="/">
          <FaHome className="mr-1" />
          Home
        </NavListItem>
        <div className="flex-1 my-2 max-w-2xl relative">
          <div className="flex rounded border border-main-light overflow-hidden">
            {/* TODO: add on submit */}
            <input
              type="text"
              className="flex-1 bg-main px-2 text-white"
              placeholder="Search..."
              onChange={onChange}
            />
            <Link
              className="text-white bg-success hover:bg-success-dark p-1.5"
              href={"/search?query=" + searchPhrase}
              onClick={onClick}
            >
              <FaSearch />
            </Link>
          </div>
          {/* <SearchResults phrase={debouncedSearchTerm} /> */}
        </div>
      </div>
      <div className="flex">
        {/* {
              authenticated ? 
              (
                <>
                  <NavLink className={({isActive}) => isActive ? navLinkStyleActive : navLinkStyle} to="/my-movies"><FiFilm className="mr-1" />My Movies</NavLink>
                  <button className="flex text-white h-full items-center px-3 py-2 text-lg md:hidden">
                    <FaUserCircle className="mr-1" />
                  </button>
                  <AccountDropDown />
                </>
              ) : 
              (
                <NavLink className={navLinkStyle} to="/sign-in"><FiLogIn className="mr-1"/> Sign in</NavLink>
              )
            } */}
        <Link className="nav-btn mr-3 hidden md:flex" href="/sign-in">
          <FiLogIn className="mr-1" /> Sign in
        </Link>
      </div>
      <div
        className={`${
          hideMobileMenu ? "hidden" : "block"
        } w-full divide-y divide-main-light`}
      >
        <div>
          <Link className="nav-btn flex w-full" href="/">
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link className="nav-btn flex w-full" href="/my-movies">
            <FiFilm className="mr-1" />
            My Movies
          </Link>
        </div>
        <div>
          <Link className="nav-btn flex w-full" href="/account-settings">
            <MdSettings className="mr-1" />
            Account settings
          </Link>
        </div>
        <div>
          <Link className="nav-btn flex w-full" href="/sign-in">
            <FaSignOutAlt className="mr-1" />
            Signout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
