import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProformaInvoicesAction,
  getSignedEmployeeProformaInvoicesAction,
  updateProformaInvoiceStatus,
} from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEmployeeProformaInvoicesAction } from "../../../actions/proformaInvoice";
import useAuth from "../../../hooks/useAuth";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import UploadPdf from "../ProformaInvoiceOrders/UploadPdf";
import DownloadPDFButton from "../ProformaInvoiceOrders/DownloadPDFButton";
import StatusTracker from "./StatusTracker";
import StatusSelect from "./StatusSelect";
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

const SignedProformaInvoices = () => {
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
        return "table-secondary";
      case "Signed":
        return "table-info";
      case "Approved":
        return "table-success";
      case "Rejected":
        return "table-danger";
      default:
        return "table-secondary";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSignedEmployeeProformaInvoicesAction(username));
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
    proformaInvoices = proformaInvoices.filter((item) =>
      item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
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
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee</th>
              <th scope="col">Approved by</th>
              <th scope="col">Date/Time</th>
              <th scope="col">Customer</th>
              <th scope="col">Signed by Customer</th>
              <th scope="col">Action</th>
              <th scope="col">Progress</th>
              <th scope="col">Current Status</th>
            </tr>
          </thead>
          <tbody>
            {proformaInvoices.map((proformaInvoice, index) => (
              <tr key={index}>
                <th scope="row">{proformaInvoice.pi_no}</th>
                <td>{proformaInvoice.employee}</td>
                <td>{proformaInvoice.manager}</td>
                <td>{timeAgo(new Date(proformaInvoice.createdAt))}</td>
                <td>{proformaInvoice.buyer_address}</td>
                <td>
                  <DownloadPDFButton
                    pi_id={proformaInvoice.pi_id}
                    pdfName={`signed_${proformaInvoice.pi_no}_${proformaInvoice.employee}_${proformaInvoice.manager}_${proformaInvoice.pi_id}`}
                  />
                </td>
                <td>
                  <StatusSelect pi={proformaInvoice} />
                </td>
                <td>
                  <StatusTracker pi={proformaInvoice} />
                </td>
                <td className={colorByStatus(proformaInvoice?.status)}>{proformaInvoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SignedProformaInvoices;
