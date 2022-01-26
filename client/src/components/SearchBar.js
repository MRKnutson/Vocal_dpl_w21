import React from "react";

const SearchBar = ({ keyword, filterRecordings }) => {
  return (
    <input
      class='search-bar'
      key='random1'
      value={keyword}
      placeholder={"Title Search"}
      onChange={(e) => filterRecordings(e.target.value)}
    />
  );
};

export default SearchBar;
