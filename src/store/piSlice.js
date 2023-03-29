/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const piSlice = createSlice({
  name: "pi",
  initialState: {
    piProducts: [],
    piInfo: {
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
      employee : "",
      phoneNumber : "",
      note : "",
      currency : "USD",
      location : "freezone"

    },
    isPi : true
  },
  reducers: {
    setPICurrencyLocation : (state, action) => {
      state.piInfo.currency = action.payload.currency;
      state.piInfo.location = action.payload.location;
    },

    setIsPI : (state, action) => {
      state.isPi = action.payload;
    },
    setPiProudcts: (state, action) => {
      state.piProducts = action.payload;
    },
    setPiInfo: (state, action) => {
      state.piInfo = action.payload;
    },
    setPiNo: (state, action) => {
      state.piInfo.invoiceNo = action.payload + 1;
    },
    setPiEmployee: (state, action) => {
      state.piInfo.employee = action.payload;
    },

    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push(action.payload);
    },
  },
});

export const { setPiInfo, setPiProudcts, setPiNo ,setPiEmployee ,setIsPI ,setPICurrencyLocation } = piSlice.actions;

export default piSlice.reducer;
