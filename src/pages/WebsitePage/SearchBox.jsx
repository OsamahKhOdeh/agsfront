import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WebsitePage.css";

const SearchBox = ({ onChange }) => {
  const [filters, setFilters] = useState([]);
  const handleFilterClick = (filter) => {
    filters.map((filter) => {});
  };
  return (
    <div className="search_div_po">
      <input className="search_box_po" type="text" placeholder="Search.." name="search2" onChange={onChange} />
      <div className="filter_div">
        <div
          onClick={() => {
            handleFilterClick("battery");
          }}
          className="filter_but"
        >
          Battery
        </div>
        <div
          onClick={() => {
            handleFilterClick("solar");
          }}
          className="filter_but"
        >
          Solar
        </div>
        <div
          onClick={() => {
            handleFilterClick("inverter");
          }}
          className="filter_but"
        >
          Inverter
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
