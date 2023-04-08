import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  proformaInvoices: [],
}
export const proformaInvoicesSlice = createSlice({
  name: "proformaInvoices",
  initialState: initialState,
  reducers: {
   
    fetchAllProformaInvoices: (state, action) => {
      const  data  = action.payload;
      console.log(data);
      state.proformaInvoices = data;
     
    },
    changeProformaInvoiceStatus: (state, action) => {
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice._id === action.payload.id) {
          proformaInvoice.status = action.payload.status;
          proformaInvoice.managerMessage = action.payload.managerMessage;
          proformaInvoice.manager  = action.payload.manager;
        } })
    },
    changeSignedProformaInvoiceStatus: (state, action) => {
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice.pi_id === action.payload.id) {
          proformaInvoice.status = action.payload.status;
          proformaInvoice.pi_done_status.push(proformaInvoice.status)
        }else{
          console.log("not changed status");
        } })
    },
    changeUserPassword: (state, action) => {
      state.users.map((user) => {
        if (user._id === action.payload.id) {
          user.password = action.payload.password;
        } })
    
    }
  },
});

export const { fetchAllProformaInvoices ,changeProformaInvoiceStatus ,changeUserPassword ,changeSignedProformaInvoiceStatus} = proformaInvoicesSlice.actions;

export default proformaInvoicesSlice.reducer;
