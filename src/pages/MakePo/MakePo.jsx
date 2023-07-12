import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/products";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Products from "./Products/Products";
import "./MakePo.scss";
import { useState } from "react";
import SearchBox from "./SearchBox";
import arrowRight from "./right-arrow.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const MakePo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.show.isLoading);
  const poProucts = useSelector((state) => state.po.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return isLoading ? (
    <div className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <div className="po_page_container">
      <div className="po-header">
        {/* <div
          onClick={() => {
            navigate("/user/poinfo");
          }}
          className="next_button_fixed"
        >
          <FontAwesomeIcon icon={faChevronRight} fade style={{ color: "#ffffff", width: "45px", height: "45px" }} />{" "}
        </div> */}
        <div className="po_filters">
          <SearchBox onChange={handleSearchBoxChange} />
          <button
            className="no_of_items"
            disabled={poProucts?.length <= 0}
            onClick={() => {
              navigate("/user/poinfo");
            }}
          >
            <div className="item_info">
              {/* <p>Items: </p> */}
              {/* <b className="pl-2"> {poProucts?.length} </b> */}
              {/* <span class="w3-badge">9</span> */}
              {/* <div className="item_icon"> */}
              <i class="uil uil-angle-right-b"></i>
              {/* </div> */}
            </div>
            {/* <i class="uil uil-arrow-circle-right"></i> */}
          </button>
          {console.log(poProucts)}
        </div>
      </div>
      <Products searchQuery={searchQuery} />
    </div>
  );
};

export default MakePo;
