import React, { Fragment, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchOverlay from "../elements/SearchOverlay";
const InputSearchHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [goSearchPage, setGoSearchPage] = useState(false);
  return (
    <div className="input-search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGoSearchPage(true);
        }}
        action=""
        className="search-bar"
      >
        <input
          placeholder="Search product..."
          className="js-search"
          type="text"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </form>
      <button
        onClick={(e) => {
          setGoSearchPage(true);
        }}
      >
        <IoIosSearch />
      </button>
      <div className="search-result">
        <div className="overfolow-hidden">
          <SearchOverlay
            inputValue={searchValue}
            activeStatus={searchValue.length ? true : false}
            goSearchPage={goSearchPage}
          />
        </div>
      </div>
    </div>
  );
};
export default InputSearchHeader;
