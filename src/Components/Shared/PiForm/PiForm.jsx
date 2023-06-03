import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateProformaInvoice } from "../../../actions/proformaInvoice";
import "./styles.css";
import Modal from "react-modal";
import { bank_details } from "../../Invoice/data";
import { exporters, notify_partys } from "../../../data/invoice-data";
import Products from "./Products/Products";

const PiForm = ({ oldPi }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showToastMessage = () => {
    toast.success("Proforma Inovice updated Succesfully ✅", {
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

  const [inputs, setInputs] = useState(oldPi ? oldPi : {});
  console.log(inputs);

  const dispatch = useDispatch();
  const location = inputs?.location;
  const currency = inputs?.currency;
  function calcPrice(item) {
    let price = 0;
    if (location === "freezone" && currency === "AED") {
      price = item.freezonePriceAED;
    }
    if (location === "local" && currency === "AED") {
      price = item.LocalPriceAED;
    }
    if (location === "freezone" && currency === "USD") {
      price = item.freezonePrice;
    }
    if (location === "local" && currency === "USD") {
      price = item.LocalPrice;
    }

    return price;
  }
  let total = 0;

  function calcTotal() {
    inputs.products?.map((product) => {
      total += calcPrice(product) * product.qty;
    });
  }
  calcTotal();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChangeCurrency = (event) => {
    const value = event.target.value;
    const updatedProducts = inputs.products.map((product) => ({
      ...product,
      freezonePrice: 0,
      freezonePriceAED: 0,
      LocalPrice: 0,
      LocalPriceAED: 0,
      price: 0,
    }));

    setInputs((values) => ({ ...values, currency: value, products: updatedProducts }));
  };

  const handleBankDetailsChange = (e) => {
    const { value, checked } = e.target;
    console.log({ value, checked });
    if (checked) {
      let newBankDetails = [...inputs.bankDetails];
      newBankDetails.push(value);
      setInputs((values) => ({ ...values, bankDetails: newBankDetails }));
    } else {
      setInputs((values) => ({ ...values, bankDetails: inputs.bankDetails.filter((e) => e !== value) }));
    }
  };
  const handleProductQtyChange = (event, id) => {
    const name = event.target.name;
    const value = event.target.value;
    let theproducts = [...inputs.products];
    const theProduct = theproducts.filter((product) => product._id === id)[0];
    const index = theproducts.indexOf(theProduct);
    let clonePro = { ...theproducts[index] };
    clonePro.qty = parseInt(value);
    theproducts[index] = clonePro;
    setInputs((values) => ({ ...values, products: theproducts }));
    console.log(inputs);
  };

  const handleProductPriceChange = (event, id) => {
    const name = event.target.name;
    const value = event.target.value;
    let theproducts = [...inputs.products];
    const theProduct = theproducts.filter((product) => product._id === id)[0];
    const index = theproducts.indexOf(theProduct);
    let clonePro = { ...theproducts[index] };

    if (location === "freezone" && currency === "AED") {
      clonePro.freezonePriceAED = parseFloat(value);
    }
    if (location === "local" && currency === "AED") {
      clonePro.LocalPriceAED = parseFloat(value);
    }
    if (location === "freezone" && currency === "USD") {
      clonePro.freezonePrice = parseFloat(value);
    }
    if (location === "local" && currency === "USD") {
      clonePro.LocalPrice = parseFloat(value);
    }
    theproducts[index] = clonePro;
    setInputs((values) => ({ ...values, products: theproducts }));
  };

  const handleProductDelete = (id) => {
    let theproducts = [...inputs.products];
    const theProduct = theproducts.filter((product) => product._id === id)[0];
    const index = theproducts.indexOf(theProduct);
    theproducts.splice(index, 1);
    setInputs((values) => ({ ...values, products: theproducts }));
    console.log(inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  const handleUpdateButtonClick = (event) => {
    dispatch(updateProformaInvoice(oldPi._id, inputs));
    showToastMessage();
  };

  const handleAddToPi = (product) => {
    let theproducts = [...inputs.products];
    console.log(theproducts.findIndex((obj) => obj._id === product._id));
    if (theproducts.findIndex((obj) => obj._id === product._id) !== -1) {
      alert("Product already exists");
    } else {
      product = { ...product, qty: 0, freezonePrice: 0, freezonePriceAED: 0, LocalPrice: 0, LocalPriceAED: 0 };
      theproducts.push(product);

      setInputs((values) => ({ ...values, products: theproducts }));
      closeModal();
    }
  };

  return (
    <div>
      <ToastContainer />

      <>
        <form onSubmit={handleSubmit}>
          <div className="pi_prop">
            <label for="exp" class="label">
              Exporter:
            </label>
            <select className="select__class" id="exporter" name="exporter" onChange={handleChange}>
              {exporters.map((exporter) => (
                <option selected={oldPi.exporter === exporter.value} value={exporter.value}>
                  {exporter.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pi_prop">
            <label class="label">Buyer Address:</label>
            <input class="form-control" type="text" name="buyer_address" value={inputs.buyer_address || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Consignee: </label>
            <input class="form-control" type="text" name="consignee" value={inputs.consignee || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Notify Party :</label>
            <select className="select__class" id="notify_party" name="notify_party" onChange={handleChange}>
              {notify_partys.map((notifyparty) => (
                <option selected={oldPi.notify_party === notifyparty.value} value={notifyparty.value}>
                  {notifyparty.name}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Party of Discharge :</label>
            <input
              class="form-control"
              type="text"
              name="party_of_discharge"
              value={inputs.party_of_discharge || ""}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Final Distenation :</label>
            <input
              class="form-control"
              type="text"
              name="final_distination"
              value={inputs.final_distination || ""}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Discount :</label>
            <input class="form-control" type="text" name="discount" value={inputs.discount || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Additions :</label>
            <input class="form-control" type="text" name="additions" value={inputs.additions || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Note :</label>
            <input class="form-control" type="text" name="note" value={inputs.note || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Phone Number :</label>
            <input class="form-control" type="text" name="phone_number" value={inputs.phone_number || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Terms and condtions :</label>
            <p>{inputs.terms}</p>
            <select className="select__class" id="terms" name="terms" onChange={handleChange}>
              <option selected={oldPi?.terms[0] === "FOB"} value="FOB">
                FOB
              </option>
              <option selected={oldPi?.terms[0] === "CIF"} value="CIF">
                CIF
              </option>
              <option selected={oldPi?.terms[0] === "EXWAREHOUSE"} value="EXWAREHOUSE">
                EXWAREHOUSE
              </option>
            </select>
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Advance Payment condition :</label>
            <input
              class="form-control"
              type="text"
              name="paymentPercentage"
              value={inputs.paymentPercentage || ""}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">
              {" "}
              Goods will be delivered with in {inputs.deliveryDate || ""} days after completion of full payment :
            </label>
            <input class="form-control" type="text" name="deliveryDate" value={inputs.deliveryDate || ""} onChange={handleChange} />
          </div>{" "}
          <div className="pi_prop">
            <label class="label">Advance Payment condition :</label>
            {bank_details.map((item, i) => (
              <div className="form-check m-3" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="bankDetails"
                  checked={inputs.bankDetails?.includes(item.collection)}
                  value={item.collection}
                  id="flexCheckDefault"
                  onChange={handleBankDetailsChange}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {item.collection}
                </label>
              </div>
            ))}
          </div>
          <div className="pi_prop">
            <label for="exp" class="label">
              Currency :
            </label>
            <select className="select__class" id="currency" name="currency" onChange={handleChangeCurrency}>
              <option selected={oldPi.currency === "USD"} value={"USD"}>
                USD
              </option>
              <option selected={oldPi.currency === "AED"} value={"AED"}>
                AED
              </option>
            </select>
          </div>
          {/*<input style={{width : "100%" , height : "56px"}} class="btn btn-primary" type="submit" />*/}
        </form>
        <div>
          {" "}
          <i
            class="uil uil-plus-circle add_truck_but"
            onClick={() => {
              openModal(true);
            }}
          ></i>
        </div>
        <table style={{ border: 1 }} class="table table-bordered table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Prodct</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {inputs?.products?.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {product.brand}
                    {product.code}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="product_qty"
                      placeholder={product.qty}
                      value={product.qty || ""}
                      onChange={(e) => handleProductQtyChange(e, product._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="product_price"
                      value={calcPrice(product)?.toFixed(3) || ""}
                      onChange={(e) => handleProductPriceChange(e, product._id)}
                    />
                  </td>
                  <td>{(calcPrice(product) * product.qty)?.toFixed(3)}</td>
                  <td onClick={() => handleProductDelete(product._id)}>
                    <div className="del_but_pi">DELETE</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Total
              </td>
              <td>{total?.toFixed(3)}</td>
              <td>{inputs.currency}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Discount
              </td>
              <td>{inputs.discount}</td>
              <td>{inputs.currency}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Additions
              </td>
              <td>{inputs.additions}</td>
              <td>{inputs.currency}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }} colSpan={4}>
                Final
              </td>
              <td>{total?.toFixed(3) - -inputs.additions - inputs.discount}</td>
              <td>{inputs.currency}</td>
            </tr>
          </tfoot>
        </table>
        <div class="d-grid gap-2">
          <button onClick={handleUpdateButtonClick} style={{ width: "50%", margin: "auto" }} className="btn btn-primary">
            Update Proforma Invoice
          </button>
        </div>
      </>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="new_modal_2"
        overlayClassName="new_Overlay"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="exit_butt" onClick={() => closeModal()}>
          Exit
        </div>
        <Products handleAddToPi={handleAddToPi} />
      </Modal>
    </div>
  );
};

export default PiForm;
