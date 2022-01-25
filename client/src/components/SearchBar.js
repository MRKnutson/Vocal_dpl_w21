import React from "react";

const SearchBar = ({ keyword, filterRecordings }) => {
  const BarStyling = {
    width: "20rem",
    border: "1px solid black",
    marginBottom: "30px",
    float: "right",
    borderRadius: "10px",
    paddingLeft: "10px",
  };
  return (
    <input
      style={BarStyling}
      key='random1'
      value={keyword}
      placeholder={"Title Search"}
      onChange={(e) => filterRecordings(e.target.value)}
    />
  );
};

export default SearchBar;
