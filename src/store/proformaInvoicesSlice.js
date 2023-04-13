import { createSlice } from "@reduxjs/toolkit";
import { orderStatus } from "../config/piOrderStatus";

const initialState = {
  proformaInvoices: [],
};
export const proformaInvoicesSlice = createSlice({
  name: "proformaInvoices",
  initialState: initialState,
  reducers: {
    fetchAllProformaInvoices: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.proformaInvoices = data;
    },
    changeProformaInvoiceStatus: (state, action) => {
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice._id === action.payload.id) {
          proformaInvoice.status = action.payload.status;
          proformaInvoice.managerMessage = action.payload.managerMessage;
          proformaInvoice.manager = action.payload.manager;
        }
      });
    },
    changeSignedProformaInvoiceStatus: (state, action) => {
      const status = action.payload.status;
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice.pi_id === action.payload.id) {
          const current_stage_no = orderStatus.filter(
            (item) => item.status === proformaInvoice.status
          )[0].stage_no;
          const nextStage = orderStatus.filter(
            (status) => status.stage_no === current_stage_no + 1
          )[0].status;

          proformaInvoice.status = nextStage;
          proformaInvoice.pi_done_status.push(nextStage);
          if (status) {
            proformaInvoice.status = status;
            proformaInvoice.pi_done_status.push(status);
          }
        } else {
          console.log("not changed status");
        }
      });
    },

    changeUserPassword: (state, action) => {
      state.users.map((user) => {
        if (user._id === action.payload.id) {
          user.password = action.payload.password;
        }
      });
    },
  },
});

export const {
  fetchAllProformaInvoices,
  changeProformaInvoiceStatus,
  changeUserPassword,
  changeSignedProformaInvoiceStatus,
  changeSignedProformaInvoiceStatusSelect,
} = proformaInvoicesSlice.actions;

export default proformaInvoicesSlice.reducer;
