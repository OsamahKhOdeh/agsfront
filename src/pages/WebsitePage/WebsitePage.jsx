import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Products from "./Products/Products";
import "./WebsitePage.css";
import { useState } from "react";
import SearchBox from "./SearchBox";
const WebsitePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.show.isLoading);
  const poProucts = useSelector((state) => state.po.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };
  return isLoading ? (
    <div className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="po_page_container">
      <div className="po_filters">
        <SearchBox onChange={handleSearchBoxChange} onCategoeyChange={handleCategoryChange} />
      </div>

      <Products searchQuery={searchQuery} category={category} />
    </div>
  );
};

export default WebsitePage;
