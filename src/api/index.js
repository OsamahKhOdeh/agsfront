import axios from "axios";
import store from "../store/store";
import jwtDecode from "jwt-decode";

import { useSelector } from "react-redux";
import { logOut, setAutherized, setCredentials } from "../store/authSlice";
import { emptyCart } from "../store/cartSlice";
import { clearFilters } from "../store/filtersSlice";
import { useNavigate } from "react-router-dom";
//143.42.61.215/user/piadmin
export const BASE_URL = "https://agints.vip/api";
// export const BASE_URL = "http://localhost:5001";
// export const BASE_URL = "https://agints.vip/api";
export const BASE_DOMAIN = "https://agints.vip";
// export const BASE_URL = "http://10.255.254.15:5000";
// export const BASE_URL = "http://10.255.254.16:5000";
const API = axios.create({ baseURL: BASE_URL });
const stateToken = store.getState();
console.log(stateToken);
// http://143.42.61.215:5000
//"http://localhost:5000"
//export const createProduct = (newProduct) => API.post("/products", newProduct);
//export const createProduct = (newProduct) => axios.post("https://server1-ustg.onrender.com/products", newProduct);

/* -------------------------------------------------------------------------- */
const getToken = () => {
  return localStorage.getItem("token");
};
const setToken = (token) => {
  localStorage.setItem("token", token);
};
const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  const decoded = jwtDecode(token);
  const { exp } = decoded.UserInfo;
  return exp * 1000 < Date.now(); // Compare expiration time with current time
};

const getRefreshedToken = async () => {
  console.log("getRefreshedToken");
  const response = await axios.get(`${BASE_URL}/auth/refresh`, { withCredentials: true });
  console.log(response);
  return response.data.token;
};
export const refreshToken = async () => {
  console.log("Get refresh token");
  try {
    const newToken = await getRefreshedToken();
    console.log("new token", newToken);
  } catch (e) {
    console.log(e);
  }
  // store.dispatch(setCredentials(newToken))
  // store.dispatch(setAutherized(true));
  // console.log('Token refreshed');
  // setToken(newToken);
};
/* -------------------------------------------------------------------------- */

API.interceptors.request.use(async (req) => {
  if (isTokenExpired()) {
    console.log("expired token");
    // await refreshToken();
  } else {
    console.log("token not expired");
  }

  if (localStorage.getItem("token")) {
    console.log(JSON.parse(localStorage.getItem("token")));
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
  } else {
    const stateToken = store.getState().auth.token;
    console.log(stateToken);
    req.headers.Authorization = `Bearer ${stateToken}`;
  }
  return req;
});

const logoutAction = (r) => {
  store.dispatch(logOut());
  store.dispatch(emptyCart());
  store.dispatch(clearFilters());
};

export const createProduct = (newProduct) => {
  console.log(newProduct);
  API.post("/products", newProduct);
};
export const fetchProducts = () => API.get(`/products`);

export const fetchFilteredProducts = (filters) =>
  API.get(
    `/products/search?categories=${filters.categories || ""}&countries=${filters.countries || ""}&companies=${filters.companies || ""}&brands=${filters.brands || ""}&capacities=${
      JSON.stringify(filters.capacities) || ""
    }`
  );

export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);

//export const updateProductWarehouseBlQty = (id, newStock) => API.patch(`/products/productqty/${id}`, newStock);

export const updateProductWarehouseBlQty = (id, newStock) => API.patch(`/stock/productqty/${id}`, newStock);

export const updateProductMoveToAvailable = (id, newStock) => API.patch(`/products/productmoveavailable/${id}`, newStock);

export const updateProductMoveToComing = (id, newStock) => API.patch(`/products/productmovecoming/${id}`, newStock);

export const updateProductWarehouseBlBookedQty = (id, newStock) => API.patch(`/products/productbookedqty/${id}`, newStock);

export const updateProductStock = (id, newStock) => API.patch(`/products/stock/${id}`, newStock);

export const updateStock = (id, newStock) => API.patch(`/products/stockall/${id}`, newStock);

export const newStockItem = (id, newStock) => API.post(`/stock/${id}`, newStock);

export const fetchStock = () => API.get(`/stock`);

export const createProformaInvoice = (newProformaInvoice) => API.post("/pi", newProformaInvoice);

export const deleteProformaInvoice = (id) => API.delete(`/pi/${id}`);

export const createPurchaseOrder = (newPurchaseOrder) => API.post("/purchaseorder", newPurchaseOrder);

export const getPurchaseOrders = () => API.get(`/purchaseorder`);

export const getEmployeePurchaseOrders = (empolyee_name) => API.get(`/purchaseorder/employee?employeename=${empolyee_name}`);

export const updatePurchaseOrderStatus = ({ id, newStatus, managerMessage, manager }) => API.patch(`/purchaseorder/${id}`, { newStatus, managerMessage, manager });

export const deletePurchaseOrder = (id) => API.delete(`/purchaseOrder/${id}`);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getLastPiNo = () => API.get("/pi/last");

export const getProformaInvoices = (id) => API.get(`/pi`);

export const getEmployeeProformaInvoices = (empolyee_name) => API.get(`/pi/employee?employeename=${empolyee_name}`);

export const updateProformaInvoiceStatus = (data) => API.patch(`/pi/${data.id}`, data);
/* -------------------------------------------------------------------------- */
/*                                     PKL                                    */
/* -------------------------------------------------------------------------- */

export const getEmployeePackingLists = (empolyee_name) => API.get(`/packinglist/employee?employeename=${empolyee_name}`);

export const getPackingLists = (id) => API.get(`/packinglist`);

export const updatePackingListStatus = ({ id, newStatus, manager, managerMessage, managerApproval }) =>
  API.patch(`/packinglist/${id}`, { newStatus, managerMessage, manager, managerApproval });

export const deletePackingList = (id) => API.delete(`/packingList/${id}`);

/* -------------------------------------------------------------------------- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateProformaInvoice = (id, updatedProformaInvoice) => API.patch(`/pi/update/${id}`, updatedProformaInvoice);

export const getSignedProformaInvoices = (id) => API.get(`/pi/pisigned`);

export const getSignedEmployeeProformaInvoices = (empolyee_name) => API.get(`/pi/pisigned/employee/${empolyee_name}`);

export const getAllOrdes = () => API.get(`/process`);

export const getEmployeeOrders = (empolyee_name) => API.get(`/process/${empolyee_name}`);

export const updateOrderStatus = (id, isNext) => API.patch(`/process/${id}`, { action: isNext ? "next" : "prev" });

export const updateSignedProformaInvoiceStatus = ({ id, status }) => API.patch(`/pi/pisigned/${id}`, { status });

/* -------------------------------------------------------------------------- */
/*                                    AUTH                                    */
/* -------------------------------------------------------------------------- */

export const login = ({ username, password }) => {
  return API.post("/auth", { username, password });
};

export const logout = () => API.post("/auth/logout");

/* -------------------------------------------------------------------------- */

export const uploadDatasheet = (datasheet) => API.post("/upload", datasheet);

export const fetchUsersApi = () => API.get("/users");

export const updateUser = (id, { ...updatedUser }) => API.patch(`/users/${id}`, updatedUser);

export const createUser = (newUser) => API.post("/users", newUser);

export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getEmployeeProjects = (empolyee_name) => API.get(`/projects/employee/${empolyee_name}`);

export const getAllProjects = () => API.get(`/projects`);

/*
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); 
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
*/
