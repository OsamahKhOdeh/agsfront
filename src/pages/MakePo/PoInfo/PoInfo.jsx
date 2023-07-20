import React, { useEffect, useState } from "react";
import "./PoInfo.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { createPurchaseOrder } from "../../../actions/purchaseOrder";
import { BASE_URL } from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../../helpers/toaster";
const PoInfo = () => {
  const [poInfoChoices, setPoInfoChoices] = useState();
  const [exporter, setExporter] = useState();
  const [buyer, setBuyer] = useState();
  const [consignee, setConsignee] = useState();
  const [notifyParty, setNotifyParty] = useState();
  const [portOfOrigion, setPortOfOrigion] = useState();
  const [portOfDischarge, setPortOfDischarge] = useState();
  const [incoterms, setIncoterms] = useState();
  const vals = useSelector((state) => state.po);
  const [poInfo, setPoInfo] = useState(useSelector((state) => state.po));
  const [poProducts, setPoProducts] = useState(useSelector((state) => state.po.products));

  const { username } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const updatedValues = {
      ...poInfo,
      employee: username,
    };
    setPoInfo(updatedValues);
  }, []);

  console.log(poInfo);
  const handleItemChange = (e, itemName) => {
    const updatedValues = {
      ...poInfo,
      [itemName]: e.target.value,
    };
    setPoInfo(updatedValues);
  };

  let totalAll = 0;
  poInfo?.products?.map((product) => {
    totalAll += product.price * product.qty;
  });

  const handleProductQtyChange = (event, id) => {
    const value = event.target.value;
    let theproducts = [...poInfo.products];
    const theProduct = theproducts.filter((product) => product._id === id)[0];
    const index = theproducts.indexOf(theProduct);
    let clonePro = { ...theproducts[index] };
    clonePro.qty = parseInt(value);
    theproducts[index] = clonePro;
    setPoInfo((values) => ({ ...values, products: theproducts }));
  };

  const handleProductPriceChange = (event, id) => {
    const value = event.target.value;
    let theproducts = [...poInfo.products];
    const theProduct = theproducts.filter((product) => product._id === id)[0];
    const index = theproducts.indexOf(theProduct);
    let clonePro = { ...theproducts[index] };

    clonePro.price = parseFloat(value);

    theproducts[index] = clonePro;
    setPoInfo((values) => ({ ...values, products: theproducts }));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/poinfo`)
      .then(function (response) {
        setPoInfoChoices(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  const handleNext = () => {
    dispatch(createPurchaseOrder(poInfo));
    showToastMessage("Add PO Succesfully", "success");
    setTimeout(() => {
      navigate("/user/orders", { state: "purchaseOrderOrders" });
    }, 3000);
  };

  return (
    <>
      <div className="custom-card">
        <div className="custom-card-header">
          <div className="custom-card-tittle">
            <h6>Add Po</h6>
          </div>
        </div>
        <div className="custom-card-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Exporter</label>
                <select
                  type="text"
                  className="form-select"
                  value={poInfo.exporter}
                  onChange={(e) => {
                    handleItemChange(e, "exporter");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose exporter..."}
                  </option>
                  {poInfoChoices?.supplier?.map((poExporter) => (
                    <option value={poExporter}>{poExporter.split(".")[0]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Buyer</label>
                <select
                  class="form-select"
                  value={poInfo.buyerAddress}
                  onChange={(e) => {
                    handleItemChange(e, "buyerAddress");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose buyer..."}
                  </option>
                  {poInfoChoices?.buyer?.map((item) => (
                    <option value={item}>{item.split(".")[0]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Consignee</label>
                <select
                  class="form-select  info_item_select"
                  aria-label=".form-select-lg example"
                  value={poInfo.consignee}
                  onChange={(e) => {
                    handleItemChange(e, "consignee");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose Consignee..."}
                  </option>
                  {poInfoChoices?.consignee?.map((item) => (
                    <option value={item}>{item.split(".")[0]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Notify Party</label>
                <select
                  class="form-select  info_item_select"
                  aria-label=".form-select-lg example"
                  value={poInfo.notifyParty}
                  onChange={(e) => {
                    handleItemChange(e, "notifyParty");
                  }}
                  autocomplete="on"
                >
                  <option value={""} selected disabled>
                    {"Choose Notify Party..."}
                  </option>
                  {poInfoChoices?.notifyParty?.map((item) => (
                    <option value={item}>{item.split(".")[0]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Port of Origin</label>
                <select
                  class="form-select"
                  aria-label=".form-select-lg example"
                  value={poInfo.portOfOrigin}
                  onChange={(e) => {
                    handleItemChange(e, "portOfOrigin");
                  }}
                  autocomplete="on"
                >
                  <option value={""} selected disabled>
                    {"Choose Port Of Origion..."}
                  </option>
                  {poInfoChoices?.portOfOrigin?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="exporter">Port of Discharge</label>
                <select
                  class="form-select"
                  aria-label=".form-select-lg example"
                  value={poInfo.portOfDischarge}
                  onChange={(e) => {
                    handleItemChange(e, "portOfDischarge");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose Port Of Discharge..."}
                  </option>
                  {poInfoChoices?.finalDestination?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="exporter">Incoterms</label>
                <select
                  class="form-select "
                  value={poInfo.incoterms}
                  onChange={(e) => {
                    handleItemChange(e, "incoterms");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose Incoterms..."}
                  </option>
                  {poInfoChoices?.incoterm?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="exporter">Currency</label>
                <select
                  class="form-select"
                  value={poInfo.currency}
                  onChange={(e) => {
                    handleItemChange(e, "currency");
                  }}
                >
                  <option value={""} selected disabled>
                    {"Choose Currency..."}
                  </option>
                  {poInfoChoices?.currency.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="exporter">Discount (%) </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder=""
                  value={poInfo.discount}
                  onChange={(e) => {
                    handleItemChange(e, "discount");
                  }}
                  autocomplete="on"
                />
              </div>
            </div>
            <div className="col-12 mt-3 mb-3">
              <table class="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {poInfo.products.map((poProduct, index) => (
                    <tr>
                      <td>
                        {poProduct.code}&nbsp;({poProduct.brand})
                      </td>
                      <td>{poProduct.capacity}</td>
                      <td>
                        <input onChange={(e) => handleProductQtyChange(e, poProduct._id)} type="text" className="form-control w-75" autocomplete="on"></input>
                      </td>
                      <td>
                        <input onChange={(e) => handleProductPriceChange(e, poProduct._id)} type="text" className="form-control w-75" autocomplete="on"></input>
                      </td>
                      <td>
                        {(poProduct.price * poProduct.qty)?.toFixed(3)} &nbsp;{poInfo.currency}{" "}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>
                      <strong>Sub Total</strong>
                    </td>
                    <td>
                      <strong>
                        {totalAll.toFixed(2)}&nbsp;{poInfo.currency}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <strong>Discount (0 %)</strong>
                    </td>
                    <td>
                      <strong>
                        {" "}
                        {((totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>
                        {(totalAll - (totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
                      </strong>
                    </td>
                  </tr>
                  {/* {poInfo.products.map((poProduct, index) => (
                    <div className="po_product">
                      <div className="po_product_num">{index + 1}</div>
                      <div className="po_product_code">
                        {poProduct.code}&nbsp;({poProduct.brand})
                      </div>
                      <div className="po_product_capacity">{poProduct.capacity}</div>
                      <div className="po_product_qty">
                        <input onChange={(e) => handleProductQtyChange(e, poProduct._id)} type="text" className="form-control" autocomplete="on"></input>
                      </div>
                      <div className="po_product_price">
                        <input onChange={(e) => handleProductPriceChange(e, poProduct._id)} type="text" className="form-control" autocomplete="on"></input>
                      </div>
                      {console.log(poProduct.price)}
                      <div className="po_product_total_amount">
                        {(poProduct.price * poProduct.qty)?.toFixed(3)} &nbsp;{poInfo.currency}{" "}
                      </div>
                    </div>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="poinfo_page_container">
            {/* <div className="info_item">
              <label className="info_item_label">Exporter</label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.exporter}
                onChange={(e) => {
                  handleItemChange(e, "exporter");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose exporter..."}
                </option>
                {poInfoChoices?.supplier?.map((poExporter) => (
                  <option value={poExporter}>{poExporter.split(".")[0]}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.exporter}
                onChange={(e) => {
                  handleItemChange(e, "exporter");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Buyer : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.buyerAddress}
                onChange={(e) => {
                  handleItemChange(e, "buyerAddress");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose buyer..."}
                </option>
                {poInfoChoices?.buyer?.map((item) => (
                  <option value={item}>{item.split(".")[0]}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.buyerAddress}
                onChange={(e) => {
                  handleItemChange(e, "buyerAddress");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Consignee : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.consignee}
                onChange={(e) => {
                  handleItemChange(e, "consignee");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose Consignee..."}
                </option>
                {poInfoChoices?.consignee?.map((item) => (
                  <option value={item}>{item.split(".")[0]}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.consignee}
                onChange={(e) => {
                  handleItemChange(e, "consignee");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Notify Party : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.notifyParty}
                onChange={(e) => {
                  handleItemChange(e, "notifyParty");
                }}
                autocomplete="on"
              >
                <option value={""} selected disabled>
                  {"Choose Notify Party..."}
                </option>
                {poInfoChoices?.notifyParty?.map((item) => (
                  <option value={item}>{item.split(".")[0]}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.notifyParty}
                onChange={(e) => {
                  handleItemChange(e, "notifyParty");
                }}
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Port of Origin : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.portOfOrigin}
                onChange={(e) => {
                  handleItemChange(e, "portOfOrigin");
                }}
                autocomplete="on"
              >
                <option value={""} selected disabled>
                  {"Choose Port Of Origion..."}
                </option>
                {poInfoChoices?.portOfOrigin?.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.portOfOrigion}
                onChange={(e) => {
                  handleItemChange(e, "portOfOrigin");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Port of Discharge : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.portOfDischarge}
                onChange={(e) => {
                  handleItemChange(e, "portOfDischarge");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose Port Of Discharge..."}
                </option>
                {poInfoChoices?.finalDestination?.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.portOfDischarge}
                onChange={(e) => {
                  handleItemChange(e, "portOfDischarge");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Incoterms : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.incoterms}
                onChange={(e) => {
                  handleItemChange(e, "incoterms");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose Incoterms..."}
                </option>
                {poInfoChoices?.incoterm?.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.incoterms}
                onChange={(e) => {
                  handleItemChange(e, "incoterms");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Currency : </label>
              <select
                class="form-select  info_item_select"
                aria-label=".form-select-lg example"
                value={poInfo.currency}
                onChange={(e) => {
                  handleItemChange(e, "currency");
                }}
              >
                <option value={""} selected disabled>
                  {"Choose Currency..."}
                </option>
                {poInfoChoices?.currency.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <input
                className="info_item_input"
                type="text"
                placeholder=""
                value={poInfo.currency}
                onChange={(e) => {
                  handleItemChange(e, "currency");
                }}
                autocomplete="on"
              ></input>
            </div>{" "}
            <div className="info_item">
              <label className="info_item_label">Discount : (%) </label>
              <input
                className="info_item_input"
                style={{ width: "180%" }}
                type="text"
                placeholder=""
                value={poInfo.discount}
                onChange={(e) => {
                  handleItemChange(e, "discount");
                }}
                autocomplete="on"
              ></input>
            </div>{" "} */}
            {/* <div className="po_products">
              <div className="po_product head_title">
                <div className="po_product_num">#</div>
                <div className="po_product_code">Products</div>
                <div className="po_product_capacity">Capacity</div>
                <div style={{ textAlign: "center", padding: "10px" }} className="po_product_qty">
                  Qty
                </div>
                <div style={{ textAlign: "center", padding: "10px" }} className="po_product_price">
                  Price
                </div>
                <div style={{ textAlign: "center", padding: "10px" }} className="po_product_price">
                  Total
                </div>
              </div>
              {poInfo.products.map((poProduct, index) => (
                <div className="po_product">
                  <div className="po_product_num">{index + 1}</div>
                  <div className="po_product_code">
                    {poProduct.code}&nbsp;({poProduct.brand})
                  </div>
                  <div className="po_product_capacity">{poProduct.capacity}</div>
                  <div className="po_product_qty">
                    <input onChange={(e) => handleProductQtyChange(e, poProduct._id)} type="text" className="po_product_qty po_product_qty_input" autocomplete="on"></input>
                  </div>
                  <div className="po_product_price">
                    <input onChange={(e) => handleProductPriceChange(e, poProduct._id)} type="text" className="po_product_price" autocomplete="on"></input>
                  </div>
                  {console.log(poProduct.price)}
                  <div className="po_product_total_amount">
                    {(poProduct.price * poProduct.qty)?.toFixed(3)} &nbsp;{poInfo.currency}{" "}
                  </div>
                </div>
              ))}
              <div style={{ backgroundColor: "#d9d9d9" }} className="po_product footer_div">
                <div className="footer_div_total">Sub Total</div>
                <div className="footer_div_total_val">
                  {totalAll.toFixed(2)}&nbsp;{poInfo.currency}
                </div>
              </div>
              <div style={{ backgroundColor: "#ebebeb" }} className="po_product footer_div">
                <div className="footer_div_total">Discount ( {poInfo.discount} % )</div>
                <div className="footer_div_total_val">
                  {((totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
                </div>
              </div>
              <div style={{ backgroundColor: "#e4e4e4" }} className="po_product footer_div">
                <div className="footer_div_total">Total</div>
                <div className="footer_div_total_val">
                  {(totalAll - (totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
                </div>
              </div>
            </div> */}
            <div className="next_back_buttons">
              <button className="ags-btn-main " onClick={() => navigate("/user/makepo")}>
                Back{" "}
              </button>
              <button className="ags-btn-main-fill" onClick={handleNext}>
                {" "}
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="poinfo_page_container">
        <div className="info_item">
          <label className="info_item_label">Exporter</label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.exporter}
            onChange={(e) => {
              handleItemChange(e, "exporter");
            }}
          >
            <option value={""} selected disabled>
              {"Choose exporter..."}
            </option>
            {poInfoChoices?.supplier?.map((poExporter) => (
              <option value={poExporter}>{poExporter.split(".")[0]}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.exporter}
            onChange={(e) => {
              handleItemChange(e, "exporter");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Buyer : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.buyerAddress}
            onChange={(e) => {
              handleItemChange(e, "buyerAddress");
            }}
          >
            <option value={""} selected disabled>
              {"Choose buyer..."}
            </option>
            {poInfoChoices?.buyer?.map((item) => (
              <option value={item}>{item.split(".")[0]}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.buyerAddress}
            onChange={(e) => {
              handleItemChange(e, "buyerAddress");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Consignee : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.consignee}
            onChange={(e) => {
              handleItemChange(e, "consignee");
            }}
          >
            <option value={""} selected disabled>
              {"Choose Consignee..."}
            </option>
            {poInfoChoices?.consignee?.map((item) => (
              <option value={item}>{item.split(".")[0]}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.consignee}
            onChange={(e) => {
              handleItemChange(e, "consignee");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Notify Party : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.notifyParty}
            onChange={(e) => {
              handleItemChange(e, "notifyParty");
            }}
            autocomplete="on"
          >
            <option value={""} selected disabled>
              {"Choose Notify Party..."}
            </option>
            {poInfoChoices?.notifyParty?.map((item) => (
              <option value={item}>{item.split(".")[0]}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.notifyParty}
            onChange={(e) => {
              handleItemChange(e, "notifyParty");
            }}
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Port of Origin : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.portOfOrigin}
            onChange={(e) => {
              handleItemChange(e, "portOfOrigin");
            }}
            autocomplete="on"
          >
            <option value={""} selected disabled>
              {"Choose Port Of Origion..."}
            </option>
            {poInfoChoices?.portOfOrigin?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.portOfOrigion}
            onChange={(e) => {
              handleItemChange(e, "portOfOrigin");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Port of Discharge : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.portOfDischarge}
            onChange={(e) => {
              handleItemChange(e, "portOfDischarge");
            }}
          >
            <option value={""} selected disabled>
              {"Choose Port Of Discharge..."}
            </option>
            {poInfoChoices?.finalDestination?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.portOfDischarge}
            onChange={(e) => {
              handleItemChange(e, "portOfDischarge");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Incoterms : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.incoterms}
            onChange={(e) => {
              handleItemChange(e, "incoterms");
            }}
          >
            <option value={""} selected disabled>
              {"Choose Incoterms..."}
            </option>
            {poInfoChoices?.incoterm?.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.incoterms}
            onChange={(e) => {
              handleItemChange(e, "incoterms");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Currency : </label>
          <select
            class="form-select  info_item_select"
            aria-label=".form-select-lg example"
            value={poInfo.currency}
            onChange={(e) => {
              handleItemChange(e, "currency");
            }}
          >
            <option value={""} selected disabled>
              {"Choose Currency..."}
            </option>
            {poInfoChoices?.currency.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <input
            className="info_item_input"
            type="text"
            placeholder=""
            value={poInfo.currency}
            onChange={(e) => {
              handleItemChange(e, "currency");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="info_item">
          <label className="info_item_label">Discount : (%) </label>
          <input
            className="info_item_input"
            style={{ width: "180%" }}
            type="text"
            placeholder=""
            value={poInfo.discount}
            onChange={(e) => {
              handleItemChange(e, "discount");
            }}
            autocomplete="on"
          ></input>
        </div>{" "}
        <div className="po_products">
          <div className="po_product head_title">
            <div className="po_product_num">#</div>
            <div className="po_product_code">Products</div>
            <div className="po_product_capacity">Capacity</div>
            <div style={{ textAlign: "center", padding: "10px" }} className="po_product_qty">
              Qty
            </div>
            <div style={{ textAlign: "center", padding: "10px" }} className="po_product_price">
              Price
            </div>
            <div style={{ textAlign: "center", padding: "10px" }} className="po_product_price">
              Total
            </div>
          </div>
          {poInfo.products.map((poProduct, index) => (
            <div className="po_product">
              <div className="po_product_num">{index + 1}</div>
              <div className="po_product_code">
                {poProduct.code}&nbsp;({poProduct.brand})
              </div>
              <div className="po_product_capacity">{poProduct.capacity}</div>
              <div className="po_product_qty">
                <input onChange={(e) => handleProductQtyChange(e, poProduct._id)} type="text" className="po_product_qty po_product_qty_input" autocomplete="on"></input>
              </div>
              <div className="po_product_price">
                <input onChange={(e) => handleProductPriceChange(e, poProduct._id)} type="text" className="po_product_price" autocomplete="on"></input>
              </div>
              {console.log(poProduct.price)}
              <div className="po_product_total_amount">
                {(poProduct.price * poProduct.qty)?.toFixed(3)} &nbsp;{poInfo.currency}{" "}
              </div>
            </div>
          ))}
          <div style={{ backgroundColor: "#d9d9d9" }} className="po_product footer_div">
            <div className="footer_div_total">Sub Total</div>
            <div className="footer_div_total_val">
              {totalAll.toFixed(2)}&nbsp;{poInfo.currency}
            </div>
          </div>
          <div style={{ backgroundColor: "#ebebeb" }} className="po_product footer_div">
            <div className="footer_div_total">Discount ( {poInfo.discount} % )</div>
            <div className="footer_div_total_val">
              {((totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
            </div>
          </div>
          <div style={{ backgroundColor: "#e4e4e4" }} className="po_product footer_div">
            <div className="footer_div_total">Total</div>
            <div className="footer_div_total_val">
              {(totalAll - (totalAll * parseInt(poInfo.discount)) / 100).toFixed(2)}&nbsp;{poInfo.currency}
            </div>
          </div>
        </div>
        <div className="next_back_buttons">
          <div style={{ backgroundColor: "#e6899c" }} className="next_back_button">
            Back
          </div>
          <div onClick={handleNext} style={{ backgroundColor: "#339316" }} className="next_back_button">
            {" "}
            Next
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PoInfo;
