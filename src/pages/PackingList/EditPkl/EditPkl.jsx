import React from "react";
import { useLocation } from "react-router-dom";
import "../PackingList.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { ChangeTruckListType } from "../../../Enum/GlobalEnum";
import { exporters } from "../../MakePi/data";
import "./EditPkl.scss";
const EditPkl = () => {
  const { state } = useLocation();
  console.log("pkl", state);
  const navigate = useNavigate();
  const { username } = useAuth();
  console.log(username);
  const [pklInfo, setPklInfo] = useState(null);
  const [piNumber, setPiNumber] = useState();
  const [customer, setCustomer] = useState("");
  const [buyer, setBuyer] = useState("");
  const [showFake, setShowFake] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(state.invoiceNo);
  const [date, setDate] = useState(new Date());
  const [decreaseRate, setDecreaseRate] = useState(1);

  //   const initialTruckItemsState = Array.from({ length: pklInfo?.totalTrucks }, () => ({
  //     truckNo: "",
  //     truckDriverName: "",
  //     truckDriverTel: "",
  //     truckNetWeight: 0,
  //     truckGrossWeight: 0,
  //     /* -------------------------------------------------------------------------- */
  //     truckGrossWeightFake: 0,
  //     truckNetWeightFake: 0,
  //     /* -------------------------------------------------------------------------- */
  //     truckTotalPackages: 0,
  //     truckTotalAmount: 0,
  //     truckTotalPallets: 0,
  //     truckProductItems: [],
  //     truckBls: "",
  //   }));

  const [truckItems, setTruckItems] = useState(state.truckItems);
  const handleTruckInputChange = (event, truckIndex, field) => {
    const updatedTruckItems = [...truckItems];
    updatedTruckItems[truckIndex] = {
      ...updatedTruckItems[truckIndex],
      [field]: event.target.value,
    };
    setTruckItems(updatedTruckItems);
  };

  const handleSearchPi = async () => {
    // Send the POST request
    await axios
      .get(`${BASE_URL}/packinglist/infomanual/${piNumber}`)
      .then(async (response) => {
        // Handle the response data
        setPklInfo(response.data);
        console.log(response.data);
        /* -------------------------------------------------------------------------- */
        let truckLoad = 26000;
        let possibleTruckOverWeight = 1000;
        let truckLoadwithOverWeigh = truckLoad + possibleTruckOverWeight;
        let pklTotalGrossWeight = response.data.pklTotalGrossWeight;
        let numberOfTrucks = Math.ceil(pklTotalGrossWeight / truckLoadwithOverWeigh);
        let overWeight = pklTotalGrossWeight - numberOfTrucks * truckLoad;
        let decreaseRate1 = (numberOfTrucks * truckLoad) / pklTotalGrossWeight;
        setDecreaseRate(decreaseRate1);
        console.log(decreaseRate, "|", numberOfTrucks, "|", pklTotalGrossWeight);
        console.log(pklInfo);
        let totalW = 0;
        response.data.pklProducts.map((product) => {
          totalW += product.grossWeight * product.qty * 0.980984;
        });
        /* -------------------------------------------------------------------------- */
        let initialTruckProductItems = [];
        response.data.pklProducts.map((product) => {
          initialTruckProductItems.push({
            productId: product.productId,
            productCode: product.productCode,
            productCategory: product.productCategory,
            productBrand: product.productBrand,
            productCountry: product.productCountry,
            productCapacity: product.productCapacity,
            productDescription: product.description,
            productGrossWeight: product.grossWeight,
            /* -------------------------------------------------------------------------- */
            productGrossWeightFake: product.grossWeight * decreaseRate,
            productTotalGrossWeightFake: 0,
            productNetWeightFake: product.netWeight * decreaseRate,
            productTotalNetWeightFake: 0,
            /* -------------------------------------------------------------------------- */
            productNetWeight: product.netWeight,
            productPrice: product.price,
            productQty: 0,
            productPalletQty: 0,
            productTotalNetWeight: 0,
            productTotalGrossWeight: 0,
            productTotalAmount: 0,
            productBl: [],
            productWarehouses: [],
          });
        });

        setTruckItems(
          Array.from({ length: response.data.totalTrucks }, () => ({
            truckNo: "",
            truckDriverName: "",
            truckDriverTel: "",
            truckNetWeight: 0,
            truckGrossWeight: 0,
            /* -------------------------------------------------------------------------- */
            truckGrossWeightFake: 0,
            truckNetWeightFake: 0,
            /* -------------------------------------------------------------------------- */
            truckTotalPackages: 0,
            truckTotalAmount: 0,
            truckTotalPallets: 0,
            truckBls: "",

            truckProductItems: initialTruckProductItems,
          }))
        );

        // You can access the response status, headers, etc. using response.status, response.headers, etc.
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  };

  const handleNextClick = async () => {
    let model = { ...state };
    model.truckItems = truckItems;
    console.log("model", model);
    axios
      .put(`${BASE_URL}/packinglist/${state._id}`, model)
      .then((response) => {
        showToastMessage("Packing List Updated Successfully", "success");
        setTimeout(() => {
          navigate("/user/allpkl");
        }, 1500);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    // /* --------------------------------remove empty rows------------------------------------------ */

    // let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    // updatedTruckItems = updatedTruckItems.map((truckItem) => {
    //   truckItem.truckProductItems = truckItem.truckProductItems.filter((item) => item.productQty !== 0);
    //   return truckItem;
    // });
    // console.log(updatedTruckItems);
    // setTruckItems(updatedTruckItems);
    // /* -------------------------------------------------------------------------- */
    // const pkl = {
    //   employee: username,
    //   date: new Date(Date.now()),
    //   exporter: pklInfo.exporter,
    //   piNo: pklInfo.piNo,
    //   piId: pklInfo.piId,
    //   piCurrency: pklInfo.piCurrency,
    //   invoiceNo: invoiceNo,
    //   customer: customer,
    //   buyerAddress: buyer,
    //   truckItems: updatedTruckItems,
    // };
    // console.log(pkl);
    // await axios
    //   .post(`${BASE_URL}/packinglist`, pkl)
    //   .then((response) => {
    //     console.log(response.data);
    //     showToastMessage("PKL Added Succesfully", "success");

    //     setTimeout(() => {
    //       navigate("/user/orders");
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     showToastMessage("Please fill all required fields");
    //     console.log(error.response.data);
    //   });
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearchPi();
      return;
    }
  };

  useEffect(() => {
    const updateTruckItems = () => {
      let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
      console.log(updatedTruckItems);
      updatedTruckItems.map((truckItem) => {
        truckItem.truckGrossWeightFake = truckItem.truckGrossWeight * decreaseRate;
        truckItem.truckNetWeightFake = truckItem.truckNetWeight * decreaseRate;

        truckItem.truckProductItems.map((item) => {
          item.productGrossWeightFake = item.productGrossWeight * decreaseRate;
          item.productTotalGrossWeightFake = item.productTotalGrossWeight * decreaseRate;
          item.productNetWeightFake = item.productNetWeight * decreaseRate;
          item.productTotalNetWeightFake = item.productTotalNetWeight * decreaseRate;
        });
      });
      console.log(updatedTruckItems);
      setTruckItems(updatedTruckItems);
    };
    updateTruckItems();
  }, [decreaseRate]);

  const getTruckProductWarehouseItemQty = (productId, truckIndex, warehouse) => {
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      const warehouseIndex = truckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex((obj) => obj.warehouse === warehouse);
      if (warehouseIndex !== -1) {
        return truckItems[truckIndex]?.truckProductItems[productIndex]?.productWarehouses[warehouseIndex]?.qty;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  };

  const getTotalProductQtyInWarehouse = (productId, warehouse) => {
    let totalQty = 0;

    for (const truck of truckItems) {
      const productIndex = truck.truckProductItems.findIndex((obj) => obj.productId === productId);

      if (productIndex !== -1) {
        const warehouseIndex = truck.truckProductItems[productIndex].productWarehouses.findIndex((obj) => obj.warehouse === warehouse);

        if (warehouseIndex !== -1) {
          totalQty += parseInt(truck.truckProductItems[productIndex].productWarehouses[warehouseIndex].qty);
        }
      }
    }
    return totalQty;
  };

  const setTruckProductWarehouseItemQty = (productId, truckIndex, warehouse, qtyVal) => {
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
      //updatedTruckItems[truckIndex].truckProductItems[productIndex].productQty = qtyVal;
      const warehouseIndex = updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex((obj) => obj.warehouse === warehouse);
      if (warehouseIndex === -1) {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.push({ warehouse: warehouse, qty: qtyVal });
      } else {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses[warehouseIndex].qty = parseInt(qtyVal);
      }

      updatedTruckItems[truckIndex].truckProductItems.map((truckProductItem) => {
        let productQty = 0;
        let productTotalAmount = 0;
        let productPalletQty = 0;
        let productTotalGrossWeight = 0;
        let productTotalNetWeight = 0;

        truckProductItem.productWarehouses.map((productWarehouse) => {
          productQty += parseInt(productWarehouse.qty);
        });
        truckProductItem.productQty = productQty;
        truckProductItem.productTotalAmount = productQty * truckProductItem.productPrice;
        truckProductItem.productTotalNetWeight = productQty * truckProductItem.productNetWeight;
        truckProductItem.productTotalGrossWeight = productQty * truckProductItem.productGrossWeight;
        /* -------------------------------------------------------------------------- */
        truckProductItem.productTotalGrossWeightFake = productQty * truckProductItem.productGrossWeightFake;
        truckProductItem.productTotalNetWeightFake = productQty * truckProductItem.productNetWeightFake;

        /* -------------------------------------------------------------------------- */
        truckProductItem.productPalletQty = 0;
      });

      updatedTruckItems.map((truck) => {
        let truckGrossWeight = 0;
        /* -------------------------------------------------------------------------- */
        let truckGrossWeightFake = 0;
        let truckNetWeightFake = 0;

        /* -------------------------------------------------------------------------- */
        let truckNetWeight = 0;
        let truckTotalPackages = 0;
        let truckTotalAmount = 0;
        let truckTotalPallets = 0;

        truck.truckProductItems.map((truckProductItem) => {
          truckGrossWeight += truckProductItem.productTotalGrossWeight;
          /* -------------------------------------------------------------------------- */
          truckGrossWeightFake += truckProductItem.productTotalGrossWeightFake;
          truckNetWeightFake += truckProductItem.productTotalNetWeightFake;

          /* -------------------------------------------------------------------------- */
          truckNetWeight += truckProductItem.productTotalNetWeight;
          truckTotalPackages += truckProductItem.productQty;
          truckTotalAmount += truckProductItem.productTotalAmount;
          truckTotalPallets += truckProductItem.productPalletQty;
        });
        /* -------------------------------------------------------------------------- */
        truck.truckGrossWeightFake = truckGrossWeightFake;
        truck.truckNetWeightFake = truckNetWeightFake;

        /* -------------------------------------------------------------------------- */

        truck.truckGrossWeight = truckGrossWeight;
        truck.truckNetWeight = truckNetWeight;
        truck.truckTotalPackages = truckTotalPackages;
        truck.truckTotalAmount = truckTotalAmount;
        truck.truckTotalPallets = truckTotalPallets;
      });

      setTruckItems(updatedTruckItems);
    } else {
      return null;
    }
  };

  const handleTruckItemBlsChange = (truckIndex, val) => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    updatedTruckItems[truckIndex].va = val;
  };

  const handleAddTruck = () => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    let initialTruckProductItems = [];
    pklInfo.pklProducts.map((product) => {
      initialTruckProductItems.push({
        productId: product.productId,
        productCode: product.productCode,
        productCategory: product.productCategory,
        productBrand: product.productBrand,
        productCountry: product.productCountry,
        productCapacity: product.productCapacity,
        productDescription: product.description,
        productGrossWeight: product.grossWeight,
        /* -------------------------------------------------------------------------- */
        productGrossWeightFake: product.grossWeightFake,
        productTotalGrossWeightFake: 0,
        productNetWeightFake: product.netWeightFake,
        productTotalNetWeightFake: 0,
        /* -------------------------------------------------------------------------- */
        productNetWeight: product.netWeight,
        productPrice: product.price,
        productQty: 0,
        productPalletQty: 0,
        productTotalNetWeight: 0,
        productTotalGrossWeight: 0,
        productTotalAmount: 0,
        productBl: [],
        productWarehouses: [],
      });
    });
    updatedTruckItems.push({
      truckNo: "",
      truckDriverName: "",
      truckDriverTel: "",
      truckNetWeight: 0,
      truckGrossWeight: 0,
      /* -------------------------------------------------------------------------- */
      truckGrossWeightFake: 0,
      truckNetWeightFake: 0,

      /* -------------------------------------------------------------------------- */
      truckTotalPackages: 0,
      truckTotalAmount: 0,
      truckTotalPallets: 0,
      truckProductItems: initialTruckProductItems,
    });
    setTruckItems(updatedTruckItems);
  };

  const handleRemoveTruck = () => {
    let updatedTruckItems = JSON.parse(JSON.stringify(truckItems));
    updatedTruckItems.pop();
    setTruckItems(updatedTruckItems);
  };
  const changeValue = (e, index, productIndex, type) => {
    if (type === ChangeTruckListType.QTY) {
      truckItems[index].truckProductItems[productIndex].productQty = Number(e.target.value);
      truckItems[index].truckProductItems[productIndex].productTotalAmount = Number(e.target.value) * truckItems[index].truckProductItems[productIndex].productPrice;
      truckItems[index].truckProductItems[productIndex].productTotalNetWeight = Number(e.target.value) * truckItems[index].truckProductItems[productIndex].productNetWeight;
      truckItems[index].truckProductItems[productIndex].productTotalGrossWeight = Number(e.target.value) * truckItems[index].truckProductItems[productIndex].productGrossWeight;
      getTotal(index, ChangeTruckListType.Sum_Amount);
      let updateTrucks = [...truckItems];
      setTruckItems(updateTrucks);
    }
  };
  //   const changeTotalWeight = (e, index, productIndex,ChangeTruckListType) => {
  //     truckItems[index].truckProductItems[productIndex].productTotalNetWeight = Number(e.target.value);
  //     let updateTrucks = [...truckItems];
  //     setTruckItems(updateTrucks);
  //   };
  //   const changeTotalGrossWeight = (e, index, productIndex) => {
  //     truckItems[index].truckProductItems[productIndex].productTotalGrossWeight = Number(e.target.value);
  //     let updateTrucks = [...truckItems];
  //     setTruckItems(updateTrucks);
  //   };
  const getTotal = (index, type) => {
    let sum = 0;
    if (type === ChangeTruckListType.Sum_Net_Weight) {
      truckItems[index].truckProductItems.map((e) => (sum += e.productTotalNetWeight));
      truckItems[index].truckNetWeight = sum;
    } else if (type === ChangeTruckListType.Sum_Gross_Weight) {
      truckItems[index].truckProductItems.map((e) => (sum += e.productTotalGrossWeight));
      truckItems[index].truckGrossWeight = sum;
    } else if (type === ChangeTruckListType.Sum_Packaging) {
      truckItems[index].truckProductItems.map((e) => (sum += e.productQty));
      truckItems[index].truckTotalPackages = sum;
    } else if (type === ChangeTruckListType.Sum_Amount) {
      truckItems[index].truckProductItems.map((e) => (sum += e.productTotalAmount));
      truckItems[index].truckTotalAmount = sum;
    }

    return sum;
  };
  const changeInvoiceNo = (e) => {
    setInvoiceNo(e.target.value);
    state.invoiceNo = e.target.value;
    console.log("state", state);
  };
  return (
    <>
      {console.log(truckItems)}
      <div className="card-custom edit-pkl">
        <div className="card-custom-tittle justify-content-center">
          <h6>Edit Packing List {state.pklNo}</h6>
        </div>
        <div className="card-custom-body">
          {/* <div className="pkl_container"> */}
          {/* <div className="search_section">
            <div className="from-group">
              <input
                id="piNumber"
                type="text"
                value={piNumber}
                placeholder="Enter PI Number"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setPiNumber(e.target.value);
                }}
                autocomplete="on"
              ></input>
            </div>
            <button type="button" className="ags-btn-main" onClick={handleSearchPi}>
              {" "}
              Search{" "}
            </button>
          </div> */}
          {/* {pklInfo && ( */}
          <>
            {/* inforamtion PI */}
            {/* <div className="table-infroamtion">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>PI Number: </strong> {pklInfo.piNo}{" "}
                      </td>
                      <td>
                        <strong>PI Custmer: </strong> {pklInfo.piCustomer}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <strong>PI Date: </strong> {new Date(pklInfo?.piDate)?.toLocaleDateString()}
                      </td>
                      <td>
                        <strong>Issued by: </strong> {pklInfo.piEmployee}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total Amount: </strong> {pklInfo.pklTotalAmount}
                      </td>
                      <td>
                        {" "}
                        <strong>Total GW: </strong>
                        {pklInfo.pklTotalGrossWeight}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total NW: </strong> {pklInfo.pklTotalNetWeight}
                      </td>
                      <td>
                        <strong>Total Packages: </strong> {pklInfo.pklTotalPackages}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Truck Payload: </strong> {pklInfo.truckPayload}
                      </td>
                      <td>
                        <strong>Total Trucks: </strong> {pklInfo.totalTrucks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}

            {/* start  Inputs Inofrmation  */}
            <div className="row inputs-pkl">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="customer">Buyer Address</label>
                  <textarea type="text" rows="4" id="buyer_address" className="form-control" onChange={(e) => (state.buyerAddress = e.target.value)}>
                    {state.buyerAddress}
                  </textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="customer">Customer</label>
                  <textarea type="text" rows="4" id="customer" className="form-control" onChange={(e) => (state.customer = e.target.value)}>
                    {state.customer}
                  </textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="exporter">Exporter</label>
                  <select class="form-select" id="exporter" value={state.exporter} onChange={(e) => (state.exporter = e.target.value)}>
                    <option disabled selected value="">
                      Choose Exporter{" "}
                    </option>
                    {exporters.map((exporter) => (
                      <option key={exporter.name} value={exporter.value}>
                        {exporter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="invoiceNo">Invoice No</label>
                  <input type="text" className="form-control" value={invoiceNo} onChange={(e) => changeInvoiceNo(e)} id="invoiceNo" name="invoiceNo" />
                </div>
              </div>
              {/* <div className="col-12">
                <div className="form-group">
                  <button className="ags-btn-main-fill btn-fake" onClick={() => setShowFake((prev) => !prev)}>
                    <span>{!showFake ? "Show" : "Hide"}</span> Fake
                  </button>
                </div>
              </div>
              {showFake && (
                <div className="col-12">
                  <div className="form-group mb-2">
                    <label htmlFor="customer">Decrease Rate </label>
                    <input
                      type="number"
                      className="form-control"
                      value={decreaseRate}
                      onChange={(e) => {
                        setDecreaseRate(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              )} */}
              {/* <div className="col-12 wharehouse">
                <div className="wh-info">
                  {pklInfo.allBooked.map((product) => (
                    <div className="wh-item">
                      <details>
                        <summary>{product.product}</summary>
                        <ul>
                          {product.bookedWarehouses.map((warehouse) => (
                            <li>
                              <details>
                                <summary>{warehouse.warehouse}</summary>
                                <ul>
                                  {warehouse.bl.map((item) => (
                                    <li>
                                      <div className="grid-bl">
                                        <span>BL :{item.bl} </span>
                                        <span>QTY : {item.qty}</span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
            {/* End Inputs Information */}

            {/* New design trucks  */}
            <div className="trucks-list">
              <div className="trucks-tittle">
                <h6>
                  <i class="uil uil-truck"></i>
                  {/* <i className="bx  bx bxs-truck nav_logo-icon"></i> */}
                  Trucks
                </h6>
                <span>
                  {" "}
                  {truckItems.length > 1 && <i onClick={handleRemoveTruck} class="uil uil-minus-circle add_truck_but"></i>}
                  <i onClick={handleAddTruck} class="uil uil-plus-circle"></i>
                </span>
              </div>
              <div className="trucks-body">
                <div className="truck-item">
                  <div className="truck-item-body">
                    <div className="row">
                      {Array.from({ length: truckItems.length }, (truck, index) => (
                        <div className="col-lg-4 col-sm-12">
                          <div className="item" key={index}>
                            <div className="item-tittle">
                              <span>
                                {" "}
                                <i class="uil uil-truck"></i> Truck {index + 1}
                              </span>
                            </div>
                            <div className="item-body">
                              <div className="form-group">
                                <label htmlFor="truck_no">Truck No</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={truckItems[index].truckNo}
                                  onChange={(event) => handleTruckInputChange(event, index, "truckNo")}
                                  autocomplete="on"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="truck_no">Truck Driver</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={truckItems[index].truckDriverName}
                                  onChange={(event) => handleTruckInputChange(event, index, "truckDriverName")}
                                  autocomplete="on"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="truck_no">Driver Mobile</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={truckItems[index].truckDriverTel}
                                  onChange={(event) => handleTruckInputChange(event, index, "truckDriverTel")}
                                  autocomplete="on"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*   ...........................................................................................................................................*/}

            {/* first tabel for desktop  */}
            <div className="desktop-table">
              <table className="pi__table table table-bordered pkl-table">
                <thead>
                  <tr className="th_style">
                    {/* <th scope="col">
                    <div >#</div>
                  </th> */}
                    <th scope="col">
                      <div>Description</div>
                    </th>
                    <th scope="col">
                      <div>Pallet</div>
                    </th>
                    {/* <th scope="col">
                    <div >Unit NW</div>
                  </th>
                  <th scope="col">
                    <div >NW(KGs)</div>
                  </th> */}
                    <th scope="col">
                      <div>Unit GW</div>
                    </th>
                    <th scope="col">
                      <div>GW(KGs)</div>
                    </th>
                    <th scope="col">
                      <div>Unite price</div>
                    </th>
                    {/* <th scope="col">
                    <div >Total</div>
                  </th> */}
                    {truckItems.map((truck, index) => (
                      <th key={index}>Truck No {truck.truckNo}</th>
                    ))}
                    <th scope="col">
                      <div>QTY(PCs)</div>
                    </th>
                    <th scope="col">
                      <div>Remaining</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pklInfo?.pklProducts?.map((product, productIndex) => (
                    <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                      <td>
                        <div>{product.description}</div>
                      </td>
                      <td>
                        <div>{product.pallet}</div>
                      </td>
                      <td>
                        <div>{product.grossWeight?.toFixed(2)}</div>
                      </td>
                      <td>
                        <div>{product.totalGrossWeight?.toFixed(2)}</div>
                      </td>
                      <td>
                        <div>{product.price?.toFixed(2)}</div>
                      </td>
                      {truckItems.map((truckItem, truckIndex) => (
                        <td key={truckIndex}>
                          <div className="">
                            <input
                              id={truckIndex}
                              type="text"
                              value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                              onChange={(e) => {
                                const qtyVal = e.target.value;
                                setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                              }}
                              autocomplete="on"
                            />
                            {/* <div className="warehouse_bl_item" style={{ flex: 1 }}>
                            <div className="warehouse_bl_item_qty">
                              {" "}
                              <input
                                id={truckIndex}
                                type="text"
                                value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                                onChange={(e) => {
                                  const qtyVal = e.target.value;
                                  setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                                }}
                              />
                            </div>
                          </div> */}
                          </div>
                        </td>
                      ))}
                      <td>
                        <div c>{product.qty}</div>
                      </td>
                      <td>
                        <div c>{product.qty - getTotalProductQtyInWarehouse(product.productId, "all")}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* first table for mobile  */}
            <div>
              <div className="truck-table-mobile">
                {pklInfo?.pklProducts?.map((product, productIndex) => (
                  <div className="wrapper-truck" key={productIndex}>
                    <div className="wrapper-tittle">
                      <h6>Product</h6>
                      <span>{productIndex + 1}</span>
                    </div>
                    <div className="wrapper">
                      <div className="box">
                        <h6>Description</h6>
                        <span>{product.description}</span>
                      </div>
                      <div className="box">
                        <h6>Pallet</h6>
                        <span>{product.pallet}</span>
                      </div>
                      <div className="box">
                        <h6>Unit GW</h6>
                        <span>{product.grossWeight?.toFixed(2)}</span>
                      </div>
                      <div className="box">
                        <h6>GW(KGs)</h6>
                        <span>{product.totalGrossWeight?.toFixed(2)}</span>
                      </div>
                      <div className="box">
                        <h6>Unite price</h6>
                        <span>{product.price?.toFixed(2)}</span>
                      </div>
                      {truckItems.map((truckItem, truckIndex) => (
                        <div className="box" key={truckIndex}>
                          <h6>Truck No {truckItem.truckNo}</h6>
                          <input
                            id={truckIndex}
                            type="text"
                            value={getTruckProductWarehouseItemQty(product.productId, truckIndex, "all")}
                            onChange={(e) => {
                              const qtyVal = e.target.value;
                              setTruckProductWarehouseItemQty(product.productId, truckIndex, "all", qtyVal);
                            }}
                            autocomplete="on"
                          />
                        </div>
                      ))}
                      <div className="box">
                        <h6>QTY(PCs)</h6>
                        <span>{product.qty}</span>
                      </div>
                      <div className="box">
                        <h6>Remaining</h6>
                        <span>{product.qty - getTotalProductQtyInWarehouse(product.productId, "all")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Truck lists from desktop  */}
            <div className="desktop-table">
              {truckItems.map((truckItem, index) => (
                <>
                  {truckItem.truckNo !== "" && (
                    <div className="truck-item-desktop " key={index}>
                      <div className="tuck-item-tittle-desktop">
                        <div>
                          <label>
                            {" "}
                            <i class="uil uil-truck"></i> Truck No:
                          </label>
                          <span>{truckItem.truckNo}</span>
                        </div>
                        <div>
                          <label>Truck Driver:</label>
                          <span>{truckItem.truckDriverName}</span>
                        </div>
                      </div>
                      <div className="tuck-item-body-desktop">
                        <table className="pi__table table table-bordered">
                          <thead>
                            <tr className="th_style">
                              <th scope="col">
                                <div>#</div>
                              </th>
                              <th scope="col">
                                <div>Description</div>
                              </th>
                              <th scope="col">
                                <div>QTY(PCs)</div>
                              </th>
                              <th scope="col">
                                <div>Pallet</div>
                              </th>
                              <th scope="col">
                                <div>NW(KGs)</div>
                              </th>
                              <th scope="col">
                                <div>GW(KGs)</div>
                              </th>
                              {showFake && (
                                <th scope="col">
                                  <div>GW(KGs)(F)</div>
                                </th>
                              )}
                              <th scope="col">
                                <div>Total</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {truckItem.truckProductItems.map((product, productIndex) => (
                              <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                                <td>
                                  <div style={{ fontWeight: "bold" }} c>
                                    {productIndex + 1}
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    {product.productCategory} {product.productCapacity}
                                    {product.productCode}
                                    {product.productBrand}
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    {/* {product.productQty} */}
                                    <input
                                      type="text"
                                      value={product.productQty}
                                      className="form-control"
                                      onInput={(e) => changeValue(e, index, productIndex, ChangeTruckListType.QTY)}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div>{product.productPalletQty}</div>
                                </td>

                                <td>
                                  <div>{product.productTotalNetWeight?.toFixed(2)}</div>
                                  {/* <input
                                    type="text"
                                    value={product.productTotalNetWeight?.toFixed(2)}
                                    className="form-control"
                                    onInput={(e) => changeValue(e, index, productIndex, ChangeTruckListType.Net_Weight)}
                                  /> */}
                                </td>

                                <td>
                                  <div>{product.productTotalGrossWeight?.toFixed(2)}</div>
                                  {/* <input
                                    type="text"
                                    value={product.productTotalGrossWeight}
                                    className="form-control"
                                    onInput={(e) => changeTotalGrossWeight(e, index, productIndex)}
                                  /> */}
                                </td>
                                {showFake && (
                                  <td>
                                    <div>{product.productTotalGrossWeightFake?.toFixed(2)}</div>
                                  </td>
                                )}

                                <td>
                                  <div c>{(product.productPrice * product.productQty)?.toFixed(2)}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="row-bl">
                          <div>
                            <label>BL</label>
                          </div>
                          <div>
                            <input type="text" value={truckItems[index].truckBls} onChange={(event) => handleTruckInputChange(event, index, "truckBls")} autocomplete="on" />
                          </div>
                        </div>
                      </div>
                      <div className="tuck-item-footer-desktop">
                        <div>
                          <label>Net Weight:</label>
                          <span>{getTotal(index, ChangeTruckListType.Sum_Net_Weight)}</span>
                        </div>
                        <div>
                          <label>Gross Weight:</label>
                          <span>
                            {/* {truckItem.truckGrossWeight.toFixed(2)} */}
                            {getTotal(index, ChangeTruckListType.Sum_Gross_Weight)}
                          </span>
                        </div>
                        {showFake && (
                          <div>
                            <label>Gross Weight Fake:</label>
                            <span>{truckItem.truckGrossWeightFake.toFixed(2)}</span>
                          </div>
                        )}
                        <div>
                          <label> Packages:</label>
                          <span>{getTotal(index, ChangeTruckListType.Sum_Packaging)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
              {/* {truckItems.map((truckItem, index) => (
              <div className="truck" key={index}>
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">Truck No : </div>
                      <div className="val_div">{truckItem.truckNo}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Truck Driver : </div>
                      <div className="val_div">{truckItem.truckDriverName}</div>
                    </div>
                  </div>
                </div>
                <table className="pi__table table table-bordered">
                  <thead>
                    <tr className="th_style">
                      <th scope="col">
                        <div >#</div>
                      </th>
                      <th scope="col">
                        <div >Description</div>
                      </th>
                      <th scope="col">
                        <div >QTY(PCs)</div>
                      </th>
                      <th scope="col">
                        <div >Pallet</div>
                      </th>
                      <th scope="col">
                        <div >NW(KGs)</div>
                      </th>
                      <th scope="col">
                        <div >GW(KGs)</div>
                      </th>
                      <th scope="col">
                        <div >Total</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {truckItem.truckProductItems.map((product, productIndex) => (
                      <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                        <td>
                          <div style={{ fontWeight: "bold" }} c>
                            {productIndex + 1}
                          </div>
                        </td>
                        <td>
                          <div >{product.productDescription}</div>
                        </td>
                        <td>
                          <div c>{product.productQty}</div>
                        </td> 
                        <td>
                          <div >{product.productPalletQty}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalNetWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalGrossWeight?.toFixed(2)}</div>
                        </td>

                        <td>
                          <div c>{product.productTotalAmount?.toFixed(2)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <div className="pkl_info">
                    <div className="info_row">
                      <div className="label_div">NetWeight : </div>
                      <div className="val_div">{truckItem.truckNetWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">GrossWeight: </div>
                      <div className="val_div">{truckItem.truckGrossWeight}</div>
                    </div>
                    <div className="info_row">
                      <div className="label_div">Packages : </div>
                      <div className="val_div">{truckItem.truckTotalPackages}</div>
                    </div>
                  </div>
                </div>
                <div className="info_row">
                  <div className="label_div">BL : </div>
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      value={truckItems[index].truckBls}
                      onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                    ></input>
                  </div>
                </div>
              </div>
            ))} */}
            </div>

            {/* trucks list for mobile  */}
            <div>
              {truckItems.map((truckItem, index) => (
                <>
                  {truckItem.truckNo !== "" && (
                    <div className="truck-item-table-mobile" key={index}>
                      <div className="wrapper-truck">
                        <div className="wrapper-tittle">
                          <h6> {truckItem.truckNo}</h6>
                          <span>{truckItem.truckDriverName}</span>
                        </div>
                        {truckItem.truckProductItems.map((product, productIndex) => (
                          <div className="wrapper" key={productIndex}>
                            <div className="box">
                              <h6>Description</h6>
                              <span>{product.productDescription}</span>
                            </div>
                            <div className="box">
                              <h6>QTY(PCs)</h6>
                              <span>{product.productQty}</span>
                            </div>
                            <div className="box">
                              <h6>Pallet</h6>
                              <span>{product.productPalletQty}</span>
                            </div>
                            <div className="box">
                              <h6>NW(KGs)</h6>
                              <span>{product.productTotalNetWeight?.toFixed(2)}</span>
                            </div>
                            <div className="box">
                              <h6>GW(KGs)</h6>
                              <span>{product.productTotalGrossWeight?.toFixed(2)}</span>
                            </div>
                            <div className="box">
                              <h6>GW(KGs)</h6>
                              <span>{product.productTotalGrossWeightFake?.toFixed(2)}</span>
                            </div>
                            <div className="box">
                              <h6>Total </h6>
                              <span>{product.productTotalAmount?.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                        <div className="wrapper-footer">
                          <div className="box">
                            <h6>NetWeight</h6>
                            <span>{truckItem.truckNetWeight}</span>
                          </div>
                          <div className="box">
                            <h6>GrossWeight</h6>
                            <span>{truckItem.truckGrossWeight}</span>
                          </div>{" "}
                          {showFake && (
                            <div className="box">
                              <h6>GrossWeight Fake</h6>
                              <span>{truckItem.truckGrossWeightFake}</span>
                            </div>
                          )}
                          <div className="box">
                            <h6>Packages</h6>
                            <span>{truckItem.truckTotalPackages}</span>
                          </div>
                          <div className="box">
                            <h6>BL</h6>
                            <input type="text" value={truckItems[index].truckBls} onChange={(event) => handleTruckInputChange(event, index, "truckBls")} autocomplete="on" />
                          </div>
                          {/* <div className="wrapper-tittle">
                 <div>
                 <div className="pkl_info">
                   <div className="info_row">
                     <div className="label_div">NetWeight : </div>
                     <div className="val_div">{truckItem.truckNetWeight}</div>
                   </div>
                   <div className="info_row">
                     <div className="label_div">GrossWeight: </div>
                     <div className="val_div">{truckItem.truckGrossWeight}</div>
                   </div>
                   <div className="info_row">
                     <div className="label_div">Packages : </div>
                     <div className="val_div">{truckItem.truckTotalPackages}</div>
                   </div>
                 </div>
               </div>
               <div className="info_row">
                 <div className="label_div">BL : </div>
                 <div style={{ width: "100%" }}>
                   <input
                     type="text"
                     value={truckItems[index].truckBls}
                     onChange={(event) => handleTruckInputChange(event, index, "truckBls")}
                   ></input>
                 </div>
               </div>
               </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>

            <div className="item"></div>
          </>

          <div className="update-btn">
            <button className="ags-btn-main-fill " onClick={handleNextClick}>
              Update
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default EditPkl;
