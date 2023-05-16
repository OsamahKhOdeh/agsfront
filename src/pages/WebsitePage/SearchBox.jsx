import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WebsitePage.css";
import { set } from "lodash";

const SearchBox = ({ onChange, onCategoeyChange }) => {
  const [category, setCategory] = useState("all");
  const handleFilterClick = (filter) => {
    onCategoeyChange(filter);
    setCategory(filter);
  };
  return (
    <div className="search_div_po">
      <input className="search_box_po" type="text" placeholder="Search.." name="search2" onChange={onChange} />
      <div className="filter_div">
        <div
          onClick={() => {
            handleFilterClick("battery");
          }}
          className={`filter_but ${category === "battery" ? "chosen_cat" : ""}`}
        >
          Battery
        </div>
        <div
          onClick={() => {
            handleFilterClick("solar");
          }}
          className={`filter_but ${category === "solar" ? "chosen_cat" : ""}`}
        >
          Solar
        </div>
        <div
          onClick={() => {
            handleFilterClick("inverter");
          }}
          className={`filter_but ${category === "inverter" ? "chosen_cat" : ""}`}
        >
          Inverter
        </div>
        <div
          onClick={() => {
            handleFilterClick("all");
          }}
          className={`filter_but ${category === "all" ? "chosen_cat" : ""}`}
        >
          All
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
