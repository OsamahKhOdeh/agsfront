import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletProductformCart,
  setProductQty,
  modifyProductPrice,
  modifyProductPriceFreezone,
  modifyProductPriceLocal,
  modifyProductPriceFreezoneAED,
  modifyProductPriceLocalAED,
} from "../../store/cartSlice";
import { setPICurrencyLocation } from "../../store/piSlice";
import "./styles.css";
import { contents } from "./test";
const TablePage = () => {
  const pi = useSelector((state) => state.pi.isPi);
  function calcPrice(item) {
    let price = 0;
    if (location === "freezone" && currency === "AED") {
      price = item.freezonePriceAED;
    }
    if (location === "local" && currency === "AED") {
      price = item.LocalPriceAED;
    }
    if (location === "freezone" && currency === "USD") {
      price = item.freezonePrice;
    }
    if (location === "local" && currency === "USD") {
      price = item.LocalPrice;
    }

    return price;
  }
  const dispatch = useDispatch();

  let totalAmount = 0;
  const selectedProducts = useSelector((state) => state.cart.cart);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  useEffect(() => {
    dispatch(setPICurrencyLocation({ currency, location }));
  }, []);

  const [qty, setQty] = useState("");

  const [newPrice, setNewPrice] = useState(selectedProducts.map((product) => calcPrice(product)));
  const [quantities, setQuantities] = useState(selectedProducts.map((item) => item.qty));
  const handleQuantityChange = (index, event) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  let UAERATE = 1;
  if (currency === "AED") UAERATE = usdToAedRate;

  function calcTotal() {
    selectedProducts.map((item) => {
      if (location === "freezone" && currency === "AED") {
        totalAmount += item.freezonePriceAED * item.qty;
      }
      if (location === "local" && currency === "AED") {
        totalAmount += item.LocalPriceAED * item.qty;
      }
      if (location === "freezone" && currency === "USD") {
        totalAmount += item.freezonePrice * item.qty;
      }
      if (location === "local" && currency === "USD") {
        totalAmount += item.LocalPrice * item.qty;
      }
    });
  }
  calcTotal();

  const handleNewPriceChange = (event, id, index) => {
    if (location === "freezone" && currency === "AED") {
      dispatch(modifyProductPriceFreezoneAED({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "local" && currency === "AED") {
      dispatch(modifyProductPriceLocalAED({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "freezone" && currency === "USD") {
      dispatch(modifyProductPriceFreezone({ id: id, price: parseFloat(event.target.value) }));
    }
    if (location === "local" && currency === "USD") {
      dispatch(modifyProductPriceLocal({ id: id, price: parseFloat(event.target.value) }));
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className="font-normal text-left ">NO</th>
              <th className="font-normal text-left pl-12">ITEMS</th>
              {pi && <th className="font-normal text-left ">QTY(PCS)/(WATTS)</th>}
              <th className="font-normal text-left ">UNIT PRICE(USD)</th>
              <th className="font-normal  ">New Price</th>
              {pi && <th className="font-normal ">TOLTAL USD</th>}
              {pi && <th className="font-normal">Qty</th>}
              {pi && <th className="font-normal ">ACTIONS</th>}
            </tr>
          </thead>
          <tbody className="">
            {selectedProducts.map((item, index) => (
              <tr
                className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                key={index}
              >
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {item.brand}&nbsp;{item.code}&nbsp;({item.capacity})
                  </p>
                </td>
                {pi && (
                  <td className="pl-12">
                    <p className="font-medium">{item.qty}</p>
                  </td>
                )}
                <td className="pl-12">
                  <p className="font-medium">
                    {" "}
                    {currency === "USD" ? " $ " : " AED "}
                    {calcPrice(item)?.toFixed(3)}
                  </p>
                </td>
                <td className="pl-12" style={{ padding: "0px", width: "8%" }}>
                  <input
                    id="new_price"
                    placeholder={calcPrice(item)?.toFixed(3)}
                    type="text"
                    className="new_price_txt"
                    value={newPrice[index]?.toFixed(3)}
                    onChange={(e) => {
                      let newPriceArray = [...newPrice];
                      newPriceArray[index] = e.target.value;
                      setNewPrice(parseFloat(newPriceArray));
                    }}
                    onBlur={(e) => {
                      handleNewPriceChange(e, item._id);
                    }}
                  />
                </td>

                {pi && (
                  <td className="pl-12">
                    <p className="font-medium">
                      {currency === "USD" ? " $ " : " AED "}
                      {item.qty > 0 ? (calcPrice(item) * item.qty)?.toFixed(3) : 0}
                    </p>
                  </td>
                )}
                {pi && (
                  <>
                    <td className="pl-12">
                      <TextField
                        variant="outlined"
                        onChange={(e) => {
                          handleQuantityChange(index, e);
                          setQty(e.target.value);
                        }}
                        value={quantities[index]}
                        onBlur={() => {
                          dispatch(setProductQty({ id: item._id, qty: quantities[index] }));
                        }}
                        style={{ width: "70px", marginRight: "20px" }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          dispatch(deletProductformCart(item));
                        }}
                        variant="contained"
                        style={{ backgroundColor: "red" }}
                      >
                        DELETE
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {pi && (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800"></p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800"></p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800"></p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">Total Invoice :</p>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">{totalAmount?.toFixed(3)}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePage;
