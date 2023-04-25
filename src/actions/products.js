import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { deleteProductState, fetchAll, fetchFilterd } from "../store/productsSlice";

export const createProduct = (newProduct) => async (dispatch) => {
  console.log(newProduct);
  try {
    const { data } = await api.createProduct(newProduct);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchProducts();
    console.log(data);
    dispatch(fetchAll(data.data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = (filters) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchFilteredProducts(filters);
    // if (data.data2) {
    //  console.log(data.data2);
    // }
    dispatch(fetchFilterd(data.data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  console.log("here");
  console.log(id);

  try {
    const { data } = await api.updateProduct(id, product);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};

export const uploadDatasheet = async (datasheet) => {
  console.log("here");

  try {
    const { data } = await api.uploadDatasheet(datasheet);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};

export const downloadDatasheet = async (id, fileName) => {
  console.log("here");

  try {
    // using Java Script method to get PDF file
    fetch(api.BASE_URL + "/download/" + id).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${fileName.trim()}.pdf`;
        alink.click();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    // dispatch(deleteProductState(id))
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
