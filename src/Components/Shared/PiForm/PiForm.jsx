import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateProformaInvoice } from "../../../actions/proformaInvoice";
import "./styles.css";
import { bank_details } from "../../Invoice/data";
import { exporters, notify_partys } from "../../../data/invoice-data";

const PiForm = ({ oldPi }) => {
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

  const dispatch = useDispatch();
  const location = oldPi?.location;
  const currency = oldPi?.currency;
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

  const [inputs, setInputs] = useState(oldPi ? oldPi : {});
  console.log(inputs);

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

  return (
    <div>
      <ToastContainer />

    <>
        {/* new form */}
      {/* <div className="card-add-product">
        <div className="card-add-product-tittle">
            <h3 > Edit PI</h3>
        </div>
      <div className="card-add-product-body">
      <form autoComplete="off" noValidate  onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="exporter">Exporter:</label>
            <select class="form-select " id="exporter" name="exporter" onChange={handleChange}>
            {exporters.map((exporter) => (
              <option selected={oldPi.exporter === exporter.value} value={exporter.value}>
                {exporter.name}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="buyer_address">Buyer Address</label>
          <input class="form-control" type="text" name="buyer_address" value={inputs.buyer_address || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="consignee">Consignee</label>
           <input class="form-control" type="text" name="consignee" value={inputs.consignee || ""} onChange={handleChange} /> 
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="notify_party">Notify Party</label>
              <select className="form-select" id="notify_party" name="notify_party" onChange={handleChange}>
            {notify_partys.map((notifyparty) => (
              <option selected={oldPi.notify_party === notifyparty.value} value={notifyparty.value}>
                {notifyparty.name}
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="party_discharge">Party of Discharge</label>
          <input
            class="form-control"
            type="text"
            id="party_discharge"
            name="party_of_discharge"
            value={inputs.party_of_discharge || ""}
            onChange={handleChange}
          /> </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="final_distenation">Final Distenation</label>
          <input class="form-control" id="final_distenation" type="text" name="final_distination" value={inputs.final_distination || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="discount">Discount</label>
          <input class="form-control" type="text" id="discount" name="discount" value={inputs.discount || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="additions">Additions</label>
           <input class="form-control" type="text" id="additions" name="additions" value={inputs.additions || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="">Note</label>
          <input class="form-control" type="text" id="note" name="note" value={inputs.note || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number </label>
          <input class="form-control" type="text" id="phone_number" name="phone_number" value={inputs.phone_number || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <p>{inputs.terms}</p>
          <select className="form-select" id="terms" name="terms" onChange={handleChange}>
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
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="paymentPercentage">Advance Payment condition</label>
          <input class="form-control" type="text" id="paymentPercentage" name="paymentPercentage" value={inputs.paymentPercentage || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
            <label htmlFor="paymentPercentage">Goods will be delivered with in {inputs.deliveryDate || ""} days after completion of full payment </label>
          <input class="form-control" type="text" id="paymentPercentage" name="deliveryDate" value={inputs.deliveryDate || ""} onChange={handleChange} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="form-group">
          <label htmlFor="bankDetails">Advance Payment condition :</label>
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
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="form-group text-center">
          <div  className="ags-btns-group">
              <button type="submit"   className="ags-btn-main-fill">Update Proforma Invoice</button>
           </div>
          </div>
        </div>
      </div>
      </form>
      </div>
      </div> */}
        {/* old form */}
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
          <input class="form-control" type="text" name="final_distination" value={inputs.final_distination || ""} onChange={handleChange} />
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
          <input class="form-control" type="text" name="paymentPercentage" value={inputs.paymentPercentage || ""} onChange={handleChange} />
        </div>{" "}
        <div className="pi_prop">
          <label class="label"> Goods will be delivered with in {inputs.deliveryDate || ""} days after completion of full payment :</label>
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
        {/*<input style={{width : "100%" , height : "56px"}} class="btn btn-primary" type="submit" />*/}
      </form>
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
                    value={calcPrice(product).toFixed(3) || ""}
                    onChange={(e) => handleProductPriceChange(e, product._id)}
                  />
                </td>
                <td>{(calcPrice(product) * product.qty).toFixed(3)}</td>
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
            <td>{total.toFixed(3)}</td>
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
            <td>{total.toFixed(3) - -inputs.additions - inputs.discount}</td>
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
    </div>    
  );
};

export default PiForm;
