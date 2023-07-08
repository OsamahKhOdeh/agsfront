import * as api from "../api/index.js";
import { ROLES } from "../config/roles.js";
import useAuth from "../hooks/useAuth.js";
import { logOut, setAutherized, setCredentials } from "../store/authSlice.js";
import { setIsLoading } from "../store/showingSlice.js";

export const login = (formData, navigate) => async (dispatch) => {
  const { username, password } = formData;
  const roles = useAuth().roles;
  console.log(username, password);
  try {
    const { data } = await api.login({ username, password });
    dispatch(setCredentials(data));
    dispatch(setAutherized(true));
    if (roles.includes(ROLES.SyriaSales)) {
      navigate("/user/makepi");
    } else {
      navigate("/user/home");
    }
    if (localStorage.getItem("token")) {
    }
    // router.push('/');
  } catch (err) {
    if (!err.status) {
      console.log("No Server Response");
    } else if (err.status === 400) {
      console.log("Missing Username or Password");
    } else if (err.status === 401) {
      console.log("Unauthorized");
    } else {
      console.log(err.data?.message);
    }
    console.log(err.response.data.message);
    dispatch(setAutherized(false));
  }
};

export const logout = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.logout();
    dispatch(setIsLoading(true));
    dispatch(logOut());
    dispatch(setIsLoading(false));

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
/*
export const refresh = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data });
  
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };*/
