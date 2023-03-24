import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/users';
import './styles.css'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const NewUser = () => {
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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const handleSubmit = (e) => {
        e.preventDefault();
        let roles =[];
        roles.push(role);
        if(password === confirmPassword) {
        dispatch(createUser({ username, password,roles}));
        showToastMessage(`User ${username} created successfully`);
    }else{
        alert('Password do not match');
    }
        console.log(username, password, confirmPassword, role);
    }
  return (
    <div className='full_page'>
          <ToastContainer />

     <h3>Add new User</h3>

     <div>
      <form onSubmit={handleSubmit}>
         <label for="username">Username</label>
         <input type="text" id="username" name="username" placeholder="dubai_ahmad_khalil" onChange={(e)=>{setUsername(e.target.value)}}/>
    
         <label for="password">Password</label>
         <input type="text" id="psws" name="password" placeholder="*************" onChange={(e)=>{setPassword(e.target.value)}} />
         <label for="password">Confirm Password</label>
         <input type="text" id="c_psws" name="c_password" placeholder="*************" onChange={(e)=>{setConfirmPassword(e.target.value)}} />

         <label for="role">Role</label>
         <select id="role" name="role" onChange={(e)=>{setRole(e.target.value)}}>
         <option value="Admin">Admin</option>
         <option value="Sales">Sales</option>
         <option selected={true} value="Employee">Employee</option>
         </select>
        <input type="submit" value="Create New User"/>
      </form>
    </div>
    <button type="button" className='previous' onClick={()=>{navigate('/user/employees')}}>&laquo;back to employees</button>
 </div>
  )
}

export default NewUser