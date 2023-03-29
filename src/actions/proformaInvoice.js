import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { setPiNo } from "../store/piSlice";
import { changeProformaInvoiceStatus, fetchAllProformaInvoices } from "../store/proformaInvoicesSlice";

export const createProformaInvoice = (newProformaInvoice) => async (dispatch) => {
  console.log(newProformaInvoice);
  try {
    const { data } = await api.createProformaInvoice(newProformaInvoice);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getLastPiNo = () => async (dispatch) => {
  const lastPiNo = await api.getLastPiNo();
  console.log(lastPiNo);
  dispatch(setPiNo(lastPiNo.data));
};


export const getProformaInvoicesAction = () => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:26 ~ getProformaInvoicesAction ~ getProformaInvoicesAction:")
  try {
    dispatch(setIsLoading(true));
    const {data} = await api.getProformaInvoices();
     console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProformaInvoiceStatus = ({id, newStatus}) => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:39 ~ updateProformaInvoiceStatus ~ newStatus:", newStatus)
  console.log("here");
  console.log(id);

  try {
   const { data } = await api.updateProformaInvoiceStatus({id, newStatus});
   console.log(data);
   dispatch(changeProformaInvoiceStatus({id , status : newStatus}))
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};