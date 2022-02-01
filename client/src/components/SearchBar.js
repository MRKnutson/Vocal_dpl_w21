import React from "react";

const SearchBar = ({ keyword, filterRecordings }) => {
  return (
    <input
      className='search-bar'
      key='random1'
      value={keyword}
      placeholder={"Search by title..."}
      onChange={(e) => filterRecordings(e.target.value)}
    />
  );
};

export default SearchBar;
