import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../actions/auth";
function LoginPage() {
  const SigninPage = styled.div`
    @import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
    display: grid;
    place-items: center;
    place-content: center;
    .login {
      margin: 20px auto;
      padding: 40px 50px;
      border-radius: 5px;
      background: #fff;
      display: grid;
      place-content: center;
    }
    .login input {
      width: 100%;
      height: 60px;
      display: block;
      box-sizing: border-box;
      margin: 10px 0;
      padding: 14px 12px;
      font-size: 16px;
      border-radius: 2px;
      font-family: Raleway, sans-serif;
    }

    .login input[type="text"],
    .login input[type="password"] {
      border: 1px solid #c0c0c0;
      transition: 0.2s;
    }

    .login input[type="text"]:hover {
      border-color: #f44336;
      outline: none;
      transition: all 0.2s ease-in-out;
    }

    .login .submit {
      border: none;
      background: #ef5350;
      color: white;
      font-weight: bold;
      transition: 0.2s;
      margin: 20px 0px;
      cursor: pointer;
      display: grid;
      place-items: center;
      place-content: center;
      text-align: center;
    }

    .login .submit:hover {
      background: #f44336;
    }

    .login h2 {
      margin: 20px 0 0;
      color: #ef5350;
      font-size: 28px;
    }

    .login p {
      margin-bottom: 40px;
    }

    .links {
      display: table;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid #c0c0c0;
      margin-bottom: 10px;
    }

    .links a {
      display: table-cell;
      padding-top: 10px;
    }

    .links a:first-child {
      text-align: left;
    }

    .links a:last-child {
      text-align: right;
    }

    .login h2,
    .login p,
    .login a {
      text-align: center;
    }

    .login a {
      text-decoration: none;
      font-size: 0.8em;
    }

    .login a:visited {
      color: inherit;
    }

    .login a:hover {
      text-decoration: underline;
    }

    .login > img {
      height: auto;
    }

    
.login__failure {
  border: solid;
  border-width : 1px;
  border-color: red;
  background-color: lightpink;
}

.login_failure_message {
  padding: 21px;
  margin:0;
}
.login_failure_message_header {
  padding: 21px;
  padding-bottom: 0px;
  margin:0;
  font-size:24px;
  color : red;
    text-align : center;
}
}
  `;

  



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const psswd = useRef();
  const username = useRef();
  let autherized = true;
  const [isAutherized , setIsAutherized] = useState(true)
  const authState = useSelector((state)=>state.auth.autherized)
  useEffect(()=>{
    if(authState === false) {
      setIsAutherized(false)
     }
  },[authState])

  console.log(isAutherized);

  const handleSubmit =  (event) => {
    event.preventDefault();
    try{

      const formData = {username : username.current.value ,password : psswd.current.value};
      dispatch(login(formData,navigate));
   // navigate("/user");

    if (psswd.current.value === "") {
      alert("the value is empty");
    } else {
      if (psswd.current.value === "1234" && username.current.value === "ags") {
        navigate("/user");
      } else {
        //alert("the password is not correct ");
      }
    }
  }catch(error){

  }
  };

  return (
    <SigninPage>
      <form className='login' onSubmit={handleSubmit}>
        <img src='/images/logo.png' alt='' srcSet='' />
        <input type='text' placeholder='User Name' ref={username}   autocomplete="on"/>
        <input type='password' placeholder='Password' ref={psswd}  autocomplete="on" />
        <input className='submit' type='submit' value='Log In'  autocomplete="on"/>
        
      </form>
      {!isAutherized && <div className="login__failure">
        <p className="login_failure_message_header">Login failed</p>
        <p className="login_failure_message">Wrong credentials or missing access rights to application</p>
        </div>}
    </SigninPage>
  );
}

export default LoginPage;