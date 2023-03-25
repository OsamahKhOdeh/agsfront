import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import filtersSlice from "./filtersSlice";
import piSlice from "./piSlice";
import priceListSlice from "./priceListSlice";
import priceListsSlice from "./priceListsSlice";
import productReducer from "./productSlice";
import productsSlice from "./productsSlice";
import showingSlice from "./showingSlice";
import usersSlice from "./usersSlice";
import warrantySlice from "./warrantySlice";

export default configureStore({
  reducer: {
    priceList: priceListSlice,
    products: productsSlice,
    products1: productReducer,
    cart: cartSlice,
    pi: piSlice,
    // products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
    auth : authSlice,
    users :usersSlice,
    priceLists : priceListsSlice,
  },
});
