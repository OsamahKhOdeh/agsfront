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

export const updateProformaInvoiceStatus = ({id, newStatus , managerMessage}) => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:39 ~ updateProformaInvoiceStatus ~ newStatus:", newStatus , managerMessage);
  console.log("here");
  console.log(id);

  try {
   const { data } = await api.updateProformaInvoiceStatus({id, newStatus , managerMessage});
   console.log(data);
   dispatch(changeProformaInvoiceStatus({id , status : newStatus , managerMessage}))
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};



export const getEmployeeProformaInvoicesAction = (employee) => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:26 ~ getProformaInvoicesAction ~ getProformaInvoicesAction:")
  try {
    dispatch(setIsLoading(true));
    console.log(employee);
    const {data} = await api.getEmployeeProformaInvoices(employee);
     console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};



export const updateProformaInvoice = (id, pi) => async (dispatch) => {
  console.log("here");
  console.log(id);

  try {
    const { data } = await api.updateProformaInvoice(id, pi);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};