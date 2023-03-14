import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { setPiNo } from "../store/piSlice";

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
