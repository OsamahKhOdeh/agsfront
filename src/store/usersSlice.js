import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: [],
}
export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
   
    fetchAllUsers: (state, action) => {
      const  data  = action.payload;
      console.log(data);
      state.users = data;
     
    },
    changeUserStatus: (state, action) => {
      state.users.map((user) => {
        if (user._id === action.payload.id) {
          user.active = action.payload.active;
        } })
    },
    changeUserPassword: (state, action) => {
      state.users.map((user) => {
        if (user._id === action.payload.id) {
          user.password = action.payload.password;
        } })
    
    }
  },
});

export const { fetchAllUsers ,changeUserStatus ,changeUserPassword} = usersSlice.actions;

export default usersSlice.reducer;
