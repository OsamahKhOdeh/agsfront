import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WebsitePage.css";

const SearchBox = ({ onChange }) => {
  return (
    <div className="search_div_po">
      <input className="search_box_po" type="text" placeholder="Search.." name="search2" onChange={onChange} />
    </div>
  );
};

export default SearchBox;
