import React from "react";
import "./EditStock.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProductStock } from "../../actions/products";
import SearchBox from "../MakePo/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";
import { useState } from "react";
import { timeAgo } from "../../helpers/timeAgo";
import useAuth from "../../hooks/useAuth";

function StockInput(props) {
  console.log(props.updateKey);
  const { username } = useAuth();
  const [stock, setStock] = useState(props.stock);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setStock(e.target.value);
  };
  const handleStockChange = () => {
    dispatch(updateProductStock(props.id, { property: props.property, value: stock, employee: username }));
  };
  return <input type="text" className="" value={stock} onChange={handleChange} onBlur={handleStockChange}></input>;
}

const EditStock = () => {
  const today = new Date();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("brand");
  const [dateFilter, setDateFilter] = useState(today);
  const [updateKey, setupdateKey] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let products = useSelector((state) => state.products.products);
  /* ------------------------------- searchQuery ------------------------------ */

  const handleSearchQueryChange = (e) => {
    setupdateKey(Math.random());
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    products = products.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    products = products.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (dateFilter !== "All") {
    products = products.filter((item) => {
      if (
        new Date(dateFilter).getFullYear() === new Date(item.updatedAt).getFullYear() &&
        new Date(dateFilter).getMonth() === new Date(item.updatedAt).getMonth() &&
        new Date(dateFilter).getDay() === new Date(item.updatedAt).getDay()
      ) {
        return item;
      }
    });
  }

  const options = [
    { name: "Brand", value: "brand" },
    { name: "Country", value: "country" },
    { name: "Product Code", value: "code" },
    { name: "Capacity", value: "capacity" },
    { name: "Categoty", value: "category" },
  ];

  const dateOptions = [
    { name: "Today", value: today },
    { name: "Yesterday", value: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24) },
    { name: "All", value: "All" },
  ];
  /* -------------------------------------------------------------------------- */

  return (
    <div style={{ width: "85%", margin: "auto" }}>
      {/* <div className="search_container">
        <SearchBox onChange={handleSearchQueryChange}></SearchBox>
        <DropDownSelect onChange={handleFilterChange} options={options} />
        <DropDownSelect onChange={handleDateChange} options={dateOptions} />
  </div> */}
      <table className="pi__table table table-bordered">
        <thead className="th_style">
          <tr>
            <th scope="col">
              <div className="th_cell_div">Image</div>
            </th>
            <th scope="col">
              <div className="th_cell_div">Country</div>
            </th>
            <th scope="col">
              <div className="th_cell_div">Brand</div>
            </th>
            <th scope="col">
              <div className="th_cell_div">Code</div>
            </th>
            <th scope="col">
              <div className="th_cell_div">Capacity</div>
            </th>
            <th style={{ width: "140px" }} scope="col">
              <div className="th_cell_div">Available</div>
            </th>
            <th style={{ width: "140px" }} scope="col">
              <div className="th_cell_div">Booked</div>
            </th>
            <th style={{ width: "140px" }} scope="col">
              <div className="th_cell_div"> Coming</div>
            </th>
            <th style={{ width: "225px" }} scope="col">
              <div className="th_cell_div"> Last Upadte(by)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
              <td scope="row">
                {" "}
                <div style={{ fontWeight: "bold" }} className="td_padding">
                  <img className="product_image_td" src={item?.image[0]} alt="imager" />
                </div>
              </td>
              <td>
                <div className="td_padding employee_cell">{item?.country}</div>
              </td>
              <td>
                <div className="td_padding">{item?.brand}</div>
              </td>
              <td>
                <div className="td_padding customer_cell">{item?.code}</div>
              </td>
              <td>
                <div className="td_padding">{item?.capacity}</div>
              </td>
              <td
                style={item?.stock === 0 || !item.stock ? { backgroundColor: "rgb(254 184 184)" } : { backgroundColor: "rgb(201 245 189)" }}
              >
                <div className={"td_padding"}>
                  <StockInput updateKey={updateKey} property={"stock"} id={item._id} stock={item?.stock}></StockInput>
                </div>
              </td>
              <td style={item?.booked === 0 ? { backgroundColor: "rgb(254 184 184)" } : { backgroundColor: "rgb(201 245 189)" }}>
                <div className="td_padding">
                  <StockInput updateKey={updateKey} property={"booked"} id={item._id} stock={item?.booked}></StockInput>
                </div>
              </td>
              <td style={item?.coming === 0 ? { backgroundColor: "rgb(254 184 184)" } : { backgroundColor: "rgb(201 245 189)" }}>
                <div className="td_padding">
                  <StockInput updateKey={updateKey} property={"coming"} id={item._id} stock={item?.coming}></StockInput>
                </div>
              </td>

              <td className={""}>
                {" "}
                <div className="td_padding">
                  {timeAgo(new Date(item.updatedAt))} ({item?.lastUpdateBy}){" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditStock;
