import React, { useState } from "react";
import "./UpdateSupplier.scss";
import { emailValidation, phoneValidation } from "../../../helpers/Validations";
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export const products = [
  { label: "Batteries", value: "batteries" },
  { label: "Solar Panels", value: "solarPanels" },
  { label: "Inverters", value: "inverters" },
  { label: "Connectors", value: "connectors" },
  { label: "Chargers", value: "chargers" },
];

const UpdateSupplier = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [formData, setFormData] = useState({ ...state });
  const [file, setFile] = useState();
  const [bufferBank, setBufferBank] = useState({});
  const [indexEdit, setIndexEdit] = useState({});
  const [communicationMethods, setCommunicationMethods] = useState([
    { name: "Whatsapp", isSelected: formData.communicationMethod.includes("Whatsapp") ? true : false },
    { name: "Wechat", isSelected: formData.communicationMethod.includes("Wechat") ? true : false },
    { name: "Email", isSelected: formData.communicationMethod.includes("Email") ? true : false },
  ]);
  console.log("formData", formData);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
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
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountNumber: "",
    swiftBIC: "",
    currency: "USD",
  });
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
  const handleChangeBank = (event) => {
    const { name, value } = event.target;
    setBankInfo((prevFormData) => ({ ...prevFormData, [name]: value }));
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
    axios
      .put(`${BASE_URL}/supplier/${formData._id}`, formData)
      .then((response) => {
        // console.log(response.data);
        showToastMessage("Supplier Updated Succesfully", "success");
        setFormData(response.data);
        navigate("/user/suppliers");
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const addBank = () => {
    formData.bankAccount.push(bankInfo);
    console.log(formData);
    setFormData((prevFormData) => ({ ...prevFormData, bankAccount: formData.bankAccount }));
    resetFrom(true);
  };
  const resetFrom = (isBank) => {
    if (isBank) {
      setBankInfo({
        bankName: "",
        accountNumber: "",
        swiftBIC: "",
        currency: "USD",
      });
    } else {
      setFormData({
        supplierName: "",
        contactPerson: "",
        contactPhone: "",
        contactEmail: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        productCategories: "",
        paymentTerms: "",
        taxID: "",
        website: "",
        logo: "",
        communicationMethod: "Whatsapp",
        cashBackTerms: {},
        bankAccount: [],
        notes: "",
      });
    }
  };
  const validate = () => {
    if (
      !noValidEmail &&
      !noValidPhone &&
      (formData.supplierName !== "") &
        (formData.contactPerson !== "") &
        (formData.contactPhone !== "") &
        (formData.contactEmail !== "") &
        (formData.address !== "") &
        (formData.city !== "") &
        (formData.country !== "") &
        (formData.productCategories.length > 0) &
        (formData.communicationMethod.length > 0) &
        (formData.paymentTerms !== "") &
        // (formData.taxID !== "") &
        // (formData.logo !== "") &
        (formData.bankAccount.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleChangeBankUpdate = (event) => {
    const { name, value } = event.target;
    setBufferBank((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const deleteBank = () => {
    let updateBanks = [...formData.bankAccount];
    let index = updateBanks.findIndex((b) => b.bankName === bufferBank.bankName);
    updateBanks.splice(index, 1);
    console.log(updateBanks);
    setFormData((prevFormData) => ({ ...prevFormData, bankAccount: updateBanks }));
  };
  const updateBankInformation = () => {
    formData.bankAccount[indexEdit] = bufferBank;
    setFormData((prevFormData) => ({ ...prevFormData, bankAccount: formData.bankAccount }));
    console.log(formData.bankAccount);
  };
  const saveIndex = (bank) => {
    let index = formData.bankAccount.findIndex((b) => b.bankName === bank.bankName);
    console.log(index);
    setIndexEdit(index);
    setBufferBank(bank);
  };
  const handleChangeProducts = (choice) => {
    let bufferProducts = choice.map(function (item) {
      return item["label"];
    });
    setFormData((prevFormData) => ({ ...prevFormData, productCategories: bufferProducts }));
    console.log("");
  };
  const handleChangeCommunication = (event) => {
    let index = communicationMethods.findIndex((c) => c.name === event.target.defaultValue);
    communicationMethods[index].isSelected = event.target.checked;
    formData.communicationMethod.forEach((key, i) => (formData.communicationMethod[key] = communicationMethods[i].name));
    // for (let index = 0; index < communicationMethods.length; index++) {
    //   for (let j = 0; index < formData.communicationMethod.length; j++) {
    //     communicationMethods[index].isSelected = communicationMethods[index].name === formData.communicationMethod[j] ? true : false;
    //   }
    // }
    console.log(communicationMethods);
    let bufferMethods = communicationMethods
      .filter((c) => c.isSelected === true)
      .map(function (item) {
        return item["name"];
      });
    console.log(bufferMethods);
    setFormData((prevFormData) => ({ ...prevFormData, communicationMethod: bufferMethods }));
  };
  return (
    <>
      <ToastContainer />
      <div className="container supplier">
        <div className="card">
          <div class="card-header">
            <div class="tittle-card tittle-back">
              <div className="btn-back" onClick={() => navigate("/user/suppliers")}>
                <i class="uil uil-arrow-circle-left"></i>
              </div>
              <p> Update Supplier </p>
            </div>
          </div>
          <div className="card-body">
            <form>
              {/* main information */}
              <div className="mian-info">
                <div className="tittle-section">
                  <h6>Primary Information</h6>
                </div>
                <div className="wrapper-supplier">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        Supplier Name <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="supplierName" value={formData.supplierName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
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
                      <label htmlFor="supplier_name">
                        Contact Person <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
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
                      <label htmlFor="supplier_name">
                        Address <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="address" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        Country <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="country" value={formData.country} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        City <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="city" value={formData.city} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">Postal Code</label>
                      <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        Product Categories <span className="required">*</span>
                      </label>
                      {/* <select class="form-select" required name="productCategories" value={formData.productCategories} onChange={handleChange}>
                        <option selected>Select Category</option>
                        <option value="Battaries">Battaries</option>
                        <option value="SolarPanels">Solar Panels</option>
                        <option value="Inverters">Inverters</option>
                      </select> */}
                      <CreatableSelect
                        isMulti
                        options={products}
                        // onChange={onOptionsChanged}
                        onChange={(choice) => handleChangeProducts(choice)}
                        components={animatedComponents}
                        defaultValue={products.filter((element) => formData.productCategories.includes(element.label))}
                        placeholder="New Option(Type something and press enter...)"
                      />
                      {/* <button
                        type="button"
                        onClick={() => {
                          console.log(products.filter((element) => formData.productCategories.includes(element.label)));
                          console.log(products);
                          console.log(formData.productCategories);
                        }}
                      >
                        console
                      </button> */}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">Website</label>
                      <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">Logo</label>
                      <div class="input-group ">
                        <input type="file" class="form-control" id="inputGroupFile02" onChange={handleFileChange} />
                        <label class="input-group-text btn-upload" onClick={handleUpload}>
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        Communication Method <span className="required">*</span>
                      </label>
                      <div className="communication">
                        <FormGroup>
                          {communicationMethods.map((item, index) => (
                            <>
                              <FormControlLabel
                                value={item.name}
                                checked={formData.communicationMethod.includes(item.name)}
                                onChange={handleChangeCommunication}
                                control={<Checkbox />}
                                label={item.name}
                              />
                            </>
                          ))}
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-12">
                <div className="form-group">
                  <label htmlFor="supplier_name">Supplier Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="form-group">
                  <label htmlFor="supplier_name">Supplier Name</label>
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
              <div className="wrapper-supplier">
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="supplier_name">Address</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="supplier_name">Country</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="supplier_name">City</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="form-group">
                    <label htmlFor="supplier_name">Postal Code</label>
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
                <div className="wrapper-supplier-second">
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">Tax Id</label>
                      <input type="text" className="form-control" name="taxID" value={formData.taxID} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label htmlFor="supplier_name">
                        Payment Terms <span className="required">*</span>
                      </label>
                      <input type="text" className="form-control" required name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="banks">
                      <div className="bank-tittle">
                        <label className="pb-0" htmlFor="account">
                          Bank Account <span className="required">*</span>
                        </label>
                        <span>
                          {/* <i class="uil uil-minus-circle" onClick={deleteBank}></i> */}
                          <i class="uil uil-plus-circle" data-toggle="modal" data-target="#exampleModal"></i>
                        </span>
                      </div>
                      {formData.bankAccount.length > 0 && (
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Account Number</th>
                              <th scope="col">Bank Name </th>
                              <th scope="col">Swift BIC</th>
                              <th scope="col">Currency</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.bankAccount.map((item, index) => (
                              <tr>
                                <td>{item.accountNumber}</td>
                                <td>{item.bankName}</td>
                                <td>{item.swiftBIC}</td>
                                <td>{item.currency}</td>
                                <td>
                                  <div className="btn-actions">
                                    <i class="uil uil-edit-alt " onClick={() => saveIndex(item)} data-toggle="modal" data-target="#exampleModal3"></i>
                                    <i class="uil uil-trash-alt " onClick={() => setBufferBank(item)} data-toggle="modal" data-target="#exampleModal1"></i>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {formData.bankAccount.length <= 0 && (
                        <div className="no-banks">
                          <i class="uil uil-credit-card"></i>
                          <p> No Banks Added Yet!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="form-group">
                      <label className="px-0" htmlFor="notes">
                        Notes
                      </label>
                      <textarea type="text" rows="4" className="from-control" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-btn-supplier">
                <button type="button" disabled={!validate()} className="ags-btn-main-fill" onClick={handleSubmit}>
                  Update Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                New Bank
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <div className="row"> */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Bank Name </label>
                  <input type="text" className="form-control" name="bankName" value={bankInfo.bankName} onChange={handleChangeBank} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="bankName">Bank Number </label>
                  <input type="text" className="form-control" name="accountNumber" value={bankInfo.accountNumber} onChange={handleChangeBank} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Swift BIC </label>
                  <input type="text" className="form-control" name="swiftBIC" value={bankInfo.swiftBIC} onChange={handleChangeBank} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Currency </label>
                  <select class="form-select" name="currency" value={bankInfo.currency} onChange={handleChangeBank}>
                    <option selected>Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                    <option value="RMB">RMB</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div class="modal-footer">
              <button type="button" onClick={addBank} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Add Bank
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Bank */}
      <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Bank
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {/* <div className="row"> */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Bank Name </label>
                  <input type="text" className="form-control" name="bankName" value={bufferBank.bankName} onChange={handleChangeBankUpdate} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="bankName">Bank Number </label>
                  <input type="text" className="form-control" name="accountNumber" value={bufferBank.accountNumber} onChange={handleChangeBankUpdate} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Swift BIC </label>
                  <input type="text" className="form-control" name="swiftBIC" value={bufferBank.swiftBIC} onChange={handleChangeBankUpdate} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="banmNmake">Currency </label>
                  <select class="form-select" name="currency" value={bufferBank.currency} onChange={handleChangeBankUpdate}>
                    <option selected>Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                    <option value="RMB">RMB</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div class="modal-footer">
              <button type="button" onClick={updateBankInformation} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Update Bank
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Bank */}
      <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete {bufferBank.bankName}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to delete bank </p>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={() => deleteBank()} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSupplier;
