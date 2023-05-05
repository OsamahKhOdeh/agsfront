import axios from "axios";
export const BASE_URL = "http://localhost:5000";
const API = axios.create({ baseURL: BASE_URL });
// http://143.42.61.215:5000
//"http://localhost:5000"
//export const createProduct = (newProduct) => API.post("/products", newProduct);
//export const createProduct = (newProduct) => axios.post("https://server1-ustg.onrender.com/products", newProduct);
export const createProduct = (newProduct) => API.post("/products", newProduct);

export const fetchProducts = () => API.get(`/products`);

export const fetchFilteredProducts = (filters) =>
  API.get(
    `/products/search?categories=${filters.categories || ""}&countries=${filters.countries || ""}&companies=${
      filters.companies || ""
    }&brands=${filters.brands || ""}&capacities=${JSON.stringify(filters.capacities) || ""}`
  );

export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);

export const createProformaInvoice = (newProformaInvoice) => API.post("/pi", newProformaInvoice);

export const deleteProformaInvoice = (id) => API.delete(`/pi/${id}`);

export const createPurchaseOrder = (newPurchaseOrder) => API.post("/purchaseorder", newPurchaseOrder);

export const getPurchaseOrders = () => API.get(`/purchaseorder`);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getLastPiNo = () => API.get("/pi/last");

export const getProformaInvoices = (id) => API.get(`/pi`);

export const getEmployeeProformaInvoices = (empolyee_name) => API.get(`/pi/employee?employeename=${empolyee_name}`);

export const updateProformaInvoiceStatus = ({ id, newStatus, managerMessage, manager }) =>
  API.patch(`/pi/${id}`, { newStatus, managerMessage, manager });

export const updateProformaInvoice = (id, updatedProformaInvoice) => API.patch(`/pi/update/${id}`, updatedProformaInvoice);

export const getSignedProformaInvoices = (id) => API.get(`/pi/pisigned`);

export const getSignedEmployeeProformaInvoices = (empolyee_name) => API.get(`/pi/pisigned/employee/${empolyee_name}`);

export const updateSignedProformaInvoiceStatus = ({ id, status }) => API.patch(`/pi/pisigned/${id}`, { status });

export const login = ({ username, password }) => API.post("/auth", { username, password });

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
