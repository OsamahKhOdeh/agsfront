import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProformaInvoicesAction, updateProformaInvoiceStatus } from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEmployeeProformaInvoicesAction } from "../../../actions/proformaInvoice";
import useAuth from "../../../hooks/useAuth";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import UploadPdf from "./UploadPdf";
import DownloadPDFButton from "./DownloadPDFButton";
import SearchBox from "../../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../../Components/DropDownSelect/DropDownSelect";

// Define a function that takes a date as an argument
// and returns a string that represents how long ago the date was
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

const ProformaInvoiceOrders = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPi, setCurrentPi] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleLoading = (isLoading) => {
    setIsLoading(isLoading);
  };

  const { username, phone } = useAuth();

  function colorByStatus(status) {
    switch (status) {
      case "Pending":
        return "pending_status";
      case "Signed":
        return "signed_status";
      case "Approved":
        return "success_status";
      case "Rejected":
        return "rejected_status";
      default:
        return "table-secondary";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeeProformaInvoicesAction(username));
  }, [dispatch]);

  let proformaInvoices = useSelector((state) => state.proformaInvoices.proformaInvoices);
  /* ------------------------------- searchQuery ------------------------------ */
  console.log(filter);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    proformaInvoices = proformaInvoices.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    proformaInvoices = proformaInvoices.filter((item) => item.pi_no.toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "PI Number", value: "pi_no" },
    { name: "Employee", value: "employee" },
    { name: "Customer", value: "buyer_address" },
    { name: "Status", value: "status" },
  ];

  /* -------------------------------------------------------------------------- */

  const handleApprove = (id) => {
    dispatch(updateProformaInvoiceStatus({ id, newStatus: "Approved" }));
  };
  const handleReject = (id) => {
    dispatch(updateProformaInvoiceStatus({ id, newStatus: "Rejected" }));
  };
  const handleDelete = (id) => {};
  const handlePDF = (pi) => {
    setCurrentPi(pi);
    setIsPdf(true);
    console.log(isPdf);
  };
  if (isPdf) {
    return (
      <>
        <div className="next_div" style={{ paddingBottom: "20px" }}>
          <button
            className="btn_next success_prev"
            onClick={() => {
              setIsPdf(false);
            }}
          >
            PREVIOUS
          </button>
        </div>
        <ProformaInvoice adminPi={currentPi} />
      </>
    );
  } else
    return (
      <div className="page_container">
        <div className="search_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
        </div>
        <table className="pi__table table table-bordered">
          <thead>
            <tr className="th_style">
              <th scope="col">
                <div className="th_cell_div">#</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Employee</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Date/Time</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Customer</div>
              </th>

              <th scope="col">
                <div className="th_cell_div">From manager</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Signed by Customer</div>
              </th>
              <th scope="col">
                <div className="th_cell_div">Status</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {proformaInvoices.map((proformaInvoice, index) => (
              <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                <td>
                  <div style={{ fontWeight: "bold" }} className="td_padding">
                    {proformaInvoice.pi_no}
                  </div>
                </td>
                <td>
                  <div className="td_padding employee_cell">{proformaInvoice.employee}</div>
                </td>
                <td>
                  <div className="td_padding">{timeAgo(new Date(proformaInvoice.createdAt))}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{proformaInvoice.buyer_address}</div>
                </td>

                <td>
                  <div style={{ overflow: "hidden" }}>
                    {proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                      <button type="button" className="button_edit_pdf button_pdf" onClick={() => handlePDF(proformaInvoice)}>
                        PI ( pdf )
                      </button>
                    ) : proformaInvoice.managerApproval === "Rejected" || proformaInvoice.financiaApproval === "Rejected" ? (
                      <>
                        <button
                          type="button"
                          className="button_edit_pdf button_edit"
                          onClick={() => navigate(`/user/editpi/${proformaInvoice._id}`)}
                        >
                          Edit
                        </button>
                        <p style={{ color: "red", padding: 0, margin: 0 }}>
                          From {proformaInvoice.financiaApproval === "Rejected" && "Finance :"}
                          {proformaInvoice?.financeMessage + "/"}
                          {proformaInvoice.managerApproval === "Rejected" && "Sales Manger :"}
                          {proformaInvoice?.managerMessage}
                        </p>
                      </>
                    ) : (
                      <>
                        Wating for :{proformaInvoice.managerApproval === "Pending" && " manager approval"} &&nbsp;
                        {proformaInvoice.financiaApproval === "Pending" && "finance approval"}
                      </>
                    )}
                  </div>
                </td>
                <td>
                  {proformaInvoice.status === "Signed" ? (
                    <DownloadPDFButton
                      pi_id={proformaInvoice._id}
                      pdfName={`signed_${proformaInvoice.pi_no}_${proformaInvoice.employee}_${proformaInvoice.manager}_${proformaInvoice._id}`}
                    />
                  ) : proformaInvoice.managerApproval === "Approved" && proformaInvoice.financiaApproval === "Approved" ? (
                    <UploadPdf pi={proformaInvoice} setLoading={handleLoading} />
                  ) : (
                    ""
                  )}
                </td>
                <td style={{ fontSize: "12px" }}>
                  <div className={colorByStatus(proformaInvoice?.managerApproval)}>S/{proformaInvoice?.managerApproval}</div>
                  <div className={colorByStatus(proformaInvoice?.financiaApproval)}>F/{proformaInvoice?.financiaApproval}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ProformaInvoiceOrders;
