import React from "react";
import "./PoUnderProduction.scss";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { FileType } from "../../../Enum/GlobalEnum";
import { ToastContainer } from "react-toastify";
// export const filesPo = [
//   {
//     fileName: "COO",
//     type: FileType.COO,
//     fileDocument: {},
//     status: "Payment not sent",
//   },
//   {
//     fileName: "PKL",
//     fileDocument: {},
//     type: FileType.PKL,
//     status: "Completed",
//   },
//   {
//     fileName: "CI",
//     fileDocument: {},
//     type: FileType.CI,
//     status: "Po need information",
//   },
//   {
//     fileName: "BL",
//     fileDocument: {},
//     type: FileType.BL,
//     status: "PO need file",
//   },
// ];
function PoUnderProduction() {
  const { state } = useLocation();
  const [itemModel, setItemModel] = useState(state);
  const [bufferFile, setBufferFile] = useState({});
  const [poItemModel, setPoItemModel] = useState({
    etfp: new Date(),
    notes: "",
  });
  const [filesPo, setFilesPo] = useState([
    {
      fileName: "COO",
      type: FileType.COO,
      file: itemModel?.coo ? itemModel?.coo : {},
      isChange: itemModel?.coo ? false : true,
      status: "Payment not sent",
    },
    {
      fileName: "PKL",
      file: itemModel?.pkl ? itemModel?.pkl : {},
      isChange: itemModel?.pkl ? false : true,
      type: FileType.PKL,
      status: "Completed",
    },
    {
      fileName: "CI",
      file: itemModel?.ci ? itemModel?.ci : {},
      isChange: itemModel?.ci ? false : true,
      type: FileType.CI,
      status: "Po need information",
    },
    // {
    //   fileName: "BL",
    //   file: itemModel?.bl ? itemModel?.bl : {},
    //   isChange: itemModel?.bl ? false : true,
    //   type: FileType.BL,
    //   status: "PO need file",
    // },
  ]);
  const [bls, setBls] = useState([]);
  const [typeFile, setTypeFile] = useState();
  const [isChange, setIsChange] = useState(true);
  const [fileNumber, setFileNumber] = useState("");
  const [file, setFile] = useState({});
  const openPdf = (link) => {
    console.log("", link);
    window.open(link, "_blank", "fullscreen=yes");
  };
  const updateInformation = () => {
    let model = {
      notes: poItemModel.notes,
      etfp: new Date(poItemModel.etfp),
    };
    axios
      .put(`${BASE_URL}/purchaseorder/etfp/${state._id}`, model)
      .then((response) => {
        console.log(response.data);
        showToastMessage("Information Uploaded Successfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("model", model);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPoItemModel((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  //  Handler to file upload
  const onChooseFile = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const uploadFile = () => {
    // console.log("fileNumber", fileNumber);
    // let model = {
    //   division: typeFile,
    //   folderName: itemModel.po_no,
    //   fileName: itemModel.po_no,
    //   fileSize: file.size,
    //   fileType: typeFile,
    //   isNew: isChange,
    //   fileExtension: file.type,
    //   id: itemModel._id,
    //   fileNo: fileNumber,
    //   file: file,
    // };
    // console.log(model);
    console.log("file", file);
    const formData = new FormData();
    formData.append("division", FileType.PO);
    formData.append("folderName", itemModel.po_no);
    formData.append("fileName", itemModel.po_no);
    formData.append("fileType", typeFile);
    formData.append("fileSize", file.size);
    formData.append("isNew", isChange);
    formData.append("fileExtension", ".pdf");
    formData.append("id", itemModel._id);
    formData.append("fileNo", fileNumber);
    formData.append("file", file);
    console.log("this is model", formData);
    axios
      .post(`${BASE_URL}/file/upload`, formData)
      .then((response) => {
        console.log(response.data);
        showToastMessage("File Uploaded Successfully", "success");
        setFile({});
        setFileNumber("");
        setIsChange(true);
        setTypeFile("");
        console.log("file after upload", file);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const storeFile = (fileItem) => {
    setTypeFile(fileItem.type);
    setIsChange(fileItem.isChange);
  };
  const resetFile = (isBl) => {
    if (isBl) {
    } else {
      setFileNumber("");
      setFile({});
      setIsChange(true);
      setTypeFile("");
    }
  };
  return (
    <>
      <div className="container_custom">
        <div className="card-custom">
          <div className="card-custom-tittle">
            <h6>PO under Production</h6>
          </div>
          <div className="card-custom-body">
            <table className="table border">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>#Po</th>
                  <th>PO PDF</th>
                  <th>PI PDF</th>
                  <th>F.Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{itemModel?.exporter.split(" ").slice(0, 2).join(" ")}</td>
                  <td>{itemModel?.po_no}</td>
                  <td>
                    <i class="fas fa-file-pdf fa-2x" onClick={() => openPdf(itemModel?.po.filePath)}></i>
                  </td>
                  <td>
                    <i class="fas fa-file-pdf fa-2x" onClick={() => openPdf(itemModel?.pi.filePath)}></i>
                  </td>
                  <td>Payment not sent </td>
                </tr>
              </tbody>
            </table>
            <form>
              <div className="eft-note">
                <div className="box">
                  <div className="form-group">
                    <label htmlFor="eft">Estimated Time of finishing production</label>
                    <input type="date" className="form-control date-input" name="etfp" value={poItemModel.etfp} onChange={handleChange} />
                  </div>
                </div>
                <div className="box">
                  <div className="form-group">
                    <label htmlFor="note">Notes</label>
                    <input type="text" className="form-control" name="notes" value={poItemModel.note} onChange={handleChange} />
                  </div>
                </div>
                <div className="box">
                  <label></label>
                  <div className="btn-update" onClick={() => updateInformation()}>
                    Update
                  </div>
                </div>
              </div>
            </form>
            <div className="files-po mt-3">
              <table className="table border">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>File Document</th>
                    {/* <th>PI PDF</th> */}
                    {/* <th>Status</th> */}
                    <th>Information</th>
                  </tr>
                </thead>
                <tbody>
                  {filesPo.map((fileItem, index) => (
                    <tr>
                      <td>{fileItem.fileName}</td>
                      <td>
                        <i class="fas fa-file-pdf fa-2x" onClick={() => storeFile(fileItem)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                      </td>
                      {/* <td>{fileItem.status} </td> */}
                      <td>
                        <span className="ags-btn-sm-main-outlin" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                          Enter Information
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* {filesPo.map((fileItem, index) => {
                  <tr key={index}>
                    <td>{fileItem.fileName}</td>
                    <td>{fileItem.file}</td>
                    <td>
                      <i class="fas fa-file-pdf fa-2x" onClick={() => openPdf(itemModel.po.filePath)}></i>
                    </td>
                    <td>Payment not sent </td>
                  </tr>;
                })} */}
                </tbody>
              </table>
            </div>
            <div className="bl-list">
              <div className="col-12 contact-row">
                <div className="banks">
                  <div className="bank-tittle">
                    <label className="pb-0" htmlFor="account">
                      Contact <span className="required">*</span>
                    </label>
                    <span>
                      {/* <i class="uil uil-minus-circle" onClick={deleteBank}></i> */}
                      <i class="uil uil-plus-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                    </span>
                  </div>
                  {bls.length > 0 && (
                    <table class="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Bl Number</th>
                          <th scope="col">Enter Information </th>
                          {/* <th scope="col">Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {bls.map((item, index) => (
                          <tr>
                            <td>{item.fileNumber}</td>
                            <td>
                              {" "}
                              <span className="ags-btn-sm-main-outlin" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                                Enter Information
                              </span>
                            </td>
                            {/* <td>
                              <div className="btn-actions">
                                <i class="uil uil-trash-alt " onClick={() => setBufferContact(item)} data-toggle="modal" data-target="#exampleModal1"></i>
                              </div>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {bls.length <= 0 && (
                    <div className="no-banks">
                      <i class="uil uil-credit-card"></i>
                      <p> No Contacts Added Yet!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Launch static backdrop modal
            </button>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Modal title
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* this is modal for po file  */}
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Upload File
              </h5>
              <button type="button" class="close" data-bs-dismiss="modal" onClick={() => resetFile(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="File Number">File Number</label>
                  {console.log("this is from file number", fileNumber)}
                  <input type="text" className="form-control" value={fileNumber} onChange={(e) => setFileNumber(e.target.value)} placeholder="Enter File Number" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="file_id">Choose File</label>
                  <input class="form-control" type="file" id="file_id" value={file?.filename} onChange={onChooseFile} />
                </div>
                <div className="text-center mt-3">
                  <button type="button" class="ags-btn-sm-main-fill" disabled={!file && fileNumber !== ""} onClick={() => uploadFile()} data-bs-dismiss="modal">
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* this is modal for Enter Information  */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Information
              </h5>
              <button type="button" class="close" data-bs-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6>Here will be add more information</h6>
              {/* <form>
                <div className="form-group mb-3">
                  <label htmlFor="File Number">File Number</label>
                  {console.log("this is from file number", fileNumber)}
                  <input type="text" className="form-control" value={fileNumber} onChange={(e) => setFileNumber(e.target.value)} placeholder="Enter File Number" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="file_id">Choose File</label>
                  <input class="form-control" type="file" id="file_id" onChange={onChooseFile} />
                </div>
                <div className="text-center mt-3">
                  <button class="ags-btn-sm-main-fill" disabled={!file && fileNumber !== ""} onClick={() => uploadFile()} data-dismiss="modal" aria-label="Close">
                    Upload File
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
      {/* this is modal for enter bl 
      <div class="modal fade" id="staticBackdropBl" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Upload File BL
              </h5>
              <button type="button" class="close" data-bs-dismiss="modal" onClick={() => resetFile(true)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="File Number">File Number</label>
                  {console.log("this is from file number", fileNumber)}
                  <input type="text" className="form-control" value={fileNumberBl} onChange={(e) => setFileNumberBl(e.target.value)} placeholder="Enter File Number" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="file_id">Choose File</label>
                  <input class="form-control" type="file" id="file_id" value={fileBl?.filename} onChange={onChooseFile} />
                </div>
                <div className="text-center mt-3">
                  <button type="button" class="ags-btn-sm-main-fill" disabled={!fileBl && fileNumberBl !== ""} onClick={() => uploadFile()} data-bs-dismiss="modal">
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default PoUnderProduction;
