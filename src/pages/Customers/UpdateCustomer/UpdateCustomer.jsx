import React from "react";
import { FormGroup, ToastContainer } from "react-bootstrap";
import "./UpdateCustomer.scss";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { emailValidation, phoneValidation } from "../../../helpers/Validations";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
const UpdateCustomer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const [noValidEmail, showNoValidEmail] = useState(false);
  const [noValidPhone, showNoValidPhone] = useState(false);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    name: state.name,
    image: state.image,
    contact: state.contact,
    street: state.address.street,
    city: state.address.city,
    state: state.address.state,
    country: state.address.country,
    postalCode: state.address.postalCode,
    communicationMethod: state.communicationMethod,
    // notes: state.notes,
  });
  const [bufferContact, setBufferContact] = useState({});
  const [contacts, setContacts] = useState(state.contact);
  const [modelContact, setModelContact] = useState({
    contactPersonName: "",
    phone: "",
    officePhone: "",
    email: "",
    position: "",
  });
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "Whatsapp", isSelected: formData.communicationMethod.includes("Whatsapp") ? true : false },
    { name: "Wechat", isSelected: formData.communicationMethod.includes("Wechat") ? true : false },
    { name: "Email", isSelected: formData.communicationMethod.includes("Email") ? true : false },
  ]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const validate = () => {
    if (formData.name !== "") {
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
    let model = {
      name: formData.name,
      image: formData.image,
      contact: contacts,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      // notes: formData.notes,
    };
    axios
      .post(`${BASE_URL}/customer`, model)
      .then((response) => {
        // console.log(response.data);
        showToastMessage("Customer Updated Successfully", "success");
        resetFrom(false);
        setContacts([]);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
    console.log(model);
  };
  const resetFrom = (isContact) => {
    if (isContact) {
      setModelContact({
        contactPersonName: "",
        phone: "",
        officePhone: "",
        email: "",
        position: "",
      });
    } else {
      setFormData({
        name: "",
        image: "https://placehold.co/150x150",
        contact: [],
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
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
  const handleChangeContact = (event) => {
    const { name, value } = event.target;
    setModelContact((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const addContact = () => {
    console.log(modelContact);
    const updatedContacts = [...contacts];
    updatedContacts.push(modelContact);
    setContacts(updatedContacts);
    console.log(contacts);
    resetFrom(true);
    showNoValidEmail(false);
  };
  const deleteContact = () => {
    let updateContacts = [...contacts];
    let index = updateContacts.findIndex((b) => b.email === bufferContact.email);
    console.log(index);
    updateContacts.splice(index, 1);
    setContacts(updateContacts);
  };
  const handleChangeCommunication = (event) => {
    let index = communicationMethods.findIndex((c) => c.name === event.target.defaultValue);
    communicationMethods[index].isSelected = event.target.checked;
    formData.communicationMethod.forEach((key, i) => (formData.communicationMethod[key] = communicationMethods[i].name));
    let bufferMethods = communicationMethods
      .filter((c) => c.isSelected === true)
      .map(function (item) {
        return item["name"];
      });
    console.log(bufferMethods);
    setFormData((prevFormData) => ({ ...prevFormData, communicationMethod: bufferMethods }));
  };
  return (
    <div>
      <>
        <ToastContainer />
        <div className="container customer">
          <div className="card">
            <div class="card-header">
              <div class="tittle-card tittle-back">
                <div className="btn-back" onClick={() => navigate("/user/customers")}>
                  <i class="uil uil-arrow-circle-left"></i>
                </div>
                <p> Update Customer </p>
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
                    {/* <div className="col-lg-4 col-md-12">
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
                    </div> */}
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
                        <label htmlFor="supplier_name">Image </label>
                        <div class="input-group ">
                          <input type="file" class="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                          {/* <label class="input-group-text btn-upload" onClick={handleUpload}>
                            Upload
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">Website</label>
                        <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="forwarder_name">
                          Communication Method <span className="required">*</span>
                        </label>
                        <div className="communication">
                          <FormGroup>
                            {communicationMethods.map((item, index) => (
                              <>
                                <FormControlLabel value={item.name} onChange={handleChangeCommunication} control={<Checkbox />} label={item.name} />
                              </>
                            ))}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-12">
                      <div className="form-group">
                        <label htmlFor="customer_name">Notes</label>
                        <input type="text" className="form-control" name="notes" value={formData.notes} onChange={handleChange} />
                      </div>
                    </div> */}
                    <div className="col-12 contact-row">
                      <div className="banks">
                        <div className="bank-tittle">
                          <label className="pb-0" htmlFor="account">
                            Contact <span className="required">*</span>
                          </label>
                          <span>
                            {/* <i class="uil uil-minus-circle" onClick={deleteBank}></i> */}
                            <i class="uil uil-plus-circle" data-toggle="modal" data-target="#exampleModal"></i>
                          </span>
                        </div>
                        {contacts.length > 0 && (
                          <table class="table mb-0">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone </th>
                                <th scope="col">Office Phone</th>
                                <th scope="col">Contact Email</th>
                                <th scope="col">Position</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contacts.map((item, index) => (
                                <tr>
                                  <td>{item.contactPersonName}</td>
                                  <td>{item.phone}</td>
                                  <td>{item.officePhone}</td>
                                  <td>{item.email}</td>
                                  <td>{item.position}</td>
                                  <td>
                                    <div className="btn-actions">
                                      {/* <i class="uil uil-edit-alt " onClick={() => saveIndex(item)} data-toggle="modal" data-target="#exampleModal3"></i> */}
                                      <i class="uil uil-trash-alt " onClick={() => setBufferContact(item)} data-toggle="modal" data-target="#exampleModal1"></i>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {contacts.length <= 0 && (
                          <div className="no-banks">
                            <i class="uil uil-credit-card"></i>
                            <p> No Contacts Added Yet!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-btn-customer">
                  <button type="button" disabled={!validate()} className="ags-btn-main-fill" onClick={handleSubmit}>
                    Update customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Add Contact */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  New Contact
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {/* <div className="row"> */}
                <div className="col-12">
                  <div className="form-group">
                    {" "}
                    <label htmlFor="contactPersonName"> Contact Name </label>
                    <input type="text" className="form-control" name="contactPersonName" value={modelContact.contactPersonName} onChange={handleChangeContact} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email </label>
                    <input type="text" className="form-control" name="email" onInput={(e) => validateEmail(e)} value={modelContact.email} onChange={handleChangeContact} />
                  </div>
                  {noValidEmail && <span className="required">Email not valid</span>}
                </div>
                <div className="col-12">
                  <div className="form-group">
                    {" "}
                    <label htmlFor="contactPersonName">Contact Phone </label>
                    <input type="text" className="form-control" name="officePhone" value={modelContact.officePhone} onChange={handleChangeContact} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    {" "}
                    <label htmlFor="officePhone">Office Phone </label>
                    <input type="text" className="form-control" name="phone" value={modelContact.phone} onChange={handleChangeContact} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    {" "}
                    <label htmlFor="officePhone">Position </label>
                    <input type="text" className="form-control" name="position" value={modelContact.position} onChange={handleChangeContact} />
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div class="modal-footer">
                <button type="button" onClick={addContact} disabled={noValidEmail || modelContact.email === ""} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Contact */}
        <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Delete {bufferContact.contactPersonName}
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <p className="mt-3">Are you sure to delete {bufferContact.contactPersonName} </p>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={() => deleteContact()} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default UpdateCustomer;
