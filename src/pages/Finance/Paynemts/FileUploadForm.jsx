import React, { useState } from "react";
import "./FileUploadForm.css";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { ToastContainer } from "react-toastify";

function FileUploadForm({ pi, setShowNewPaymentForm, toastWithMessage }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [amount, setAmount] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // setLoading(true)
    // dispatch(updateProformaInvoiceStatus({id : pi._id , newStatus : 'Signed'}))
    const paymentData = {
      piId: pi.pi_id,
      customer: pi.buyer_address,
      amount: amount,
      employee: pi.employee,
      invoiceNo: invoiceNo,
    };
    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("name", "payment_invoice");
    formData.append("paymentData", JSON.stringify(paymentData));

    axios
      .post(`${BASE_URL}/pi/payment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        //  setLoading(false)
        //toastWithMessage("Payment added successfully","success")
        showToastMessage("Payment added successfully", "success");
        setTimeout(() => {
          //  setShowNewPaymentForm(false)
        }, 1000);

        console.log("PDF file uploaded successfully");
      })
      .catch((error) => {
        // setLoading(false)
        toastWithMessage(error.message, "error");
        // showToastMessage(error.message , "error")
        //setShowNewPaymentForm(false)

        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  return (
    <>
      <ToastContainer />

      <form className="form_style" onSubmit={handleSubmit}>
        <div class="input_row">
          <div class="col-25">
            <label htmlFor="amount">Amount</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="amount"
              name="paymentAmount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              placeholder="Enter Amount in USD"
            />
          </div>
        </div>
        <div class="input_row">
          <div class="col-25">
            <label htmlFor="invoiceNo">Inovice Number : </label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="invoiceNo"
              name="invoiceNo"
              onChange={(e) => {
                setInvoiceNo(e.target.value);
              }}
              placeholder="Enter Invoice number"
            />
          </div>
        </div>
        <div class="input_row">
          <div class="col-25">
            <label htmlFor="filep">Inoice file (PDF) : </label>
          </div>
          <div class="col-75">
            <input id="filep" type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>
        </div>

        <div>
          <button className={pdfFile ? `upload__btn is_file_pay` : `upload__btn no_file_pay`} type="submit">
            Add Payment
          </button>
        </div>
      </form>
    </>
  );
}

export default FileUploadForm;
