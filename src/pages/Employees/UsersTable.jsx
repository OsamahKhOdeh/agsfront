import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../actions/users";
import { changeUserPassword, changeUserPhoneNumber, changeUserStatus } from "../../store/usersSlice";
import { ToastContainer, toast } from "react-toastify";

const UsersTable = () => {
  const dispatch = useDispatch();
  let totalAmount = 0;
  const users = useSelector((state) => state.users.users);
  const showToastMessage = (msg) => {
    toast.success(`${msg}✅`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
    <ToastContainer />

          <div className="card-custom">

          </div>
          <div className="table-pi-list">
            <div className="pi__table table">
              <table className="w-full ">
            <thead>
              <tr className="h-16  text-sm leading-none text-gray-800">
                <th  >User Name</th>
                <th  >Role</th>
                <th  >ACTIONS</th>
              </tr>
            </thead>
            <tbody className="">
              {users.map((user, index) => (
                <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                {/* Name  */}
                  <td  >
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {user.username}
                    </p>
                  </td>
                  
                  <td  >
                    <p className="font-medium">
                      {user.roles}
                    </p>
                  </td>
                  <td  >
                    <Button
                      variant="contained"
                      onClick={() => {
                      dispatch(changeUserStatus({id :user._id , active : user.active? false : true}));
                      }}
                      style={{ marginRight: "20px" ,width : "80px" }}
                      color="primary"
                    >
                    {user.active ?"Block" : "Unblock"}
                    </Button>
                  
                    <Button
                      onClick={() => {
                        dispatch(deleteUser(user._id))
                        showToastMessage(`User ${user.username} deleted Succesfully`);
                      }}
                      variant="contained"
                      style={{ backgroundColor: "red"  , marginRight: "20px"}}
                    >
                      DELETE
                    </Button>

                    <Button
                      onClick={() => {
                        dispatch(updateUser(user._id,user))
                        showToastMessage(`User ${user.username} updated Succesfully`);
                      }}
                      variant="contained"
                      style={{ backgroundColor: "green" }}
                    >
                      Confirm
                    </Button>
                    <input className="password_txt" style={{width: "180px"}} type="text" placeholder="password"  onChange={(e) => {
                        dispatch(changeUserPassword({id :user._id, password : e.target.value}));
                      }}/>
                  
                  </td>
                  <td>
                  <input className="password_txt" style={{width: "180px"}} type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => {
                        dispatch(changeUserPhoneNumber({id :user._id, phone : e.target.value}));
                      }}/>
                  </td>
                </tr>
              ))}
              
            </tbody>
              </table>
            </div>
          </div>


      {/* <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className=" text-left ">NO</th>
              <th  >Username</th>
              <th  >Status</th>
              <th  >Online/Offline</th>
              <th  >Role</th>
              <th  >ACTIONS</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, index) => (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td  >
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {user.username}
                  </p>
                </td>
                
                <td  >
                  <p style={{width : "50px"}} className="font-medium">
                    {" "}
                    {user.active  ? "Active" : "Not Active"}
                  </p>
                </td>
                <td  >
                  <p className="font-medium">
                    Online
                  </p>
                </td>
                <td  >
                  <p className="font-medium">
                    {user.roles}
                  </p>
                </td>
                <td  >
                  <Button
                    variant="contained"
                    onClick={() => {
                     dispatch(changeUserStatus({id :user._id , active : user.active? false : true}));
                    }}
                    style={{ marginRight: "20px" ,width : "80px" }}
                    color="primary"
                  >
                  {user.active ?"Block" : "Unblock"}
                  </Button>
                 
                  <Button
                    onClick={() => {
                      dispatch(deleteUser(user._id))
                      showToastMessage(`User ${user.username} deleted Succesfully`);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "red"  , marginRight: "20px"}}
                  >
                    DELETE
                  </Button>
                  <input className="password_txt" style={{width: "180px"}} type="text" placeholder="password"  onChange={(e) => {
                      dispatch(changeUserPassword({id :user._id, password : e.target.value}));
                    }}/>
                 
                </td>
                <td>
                <input className="password_txt" style={{width: "180px"}} type="text" placeholder="Phone Number" value={user.phone} onChange={(e) => {
                      dispatch(changeUserPhoneNumber({id :user._id, phone : e.target.value}));
                    }}/>
                </td>
                <td  > <Button
                    onClick={() => {
                      dispatch(updateUser(user._id,user))
                      showToastMessage(`User ${user.username} updated Succesfully`);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "green" }}
                  >
                    Confirm
                  </Button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default UsersTable;
