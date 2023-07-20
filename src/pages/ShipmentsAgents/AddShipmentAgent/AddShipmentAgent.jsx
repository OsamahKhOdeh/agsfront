import React from "react";
import { emailValidation } from "../../../helpers/Validations";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import "./AddShipmentAgent.scss";
import { showToastMessage } from "../../../helpers/toaster";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const communicationMethods = [
  { name: "Whatsapp", isSelected: false },
  { name: "Wechat", isSelected: false },
  { name: "Email", isSelected: false },
];
const AddShipmentAgent = () => {
  const handleChangeCommunication = (event) => {
    let index = communicationMethods.findIndex((c) => c.name === event.target.defaultValue);
    communicationMethods[index].isSelected = event.target.checked;
    let bufferMethods = communicationMethods
      .filter((c) => c.isSelected === true)
      .map(function (item) {
        return item["name"];
      });
    setFormData((prevFormData) => ({ ...prevFormData, communicationMethod: bufferMethods }));
    console.log(formData.communicationMethod);
  };
  const [formData, setFormData] = useState({
    name: "",
    image: "https://placehold.co/150x150",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    website: "",
    contact: [],
    services: [],
    notes: "",
    openFrom: "",
    openTo: "",
  });
  const navigate = useNavigate();
  const [noValidEmail, showNoValidEmail] = useState(false);
  // const [contactValidEmail, showContactValidEmail] = useState(false);
  const [file, setFile] = useState();
  const [bufferContact, setBufferContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [service, setService] = useState({
    serviceName: "",
    serviceCost: "",
  });
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "Whatsapp", isSelected: false },
    { name: "Wechat", isSelected: false },
    { name: "Email", isSelected: false },
  ]);
  const [buffService, setBuffService] = useState({});
  const [modelContact, setModelContact] = useState({
    contactPersonName: "",
    phone: "",
    officePhone: "",
    email: "",
    position: "",
  });
  const validateEmail = (e) => {
    if (emailValidation(e.target?.value)) {
      showNoValidEmail(false);
      // setInput(e.target.value);
    } else {
      showNoValidEmail(true);
    }
  };
  // const validatePhone = (e) => {
  //   console.log(e.target?.value);
  //   if (phoneValidation(e.target?.value)) {
  //     showNoValidPhone(false);
  //     // setInput(e.target.value);
  //   } else {
  //     showNoValidPhone(true);
  //   }
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = () => {
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
      website: formData.website,
      notes: formData.notes,
      services: services,
      operatingHours: {
        from: formData.openFrom,
        to: formData.openTo,
      },
    };
    console.log(model);
    axios
      .post(`${BASE_URL}/shipping-agent`, model)
      .then((response) => {
        // console.log(response.data);
        showToastMessage("Shipment Agent Added Successfully", "success");
        resetFrom(false);
        setServices([]);
        setContacts([]);
        navigate("/user/shippingAgents");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
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
        contactPersonName: "",
        contactPhone: "",
        officePhone: "",
        contactEmail: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        etd: "",
        transitTime: "",
        website: "",
        costPerContainer: "",
        communicationMethod: [],
        freeStorageDuration: "",
        availableContainerCount: "",
        notes: "",
      });
    }
  };
  const validate = () => {
    if ((formData.name !== "") & (formData.country !== "") & (contacts.length > 0)) {
      return true;
    } else {
      return false;
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
  const handleChangeContact = (event) => {
    const { name, value } = event.target;
    setModelContact((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleChangeContactService = (event) => {
    const { name, value } = event.target;
    setService((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const deleteContact = () => {
    let updateContacts = [...contacts];
    let index = updateContacts.findIndex((b) => b.email === bufferContact.email);
    console.log(index);
    updateContacts.splice(index, 1);
    setContacts(updateContacts);
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
  const addService = () => {
    const updatedServices = [...services];
    console.log(service);
    updatedServices.push(service);
    setServices(updatedServices);
    setService({
      serviceName: "",
      serviceCost: "",
    });
  };
  const deleteService = () => {
    let updateServices = [...services];
    let index = updateServices.findIndex((b) => b.serviceName === buffService.serviceName);
    console.log(index);
    updateServices.splice(index, 1);
    setServices(updateServices);
  };
  return (
    <>
      <ToastContainer />
      <div className="container forwarder">
        <div className="card">
          <div class="card-header">
            <div class="tittle-card tittle-back">
              <div className="btn-back" onClick={() => navigate("/user/shippingAgents")}>
                <i class="uil uil-arrow-circle-left"></i>
              </div>
              <p> Add Shipping Agent </p>
            </div>
          </div>
          <div className="card-body">
            <form>
              {/* main information */}
              <div className="mian-info mt-2">
                {/* <div className="tittle-section">
                  <h6>Primary Information</h6>
                </div> */}
                <div className="wrapper-forwarder">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_name">
                        Shipping Agent Name <span className="required">*</span>
                      </label>
                      <input type="text" id="shipmentAgent_name" className="form-control" required name="name" value={formData.name} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_country">
                        Country <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" id="shipmentAgent_country" required name="country" value={formData.country} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_city">City</label>
                      <input type="text" className="form-control" id="shipmentAgent_city" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_state">State</label>
                      <input type="text" className="form-control" id="shipmentAgent_state" name="state" value={formData.state} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_street">Street</label>
                      <input type="text" className="form-control" id="shipmentAgent_street" name="street" value={formData.street} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_postal">Postal Code</label>
                      <input type="text" className="form-control" id="shipmentAgent_postal" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_website">Website</label>
                      <input type="text" className="form-control" id="shipmentAgent_website" name="website" value={formData.website} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_open">Open From </label>
                      <input type="time" className="form-control" id="shipmentAgent_open" name="openFrom" value={formData.openFrom} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="shipmentAgent_to">Open To </label>
                      <input type="time" className="form-control" id="shipmentAgent_to" name="openTo" value={formData.openTo} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">Logo</label>
                      <div class="input-group ">
                        <input type="file" class="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label className="px-0" htmlFor="notes">
                        Notes
                      </label>
                      <input type="text" className="form-control" name="notes" value={formData.notes} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              {/* address information */}
              <div className="additional-info">
                {/* <div className="tittle-section">
                  <h6>Additional Information</h6>
                </div> */}
                <div className="wrapper-agent-second">
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
                  <div className="col-12 contact-row">
                    <div className="banks">
                      <div className="bank-tittle">
                        <label className="pb-0" htmlFor="account">
                          Services
                        </label>
                        <span>
                          {/* <i class="uil uil-minus-circle" onClick={deleteBank}></i> */}
                          <i class="uil uil-plus-circle" data-toggle="modal" data-target="#addServiceModal"></i>
                        </span>
                      </div>
                      {services.length > 0 && (
                        <table class="table mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Service Name</th>
                              <th scope="col">Price </th>
                              <th scope="col">Actions </th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((service, index) => (
                              <tr>
                                <td>{service.serviceName}</td>
                                <td>{service.serviceCost}</td>
                                <td>
                                  <div className="btn-actions">
                                    <i class="uil uil-trash-alt " onClick={() => setBuffService(service)} data-toggle="modal" data-target="#deleteServiceModal"></i>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {services.length <= 0 && (
                        <div className="no-banks">
                          <i class="uil uil-credit-card"></i>
                          <p> No Services Added Yet!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-btn-forwarder">
                <button type="button" disabled={!validate()} className="ags-btn-main-fill" onClick={handleSubmit}>
                  Add Shipping Agent
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
                  <label htmlFor="contactPersonName"> Contact Name</label>
                  <input type="text" className="form-control" name="contactPersonName" value={modelContact.contactPersonName} onChange={handleChangeContact} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="contactEmail">
                    Contact Email <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" name="email" onInput={(e) => validateEmail(e)} value={modelContact.email} onChange={handleChangeContact} />
                </div>
                {noValidEmail && <span className="required">Email not valid</span>}
              </div>
              <div className="col-12">
                <div className="form-group">
                  {" "}
                  <label htmlFor="contactPersonName">Contact Phone </label>
                  <input type="text" className="form-control" name="phone" value={modelContact.phone} onChange={handleChangeContact} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  {" "}
                  <label htmlFor="officePhone">Office Phone </label>
                  <input type="text" className="form-control" name="officePhone" value={modelContact.officePhone} onChange={handleChangeContact} />
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
      {/* Add Service */}
      <div class="modal fade" id="addServiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New Service
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
                  <label htmlFor="contactPersonName"> Service Name </label>
                  <input type="text" className="form-control" name="serviceName" value={service.serviceName} onChange={handleChangeContactService} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  {" "}
                  <label htmlFor="officePhone">Service Price </label>
                  <input type="text" className="form-control" name="serviceCost" value={service.serviceCost} onChange={handleChangeContactService} />
                </div>
              </div>
            </div>
            {/* </div> */}
            <div class="modal-footer">
              <button type="button" onClick={addService} disabled={service.serviceName === "" || service.serviceCost === ""} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Add Service
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Service */}
      <div class="modal fade" id="deleteServiceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete {buffService.serviceName}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete {buffService.serviceName} </p>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={() => deleteService()} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddShipmentAgent;
