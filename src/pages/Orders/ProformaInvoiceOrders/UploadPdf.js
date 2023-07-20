import React, { useState } from "react";
import axios from "axios";
import "./uploadpdf_styles.css";
import { BASE_URL } from "../../../api/index";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProformaInvoiceStatus } from "../../../actions/proformaInvoice";
import { useEffect } from "react";
import { pdf } from "@react-pdf/renderer";

function UploadPdf({ pi, setLoading }) {
  const showToastMessage = (msg, status) => {
    if (status === "success") {
      toast.success(`"${msg} ✅"`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const [pdfFile, setPdfFile] = useState();

  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    console.log(pdfFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    //dispatch(updateProformaInvoiceStatus({ id: pi._id, newStatus: "Signed" }));

    const formData = new FormData();
    formData.append("pdf", pdfFile, `signed_${pi.pi_no}_${pi.employee}_${pi.manager}_${pi._id}_${pi.buyer_address}`);

    axios
      .post(`${BASE_URL}/pi/pisigned`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        showToastMessage("file uploaded successfully", "success");
        console.log("PDF file uploaded successfully");
        setPdfFile({});
      })
      .catch((error) => {
        setLoading(false);
        showToastMessage(error.message, "error");
        console.error(error);
      });
  };

  return (
    <>
      <form className="form_upload" onSubmit={handleSubmit}>
        <label htmlFor="pi_upload">
          <i class="uil uil-upload"></i>
          <input id="pi_upload" style={{ width: "110px" }} type="file" accept="application/pdf" onChange={handleFileChange} autocomplete="on" />
        </label>
        <button type="submit" className="ags-btn-main-fill" disabled={!pdfFile}>
          {" "}
          Upload{" "}
        </button>
      </form>
    </>
  );
}

export default UploadPdf;
