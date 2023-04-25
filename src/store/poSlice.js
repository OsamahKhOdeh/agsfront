/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const poSlice = createSlice({
  name: "po",
  initialState: {
    products: [],
    total: 0,
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
      additions: 0,
      terms: [],
      employee: "",
      employeePhone: "",
      phoneNumber: "",
      note: "",
      currency: "USD",
      location: "freezone",
      bankDetails: [],
      paymentPercentage: "30",
    },
    isPi: true,
  },
  reducers: {
    addProductToPo: (state, action) => {
      state.products.some((item) => item._id === action.payload._id)
        ? null
        : state.products.push({ ...action.payload, qty: 0, proudctPrice: 0 });
    },
    deleteProductFromPo: (state, action) => {
      let index = state.products.findIndex((obj) => obj._id === action.payload._id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    setProductQty: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.qty = action.payload.qty;
        }
      });
    },
    setProductPrice: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.proudctPrice = action.payload.price;
        }
      });
    },
    emptyPo(state, caction) {
      state.products = [];
    },

    deleteAllPoProducts: (state, action) => {
      state.cart = [];
    },

    setPiExporter: (state, action) => {
      state.piInfo.exporter = action.payload;
    },
    setPiBuyerAdress: (state, action) => {
      state.piInfo.buyerAdress = action.payload;
    },
    setPiConsignee: (state, action) => {
      state.piInfo.consignee = action.payload;
    },
    setPinNotifyParty: (state, action) => {
      state.piInfo.notifyParty = action.payload;
    },
    setPiPartyOfDischarge: (state, action) => {
      state.piInfo.partyOfDischarge = action.payload;
    },
    setPiFinalDistination: (state, action) => {
      state.piInfo.finalDistination = action.payload;
    },
    setPiDiscount: (state, action) => {
      state.piInfo.discount = action.payload;
    },
    setPiAdditions: (state, action) => {
      state.piInfo.additions = action.payload;
    },
    setPiTerms: (state, action) => {
      state.piInfo.terms = action.payload;
    },
    setPiPhoneNumber: (state, action) => {
      state.piInfo.phoneNumber = action.payload;
    },
    setPiNote: (state, action) => {
      state.piInfo.note = action.payload;
    },
    setPaymentPercentage: (state, action) => {
      state.piInfo.paymentPercentage = action.payload;
    },
    setPICurrencyLocation: (state, action) => {
      state.piInfo.currency = action.payload.currency;
      state.piInfo.location = action.payload.location;
    },

    setIsPI: (state, action) => {
      state.isPi = action.payload;
    },
    setPiProudcts: (state, action) => {
      state.piProducts = action.payload;
    },
    setPiInfo: (state, action) => {
      state.piInfo = action.payload;
    },
    setPiBankDetails: (state, action) => {
      state.piInfo.bankDetails = action.payload;
    },
    setPiNo: (state, action) => {
      state.piInfo.invoiceNo = action.payload + 1;
    },
    setPiEmployee: (state, action) => {
      state.piInfo.employee = action.payload.employeeName;
      state.piInfo.employeePhone = action.payload.employeePhone;
    },

    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push(action.payload);
    },
  },
});

export const {
  setPiExporter,
  setPiAdditions,
  setPiBuyerAdress,
  setPiConsignee,
  setPiDiscount,
  setPiFinalDistination,
  setPiNote,
  setPiPartyOfDischarge,
  setPinNotifyParty,
  setPiPhoneNumber,
  setPiTerms,
  setPiInfo,
  setPiProudcts,
  setPiNo,
  setPiEmployee,
  setIsPI,
  setPICurrencyLocation,
  setPiBankDetails,
  setPaymentPercentage,
} = poSlice.actions;

export default poSlice.reducer;
