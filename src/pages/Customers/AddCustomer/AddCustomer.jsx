import React from "react";
import "./AddCustomer.scss";
import { ToastContainer } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { emailValidation, phoneValidation } from "../../../helpers/Validations";
const AddCustomer = () => {
  const [noValidEmail, showNoValidEmail] = useState(false);
  const [noValidPhone, showNoValidPhone] = useState(false);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    name: "",
    image: "https://placehold.co/150x150",
    contact: [],
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const validate = () => {
    if ((formData.name !== "") & (formData.contact.length > 0)) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = () => {
    const formDataBuff = new FormData();
    // formDataBuff.append("supplierName", formData.supplierName);
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
    // axios
    //   .post(`${BASE_URL}/customer`, formData)
    //   .then((response) => {
    //     // console.log(response.data);
    //     showToastMessage("Customer Added Succesfully", "success");
    //     resetFrom(false);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error(error);
    //   });
    console.log(formData);
  };
  const resetFrom = (isBank) => {
    if (isBank) {
      // setBankInfo({
      //   bankName: "",
      //   accountNumber: "",
      //   swiftBIC: "",
      //   currency: "USD",
      // });
    } else {
      setFormData({
        name: "",
        image: "https://placehold.co/150x150",
        contact: [],
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
        },
      });
    }
  };
  const validateEmail = (e) => {
    if (emailValidation(e.target?.value)) {
      showNoValidEmail(false);
      // setInput(e.target.value);
    } else {
      showNoValidEmail(true);
    }
  };
  const validatePhone = (e) => {
    if (phoneValidation(e.target?.value)) {
      showNoValidPhone(false);
      // setInput(e.target.value);
    } else {
      showNoValidPhone(true);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setFormData((prevFormData) => ({ ...prevFormData, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const handleUpload = async () => {
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "jix4eghn");
    const response = await axios.post("https://api.cloudinary.com/v1_1/dvfuxrg12/image/upload", data);
    console.log(response.data.secure_url);
    setFormData((prevFormData) => ({ ...prevFormData, logo: response.data.secure_url }));
    console.log(formData);
    showToastMessage("Image Uploaded Succesfully", "success");
  };
  return (
    <div>
      <>
        <ToastContainer />
        <div className="container customer">
          <div className="card">
            <div class="card-header">
              <div class="tittle-card tittle-back">
                <div className="btn-back">
                  <i class="uil uil-arrow-circle-left"></i>
                </div>
                <p> Add Customer </p>
              </div>
            </div>
            <div className="card-body">
              <form>
                {/* main information */}
                <div className="mian-info">
                  <div className="tittle-section">
                    <h6>Primary Information</h6>
                  </div>
                  <div className="wrapper-customer">
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          Customer Name <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="name" value={formData.name} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
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
                        <label htmlFor="customer_name">
                          Contact Person <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          Contact Phone <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactPhone"
                          required
                          value={formData.contactPhone}
                          onChange={handleChange}
                          onInput={(e) => validatePhone(e)}
                        />
                        {noValidPhone && <span className="required">Phone must be only numbers</span>}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          Country <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="country" value={formData.country} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          City <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="city" value={formData.city} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          Street <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="street" value={formData.street} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">
                          State <span className="required">*</span>
                        </label>
                        <input type="text" className="form-control" required name="state" value={formData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">Postal Code</label>
                        <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="supplier_name">Logo</label>
                        <div class="input-group ">
                          <input type="file" class="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                          {/* <label class="input-group-text btn-upload" onClick={handleUpload}>
                            Upload
                          </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-btn-customer">
                  <button type="button" disabled={!validate()} className="ags-btn-main-fill" onClick={handleSubmit}>
                    Add customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddCustomer;
