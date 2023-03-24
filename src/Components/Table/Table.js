import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletProductformCart, setProductQty, modifyProductPrice } from "../../store/cartSlice";
import './styles.css'
import { contents } from "./test";
const TablePage = () => {
  const dispatch = useDispatch();
  let totalAmount = 0;
  const selectedProducts = useSelector((state) => state.cart.cart);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);

  const [qty, setQty] = useState("");
  const [newPrice,setNewPrice] = useState();

  console.log(selectedProducts);

  let UAERATE=1;
  if(currency === "AED")UAERATE=usdToAedRate;
  function calcTotal() {
    selectedProducts.map((item) => {
      console.log(item.LocalPrice);
      if(location === "freezone"){
        totalAmount += item.freezonePrice * item.qty * UAERATE;
      }else{
        totalAmount += item.LocalPrice* item.qty*UAERATE;
      }
    });

  }
calcTotal();
  function calcPrice(item) {
    let price =0;
    if(location === "freezone"){
      price = item.freezonePrice;
    }else{
      price = item.LocalPrice;
    }
    if(currency === "AED"){
      price = price * usdToAedRate;
    }
    return price;
  }

  return (
    <>
      <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className="font-normal text-left ">NO</th>
              <th className="font-normal text-left pl-12">ITEMS</th>
              <th className="font-normal text-left ">QTY(PCS)/(WATTS)</th>
              <th className="font-normal text-left ">UNIT PRICE(USD)</th>
              <th className="font-normal  ">New Price</th>
              <th className="font-normal text-left ">TOLTAL USD</th>
              <th className="font-normal  pl-12">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="">
            {selectedProducts.map((item, index) => (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {item.brand}&nbsp;{item.code}&nbsp;({item.capacity})
                  </p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">{item.qty}</p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    {" "}
                    {currency === "USD" ? " $ " : " AED "}
                    {calcPrice(item)?.toFixed(2)}
                  </p>
                </td>
                <td className="pl-12" style={{padding : "0px" , width : "5%"}}>
                <input id="new_price" type="text" className="new_price_txt" onBlur={(e)=>console.log(e.target.value)}/>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    {currency === "USD" ? " $ " : " AED "}
                    {item.qty >0 ? (calcPrice(item) * item.qty)?.toFixed(2) : 0}
                  </p>
                </td>
                <td className="pl-12">
                  <Button
                    variant="contained"
                    onClick={() => {
                      //if (item?.dumm_id !== 1) dispatch(modifyProductPrice({ id: item._id, dumm_id: 1, price: calcPrice(item) }));

                      dispatch(setProductQty({ id: item._id, qty: qty }));
                    }}
                    style={{ marginRight: "20px" }}
                    color="primary"
                  >
                    MODIFY
                  </Button>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                    style={{ width: "70px", marginRight: "20px" }}
                  />
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
              </tr>
            ))}
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
                <p className="text-sm font-medium leading-none text-gray-800">{totalAmount?.toFixed(2)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePage;
