import React, { useState } from 'react';
import axios from 'axios';
import './uploadpdf_styles.css'
import { BASE_URL } from '../../../api/index';
import { ToastContainer, toast } from "react-toastify";

function UploadPdf({pi  , id , onFatherChange , allPdfs}) {

  const showToastMessage = (msg ,status) => {
    if(status === "success") {
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
  }else {
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
  
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    onFatherChange(id ,event.target.files[0] )
    console.log(id);
  //  setPdfFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', pdfFile);

    axios.post( `${BASE_URL}/pi/pisigned`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      showToastMessage("file uploaded successfully","success")
      console.log('PDF file uploaded successfully');
    })
    .catch(error => {
      showToastMessage(error.message , "error")
      console.error(error);
    });
  };
  return (
    <>
    <ToastContainer />
    <form id={id} onSubmit={handleSubmit}>
        <label htmlFor="pi_upload">
    <img   className='upload__icon'  src="/images/upload-file.png" alt='upload'/>
  </label>
      <input id='pi_upload' className='hidden_upload_btn' type="file" accept="application/pdf" onChange={handleFileChange} />
      <button  className={pdfFile  ? `upload__btn is_file` : `upload__btn no_file`} type="submit"
       disabled={!allPdfs?.filter(obj => {
        return obj.b === 6
      }).pdfFile} >
        Upload</button>
    </form>
    </>
  );
}

export default UploadPdf;
