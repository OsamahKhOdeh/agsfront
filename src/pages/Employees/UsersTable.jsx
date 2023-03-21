import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/users";
import { changeUserPassword, changeUserStatus } from "../../store/usersSlice";
const UsersTable = () => {
  const dispatch = useDispatch();
  let totalAmount = 0;
  const users = useSelector((state) => state.users.users);
  return (
    <>
      <div className="container mx-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16  text-sm leading-none text-gray-800">
              <th className=" text-left ">NO</th>
              <th className="text-left pl-12">Username</th>
              <th className=" text-left pl-12">Status</th>
              <th className="text-left pl-12">Online/Offline</th>
              <th className="font-normal text-left pl-12 ">Role</th>
              <th className="font-normal  pl-12">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, index) => (
              <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={index}>
                <td className="pl-4 cursor-pointer">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <td className="pl-12">
                  <p className="text-sm font-medium leading-none text-gray-800">
                    {user.username}
                  </p>
                </td>
                
                <td className="pl-12">
                  <p style={{width : "50px"}} className="font-medium">
                    {" "}
                    {user.active  ? "Active" : "Not Active"}
                  </p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    Online
                  </p>
                </td>
                <td className="pl-12">
                  <p className="font-medium">
                    {user.roles}
                  </p>
                </td>
                <td className="pl-12">
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
                <td className="pl-12"> <Button
                    onClick={() => {
                      dispatch(updateUser(user._id,user))
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
      </div>
    </>
  );
};

export default UsersTable;
