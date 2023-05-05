import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";

export const createPurchaseOrder = (newPurchaseOrder) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    console.log(newPurchaseOrder);
    const { data } = await api.createPurchaseOrder(newPurchaseOrder);
    console.log(data);
    dispatch(setIsLoading(false, { status: "success", msg: data.po_no }));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false, { status: "success", msg: error }));
  }
};

export const getPurchaseOrdersAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getPurchaseOrders();
    console.log(data);
    // dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};
