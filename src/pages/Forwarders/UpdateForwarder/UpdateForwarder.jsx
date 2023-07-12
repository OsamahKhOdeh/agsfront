import React from "react";
import "./UpdateForwarder.scss";
import { emailValidation, phoneValidation } from "../../../helpers/Validations";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const UpdateForwarder = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(state);
  const [noValidEmail, showNoValidEmail] = useState(false);
  const [noValidPhone, showNoValidPhone] = useState(false);
  const validateEmail = (e) => {
    if (emailValidation(e.target?.value)) {
      showNoValidEmail(false);
      // setInput(e.target.value);
    } else {
      showNoValidEmail(true);
    }
  };
  const validatePhone = (e) => {
    console.log(e.target?.value);
    if (phoneValidation(e.target?.value)) {
      showNoValidPhone(false);
      // setInput(e.target.value);
    } else {
      showNoValidPhone(true);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = () => {
    const formDataBuff = new FormData();
    // formDataBuff.append("forwarderName", formData.forwarderName);
    // formDataBuff.append("contactPerson", formData.contactPerson);
    // formDataBuff.append("contactPhone", formData.contactPhone);
    // formDataBuff.append("contactEmail", formData.contactEmail);
    // formDataBuff.append("address", formData.address);
    // formDataBuff.append("city", formData.city);
    // formDataBuff.append("country", formData.country);
    // formDataBuff.append("postalCode", formData.postalCode);
    // formDataBuff.append("productCategories", formData.productCategories);
    // formDataBuff.append("taxID", formData.taxID);
    // formDataBuff.append("logo", "file");
    // formDataBuff.append("website", formData.website);
    // formDataBuff.append("paymentTerms", formData.paymentTerms);
    // formDataBuff.append("communicationMethod", formData.communicationMethod);
    // formDataBuff.append("cashBackTerms", {});
    // formDataBuff.append("notes", formData.notes);
    // formDataBuff.append("bankAccount", formData.bankAccount);
    axios
      .put(`${BASE_URL}/forwarder/${formData._id}`, formData)
      .then((response) => {
        // console.log(response.data);
        showToastMessage("Forwarder Updated Succesfully", "success");
        setFormData(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const validate = () => {
    if (
      !noValidEmail &&
      !noValidPhone &&
      (formData.forwarderName !== "") &
        (formData.contactPerson !== "") &
        (formData.contactPhone !== "") &
        (formData.contactEmail !== "") &
        (formData.etd !== "") &
        (formData.transitTime !== "") &
        (formData.country !== "") &
        (formData.costPerContainer !== "") &
        (formData.communicationMethod !== "") &
        (formData.freeStorageDuration !== "") &
        (formData.availableContainerCount !== "")
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container forwarder">
        <div className="card">
          <div class="card-header">
            <div class="tittle-card">
              <p> Update Forwarder </p>
            </div>
          </div>
          <div className="card-body">
            <form>
              {/* main information */}
              <div className="mian-info">
                <div className="tittle-section">
                  <h6>Primary Information</h6>
                </div>
                <div className="wrapper-forwarder">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Forwarder Name <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="forwarderName" value={formData.forwarderName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Contact Email <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="contactEmail"
                        value={formData.contactEmail}
                        onInput={(e) => validateEmail(e)}
                        onChange={handleChange}
                      />
                    </div>
                    {noValidEmail && <span className="required">Email not valid</span>}
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Contact Person <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Contact Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactPhone"
                        required
                        value={formData.contactPhone}
                        maxLength={10}
                        onChange={handleChange}
                        onInput={(e) => validatePhone(e)}
                      />
                      {noValidPhone && <span className="required">Phone must be only numbers</span>}
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Address <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="address" value={formData.address} onChange={handleChange} />
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Country <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="country" value={formData.country} onChange={handleChange} />
                    </div>
                  </div>

                  {/* <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Etd <span className="required">*</span>
                      </label>
                      <select class="form-select" required name="productCategories" value={formData.productCategories} onChange={handleChange}>
                        <option selected>Select Category</option>
                        <option value="Battaries">Battaries</option>
                        <option value="SolarPanels">Solar Panels</option>
                        <option value="Inverters">Inverters</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">Website</label>
                      <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Communication Method <span className="required">*</span>
                      </label>
                      <div className="communication">
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="communicationMethod"
                          value={formData.communicationMethod}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="Whatsapp" control={<Radio />} label="Whatsapp" />
                          <FormControlLabel value="Wechat" control={<Radio />} label="Wechat" />
                          <FormControlLabel value="Email" control={<Radio />} label="Email" />
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-12">
                <div className="form-group">
                  <label htmlFor="forwarder_name">forwarder Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="form-group">
                  <label htmlFor="forwarder_name">forwarder Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div> */}
                </div>
              </div>
              {/* address information */}
              {/* <div className="address-info">
              <div className="tittle-section">
                <h6>Address Information</h6>
              </div>
              <div className="wrapper-forwarder">
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="forwarder_name">Address</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="forwarder_name">Country</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="forwarder_name">City</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="forwarder_name">Postal Code</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div> */}
              {/* address information */}
              <div className="additional-info">
                <div className="tittle-section">
                  <h6>Additional Information</h6>
                </div>
                <div className="wrapper-forwarder-second">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Free Storage Duration <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="freeStorageDuration" value={formData.freeStorageDuration} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Etd <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="etd" value={formData.etd} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Transit Time <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="transitTime" value={formData.transitTime} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Available Container Count <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="availableContainerCount" value={formData.availableContainerCount} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="forwarder_name">
                        Cost per Container <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="costPerContainer" value={formData.costPerContainer} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label className="px-0" htmlFor="notes">
                        Notes
                      </label>
                      <input type="text" className="from-control" name="notes" value={formData.notes} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-btn-forwarder">
                <button type="button" disabled={!validate()} className="ags-btn-main-fill" onClick={handleSubmit}>
                  Update Forwarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateForwarder;
