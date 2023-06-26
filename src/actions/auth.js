import * as api from "../api/index.js";
import { ROLES } from "../config/roles.js";
import useAuth from "../hooks/useAuth.js";
import { setAutherized, setCredentials } from "../store/authSlice.js";

export const login = (formData, navigate) => async (dispatch) => {
  const { username, password } = formData;
  const roles = useAuth().roles
  console.log(username, password);
  try {
    const { data } = await api.login({ username, password });
    dispatch(setCredentials(data));
    dispatch(setAutherized(true));
    if(roles.includes(ROLES.SyriaSales)){
      navigate("/user/makepi");
    }
    else{
      navigate("/user/home");
    }
    if(localStorage.getItem('token')){

    }
    // router.push('/');
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(setAutherized(false));
  }
};
/*
export const logout = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const refresh = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data });
  
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };*/
