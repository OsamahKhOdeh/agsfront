import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { setPiNo } from "../store/piSlice";
import { changeProformaInvoiceStatus, changeSignedProformaInvoiceStatus, fetchAllProformaInvoices } from "../store/proformaInvoicesSlice";
import { deleteProductState } from "../store/productsSlice";
/* ------------------------------- all orders ------------------------------- */
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getAllOrdes();
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

/* --------------------------------EMPLOYEE ORDERS------------------------------------------ */

export const getEmplyeeOrders = (employee) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    console.log(employee);
    const { data } = await api.getEmployeeOrders(employee);
    console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/* --------------------------------Handle Order Status ------------------------------------------ */

export const updateOrderStatus = (id,isNext) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.updateOrderStatus(id,isNext);
    // dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */