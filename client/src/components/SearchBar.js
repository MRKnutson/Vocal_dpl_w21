import React from "react";
import styled from "styled-components";

const SearchBar = ({ keyword, filterRecordings }) => {
  const BarStyling = {
    width: "20rem",
    border: "1px solid black",
    marginBottom: "30px",
    float: "right",
    borderRadius: "10px",
    paddingLeft: "10px",
  };

  const SearchInput = styled.input`
    width: 20rem;
    margin-bottom: 30px;
    float: right;
    border-radius: 10px;
    padding-left: 10px;
  `;
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
