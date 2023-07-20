import React from "react";
import "./PoUnderProcess.scss";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEmployeePurchaseOrdersAction } from "../../../actions/purchaseOrder";
import { useState } from "react";
import PurchaseOrderPdf from "../../../Components/PurchaseOrderPdf/PurchaseOrderPdf";
import SearchBox from "../SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";
import { colorByStatus } from "../../../helpers/piOrdersFunctions";
import axios from "axios";
import { BASE_URL } from "../../../api/index";
import { showToastMessage } from "../../../helpers/toaster";
import { FileType } from "../../../Enum/GlobalEnum";
import { UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function PoUnderProcess() {
  const { username } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeePurchaseOrdersAction(username));
  }, []);
  let purchaseOrders = useSelector((state) => state.purchaseOrders.purchaseOrders);
  const options = [
    { name: "PI Number", value: "pi_no" },
    { name: "Employee", value: "employee" },
    { name: "Buyer", value: "buyerAddress" },
    { name: "Exporter", value: "exporter" },
    { name: "Port of Discharge", value: "portOfDischarge" },
    { name: "Port of Origin", value: "portOfOrigin" },
    { name: "Status", value: "status" },
  ];
  const navigate = useNavigate();
  const [currentPo, setCurrentPo] = useState({});
  const [itemModel, setItemModel] = useState({});
  const [file, setFile] = useState();
  const [isPdf, setIsPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [typeFile, setTypeFile] = useState();
  const [isChange, setIsChange] = useState(true);
  /* ------------------------------- searchQuery ------------------------------ */
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const storeItem = (item, type) => {
    console.log("type", type);
    console.log("FileType.PI", FileType.PI);
    setItemModel(item);
    setTypeFile(type);
    if (type === FileType.PO) {
      if (item.po) {
        setIsChange(false);
        setFileNumber(item.po.No);
        console.log("PON", item.po.No);
      } else {
        setIsChange(true);
        setFileNumber("");
        console.log("PON", "EMPTY");
      }
    } else if (type === FileType.PI) {
      if (item.pi) {
        setIsChange(false);
        setFileNumber(item.pi.No);
        console.log("POI", item.pi.No);
      } else {
        setIsChange(true);
        setFileNumber("");
        console.log("POI", "EMPTY");
      }
    }
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    purchaseOrders = purchaseOrders.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }
  if (searchQuery.length > 0 && filter.length === 0) {
    console.log("purchaseOrders", purchaseOrders);
    purchaseOrders = purchaseOrders.filter((item) => item.po_no.toString().includes(searchQuery.toLowerCase()));
  }
  //   this function to upload file (API)
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("division", typeFile);
    formData.append("folderName", itemModel.po_no);
    formData.append("fileName", itemModel.po_no);
    formData.append("fileType", typeFile);
    formData.append("fileSize", file.size);
    formData.append("isNew", isChange);
    formData.append("fileExtension", file.type);
    formData.append("id", itemModel._id);
    formData.append("fileNo", fileNumber);
    formData.append("file", file);
    axios
      .post(`${BASE_URL}/file/upload`, formData)
      .then((response) => {
        console.log(response.data);
        showToastMessage("File Uploaded Successfully", "success");
        setFile("");
        setFileNumber("");
        setIsChange(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //   Handler to file upload
  const onChooseFile = (e) => {
    setFile(e.target.files[0]);
  };
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <ToastContainer />
      <div className="container_custom">
        <div className="card-custom">
          <div className="card-custom-tittle">
            <h6>Po under Process</h6>
          </div>
          <div className="card-custom-body">
            <div className="page_container">
              <div className="search_container">
                {/* this is search section  */}
                <div className="row">
                  <div className="col-lg-6 col-md12">
                    <SearchBox onChange={handleSearchQueryChange}></SearchBox>
                  </div>
                  <div className="col-lg-6 col-md12">
                    <DropDownSelect onChange={handleFilterChange} options={options} />
                  </div>
                </div>
              </div>
              <table className="pi__table table table-bordered">
                <thead>
                  <tr className="th_style">
                    <th scope="col">
                      <div className="th_cell_div">Supplier</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">#PO</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">Discount</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">Amount</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">PO PDF</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">PI PDF</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">Compared</div>
                    </th>
                    <th scope="col">
                      <div className="th_cell_div">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders?.map((item, index) => (
                    <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                      <td>
                        <div style={{ fontWeight: "bold" }} className="td_padding">
                          {item.exporter.split(" ").slice(0, 2).join(" ")}
                        </div>
                      </td>
                      <td>
                        <div className="td_padding employee_cell text-center">{item.po_no}</div>
                      </td>
                      <td>
                        <div className="td_padding customer_cell text-center">{item?.discount} %</div>
                      </td>
                      <td>
                        <div className="td_padding customer_cell text-center">{item.totalAmount}</div>
                      </td>
                      <td>
                        <div className="files-icons">
                          {item?.po && (
                            <div className="file-icon" data-toggle="modal" data-target="#uploadFileModal">
                              <i class="fas fa-file-pdf fa-2x" onClick={() => storeItem(item, FileType.PO)}></i>
                            </div>
                          )}
                          {!item?.po && (
                            <div className="file-icon" data-toggle="modal" data-target="#uploadFileModal">
                              <i class="uil uil-upload uil-extra-larg" onClick={() => storeItem(item, FileType.PO)}></i>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="files-icons">
                          {item?.pi && (
                            <div className="file-icon" data-toggle="modal" data-target="#uploadFileModal">
                              <i class="fas fa-file-pdf fa-2x" onClick={() => storeItem(item, FileType.PI)}></i>
                            </div>
                          )}
                          {!item?.pi && (
                            <div className="file-icon" data-toggle="modal" data-target="#uploadFileModal">
                              <i class="uil uil-upload uil-extra-larg" onClick={() => storeItem(item, FileType.PI)}></i>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="required">5% UP</td>
                      <td>
                        <div>
                          <button className="ags-btn-sm-main-fill mr-2" onClick={() => navigate("/user/pounderproduction", { state: item })}>
                            View
                          </button>
                          {/* <button className="ags-btn-sm-main-outlin ml-2">Delete</button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* this is modal for po file  */}
      <div class="modal fade" id="uploadFileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Upload File
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="File Number">Supplier PI Number</label>
                  {console.log("this is from file number", fileNumber)}
                  <input
                    type="text"
                    className="form-control"
                    value={fileNumber}
                    onChange={(e) => setFileNumber(e.target.value)}
                    placeholder="Enter  SUPPLIER PI number NOT our PI Number"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="file_id">Choose File</label>
                  {/* <div class="mb-3"> */}
                  <input class="form-control" type="file" id="file_id" onChange={onChooseFile} />
                  {/* </div> */}
                </div>
                <div className="text-center mt-3">
                  <button type="button" class="ags-btn-sm-main-fill" disabled={!file && fileNumber !== ""} onClick={() => uploadFile()} data-dismiss="modal" aria-label="Close">
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PoUnderProcess;
