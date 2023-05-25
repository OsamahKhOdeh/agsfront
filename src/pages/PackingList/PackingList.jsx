import React, { useState } from "react";
import "./PackingList.css";
import axios from "axios";

const PackingList = () => {
  const [pklInfo, setPklInfo] = useState(null);
  const [piNumber, setPiNumber] = useState(0);
  const [customer, setCustomer] = useState("");
  const [buyer, setBuyer] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date());

  const initialTruckItemsState = Array.from({ length: pklInfo?.totalTrucks }, () => ({
    truckNo: "",
    truckDriverName: "",
    truckDriverTel: "",
    truckNetWeight: 0,
    truckGrossWeight: 0,
    truckTotalPackages: 0,
    truckProductItems: [],
  }));

  const [truckItems, setTruckItems] = useState(initialTruckItemsState);
  const handleTruckInputChange = (event, truckIndex, field) => {
    const updatedTruckItems = [...truckItems];
    updatedTruckItems[truckIndex] = {
      ...updatedTruckItems[truckIndex],
      [field]: event.target.value,
    };
    setTruckItems(updatedTruckItems);
  };

  const handleSearchPi = () => {
    // Send the POST request
    axios
      .get(`http://localhost:5000/packinglist/info/${piNumber}`)
      .then(async (response) => {
        // Handle the response data
        setPklInfo(response.data);
        let initialTruckProductItems = [];
        response.data.pklProducts.map((product) => {
          initialTruckProductItems.push({
            productId: product.productId,
            productCode: product.productCode,
            productCategory: product.productCategory,
            productCapacity: product.productCapacity,
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
            truckTotalPackages: 0,
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

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleSearchPi();
      return;
    }
  };

  const getTruckProductWarehouseItemQty = (productId, truckIndex, warehouse) => {
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      const warehouseIndex = truckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex(
        (obj) => obj.warehouse === warehouse
      );
      console.log(truckItems[truckIndex]?.truckProductItems[productIndex]?.productWarehouses);
      if (warehouseIndex !== -1) {
        return truckItems[truckIndex]?.truckProductItems[productIndex]?.productWarehouses[warehouseIndex]?.qty;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  };

  const setTruckProductWarehouseItemQty = (productId, truckIndex, warehouse, qtyVal) => {
    console.log({ productId, truckIndex, warehouse, qtyVal });
    const productIndex = truckItems[truckIndex].truckProductItems.findIndex((obj) => obj.productId === productId);
    if (productIndex !== -1) {
      let updatedTruckItems = [...truckItems];
      //updatedTruckItems[truckIndex].truckProductItems[productIndex].productQty = qtyVal;
      const warehouseIndex = updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.findIndex(
        (obj) => obj.warehouse === warehouse
      );
      console.log({ productIndex, truckIndex, warehouseIndex });
      if (warehouseIndex === -1) {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses.push({ warehouse: warehouse, qty: qtyVal });
      } else {
        updatedTruckItems[truckIndex].truckProductItems[productIndex].productWarehouses[warehouseIndex].qty = qtyVal;
      }
      setTruckItems(updatedTruckItems);
    } else {
      return null;
    }
  };

  return (
    <div className="pkl_container">
      <div className="search_div">
        <label htmlFor="piNumber">Enter PI Number :</label>
        <input
          style={{ width: "20%" }}
          id="piNumber"
          type="text"
          value={piNumber}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setPiNumber(e.target.value);
          }}
        ></input>
        <button className="search_pi" onClick={handleSearchPi}>
          Search
        </button>
      </div>
      {pklInfo && (
        <>
          <div className="pkl_info">
            <div className="info_row">
              <div className="label_div">PI Number : </div>
              <div className="val_div">{pklInfo.piNo}</div>
            </div>
            <div className="info_row">
              <div className="label_div">PI Custmer : </div>
              <div className="val_div">{pklInfo.piCustomer}</div>
            </div>
            <div className="info_row">
              <div className="label_div">PI Date : </div>
              <div className="val_div">{new Date(pklInfo?.piDate)?.toLocaleDateString()}</div>
            </div>
            <div className="info_row">
              <div className="label_div">Issued by : </div>
              <div className="val_div">{pklInfo.piEmployee}</div>
            </div>
          </div>
          <div>
            <div style={{ display: "flex" }}>
              {" "}
              <div className="info_row">
                <div className="label_div">Customer : </div>
                <div className="">
                  <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)}></input>
                </div>
              </div>
              <div className="info_row">
                <div className="label_div">Buyer Address : </div>
                <div className="">
                  <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)}></input>
                </div>
              </div>{" "}
              <div className="info_row">
                <div className="label_div">Invoice No : </div>
                <div className="">
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => {
                      setInvoiceNo(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="info_row">
              <div className="label_div">PKL Date : </div>
              <div className="">
                <input type="text" value={date.toLocaleDateString()} disabled onChange={() => {}}></input>
              </div>
            </div>
            <div>
              <div className="info_row">
                <div className="label_div">Warehouses : </div>
                <div className="val_div">{pklInfo.pklWarehouses?.join(" | ")}</div>
              </div>
              <div className="info_row">
                <div className="label_div">BL : </div>
                <div className="val_div">{pklInfo.pklBls?.join(" | ")}</div>
              </div>{" "}
              <div style={{ display: "flex" }}>
                <div className="info_row">
                  <div className="label_div">TOTAL AMOUNT : </div>
                  <div className="val_div">{pklInfo.pklTotalAmount}</div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">TOTAL GW : </div>
                  <div className="val_div">{pklInfo.pklTotalGrossWeight}</div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">TOTAL NW : </div>
                  <div className="val_div">{pklInfo.pklTotalNetWeight}</div>
                </div>
                <div className="info_row">
                  <div className="label_div">TOTAL Packages : </div>
                  <div className="val_div"> {pklInfo.pklTotalPackages}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="info_row">
            <div className="label_div">Truck Payload : </div>
            <div className="val_div">{pklInfo.truckPayload}</div>
          </div>
          <div className="info_row">
            <div className="label_div">Total Trucks: </div>
            <div className="val_div">{pklInfo.totalTrucks}</div>
          </div>
          <div style={{ display: "flex" }}>
            {Array.from({ length: pklInfo.totalTrucks }, (truck, index) => (
              <div key={index} className="truck">
                <div className="truck_no">Truck {index + 1}</div>
                <div className="info_row">
                  <div className="label_div">Truck No : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckNo}
                      onChange={(event) => handleTruckInputChange(event, index, "truckNo")}
                    ></input>
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Truck Driver : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverName}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverName")}
                    ></input>
                  </div>
                </div>{" "}
                <div className="info_row">
                  <div className="label_div">Driver Mob/Tel : </div>
                  <div className="">
                    <input
                      type="text"
                      value={truckItems[index].truckDriverTel}
                      onChange={(event) => handleTruckInputChange(event, index, "truckDriverTel")}
                    ></input>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*   ...........................................................................................................................................*/}

          <div>
            <table className="pi__table table table-bordered">
              <thead>
                <tr className="th_style">
                  <th scope="col">
                    <div className="th_cell_div">#</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Description</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">QTY(PCs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Pallet</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unit NW</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">NW(KGs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unit GW</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">GW(KGs)</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Unite price</div>
                  </th>
                  <th scope="col">
                    <div className="th_cell_div">Total</div>
                  </th>
                  {truckItems.map((truck, index) => (
                    <th key={index}>Truck No :{truck.truckNo}</th>
                  ))}
                  <th>
                    <div className="th_cell_div">warehouses</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pklInfo?.pklProducts?.map((product, productIndex) => (
                  <tr className={productIndex % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={productIndex}>
                    <td>
                      <div style={{ fontWeight: "bold" }} className="td_padding">
                        {productIndex + 1}
                      </div>
                    </td>
                    <td>
                      <div className="td_padding employee_cell">{product.description}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.qty}</div>
                    </td>
                    <td>
                      <div className="td_padding customer_cell">{product.pallet}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.netWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalNetWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.grossWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalGrossWeight?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.price?.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="td_padding">{product.totalAmount?.toFixed(2)}</div>
                    </td>
                    {truckItems.map((truckItem, truckIndex) => (
                      <td key={truckIndex}>
                        <div className="warehouses">
                          {product.bookedWarehouses.map((warehouse, whIndex) => (
                            <div className="warehouse_bl_item" style={{ flex: 1 }} key={whIndex}>
                              <div className="warehouse_bl_item_code">
                                {warehouse.qty}/
                                {warehouse.qty - getTruckProductWarehouseItemQty(product.productId, truckIndex, warehouse.warehouse)}
                              </div>{" "}
                              <div className="warehouse_bl_item_code">{warehouse.warehouse}</div>
                              <div className="warehouse_bl_item_qty">
                                {" "}
                                <input
                                  type="text"
                                  value={getTruckProductWarehouseItemQty(product.productId, truckIndex, warehouse.warehouse)}
                                  onChange={(e) => {
                                    const qtyVal = e.target.value;
                                    setTruckProductWarehouseItemQty(product.productId, truckIndex, warehouse.warehouse, qtyVal);
                                  }}
                                ></input>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                    <td>
                      <div className="td_pading" style={{ display: "flex" }}>
                        {product.bookedWarehouses.map((warehouse, index) => (
                          <div style={{ flex: 1 }} key={index}>
                            <div>{warehouse.warehouse}</div>
                            <div>{warehouse.qty}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PackingList;
