import * as api from '../api/index.js';
import { setCredentials } from '../store/authSlice.js';

export const login = (formData , navigate) => async (dispatch) => {
  const { username, password } = formData;
  console.log( username, password);
  try {
    const { data } = await api.login({username , password});
    dispatch(setCredentials(data))
    navigate('/user');
    console.log(data);
   // router.push('/');
  } catch (error) {
    console.log(error.response.data.message);
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