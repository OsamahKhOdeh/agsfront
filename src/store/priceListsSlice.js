/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const priceListsSlice = createSlice({
  name: "pi",
  initialState: {
    priceListProducts: [],
    priceListInfo: {
      invoiceNo: 0,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
      exporter: "",
      buyerAdress: "",
      consignee: "",
      notifyParty: "",
      partyOfDischarge: "",
      finalDistination: "",
      discount: 0,
      additions : 0,
      terms : [],
      employee : ""
    },
  },
  reducers: {
    setPriceListProudcts: (state, action) => {
      state.piProducts = action.payload;
    },
    setPriceListInfo: (state, action) => {
      state.piInfo = action.payload;
    },
    setPiNo: (state, action) => {
      if(action?.payload)
      state.piInfo.invoiceNo = action.payload + 1;
    },
    setPriceListEmployee: (state, action) => {
      state.piInfo.employee = action.payload;
    },

    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push(action.payload);
    },
  },
});

export const { setPriceListInfo, setPriceListProudcts, setPiNo ,setPriceListEmployee } = priceListsSlice.actions;

export default priceListsSlice.reducer;
