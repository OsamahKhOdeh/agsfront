import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/index.js";

const CheckProduct = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [isExists, setIsExists] = useState("init");
  const checkProduct = async (event) => {
    try {
      // const formData = { username: username.current.value, password: psswd.current.value };
      // dispatch(login(formData, navigate));
      console.log(serialNumber);
      await axios.post(`${BASE_URL}/warranty`, { serialnumber: serialNumber }).then(async (response) => {
        console.log(response.data);
        setIsExists(response.data);
        setSerialNumber("");
      });
    } catch (error) {}
  };
  return (
    <>
      {console.log(serialNumber)}
      <div className="ags-header checker-header">
        <div className="ags-header-deadline">
          <h1>AGS</h1>
        </div>
        {/* <div className="ags-header-switch">
        <span><i class="uil uil-angle-left"></i> Daily <i className="uil uil-angle-right"></i> </span>
      </div>
      <div className="ags-header-profile">
      <i className="uil uil-user-circle " id="navbarDropdown" role="button" data-toggle="dropdown"></i>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" > <i className="uil uil-user"></i> Hussen</a>
          <a className="dropdown-item"><i className="uil uil-sign-in-alt"></i> Logout</a>
        </div>
      </div> */}
      </div>
      <div className="checker-body">
        <div className="tittle">
          {/* <h4>Check Product</h4> */}
          <h4>تحقق من المنتج</h4>
        </div>
        <form>
          <div className="img-checker">
            <img src="./images/checker.jpeg" alt="checker-img" />
          </div>
          <div className="form-group">
            {/* <label htmlFor="check">Serial Number</label> */}
            <label htmlFor="check">الرقم التسلسلي</label>
            {/* <input type="text" className='form-control' ref={serialNumber} placeholder='Enter serial number'  /> */}
            <input
              type="text"
              className="form-control"
              value={serialNumber}
              onChange={(e) => {
                setSerialNumber(e.target.value);
                setIsExists("init");
              }}
              placeholder="إدخل الرقم التسلسلي "
            />
          </div>
          <div className="btn-checker">
            <button type="button" className="ags-btn-main-fill" disabled={serialNumber.length <= 2} onClick={checkProduct}>
              تحقق
            </button>
          </div>
        </form>
        <div className="result">
          {isExists === "exist" && (
            // <h1 className='success' ><i class="uil uil-check-circle"></i> This product is autheticated</h1>
            <h1 className="success">
              <i class="uil uil-check-circle"></i> هذا المنتج اصلي من شركة AGS international
            </h1>
          )}
          {isExists === "notexist" && (
            <h1 className="required">
              {" "}
              <i class="uil uil-times-circle"></i> هذا المنتج مقلد احذر استخدامه
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckProduct;
