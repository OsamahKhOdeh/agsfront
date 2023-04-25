import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProformaInvoicesAction, updateProformaInvoiceStatus } from "../../../actions/proformaInvoice";
import { changeProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { useNavigate } from "react-router-dom";
import ProformaInvoice from "../../../Components/PoformaInvoice/ProformaInvoice";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
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

const PIActionsAdmin = () => {
  const [isPdf, setIsPdf] = useState(false);
  const [currentPi, setCurrentPi] = useState({});
  const [popupClass, setPopupClass] = useState("form-popup hidden");
  const { username } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  function colorByStatus(status) {
    switch (status) {
      case "Pending":
        return "pending_status";
      case "Approved":
        return "success_status";
      case "Rejected":
        return "rejected_status";
      default:
        return "table-secondary";
    }
  }

  function colorByUpdate(createdAt, updatedAt) {
    const status = createdAt === updatedAt;
    switch (status) {
      case true:
        return "table-secondary";
      case false:
        return "table-success";
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProformaInvoicesAction());
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
    dispatch(
      updateProformaInvoiceStatus({
        id,
        newStatus: "Approved",
        manager: username,
      })
    );
  };
  const handleReject = (id) => {
    setPopupClass("form-popup showing");
    //dispatch(updateProformaInvoiceStatus({id, newStatus : 'Rejected'}))
  };

  const handleRejectMessage = (event) => {
    event.preventDefault();
    console.log(event.target.rej_msg.value);
    const id = currentPi._id;
    dispatch(
      updateProformaInvoiceStatus({
        id,
        newStatus: "Rejected",
        managerMessage: event.target.rej_msg.value,
        manager: username,
      })
    );
    setPopupClass("form-popup hidden");
    event.target.rej_msg.value = "";
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
      <div style={{ width: "85%", margin: "auto" }}>
        <>
          <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <div className={popupClass} id="myForm">
              <form onSubmit={handleRejectMessage} class="form-container">
                <h1>Reject with note</h1>

                <label for="rej_msg">
                  <b>Rejection message</b>
                </label>
                <input type="text" placeholder="Enter why you reject this proforma invoice" name="rej_msg" />

                <button type="submit" class="btn">
                  Send
                </button>
                <button
                  style={{ position: "absolute", right: "23px" }}
                  type="button"
                  class="btn cancel"
                  onClick={() => {
                    setPopupClass("form-popup hidden");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </>
        <div className="search_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
        </div>
        <table className="pi__table table table-bordered">
          <thead className="th_style">
            <tr>
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
                <div className="th_cell_div">Status</div>
              </th>
              <th style={{ width: "140px" }} scope="col">
                <div className="th_cell_div"> PDF</div>
              </th>
              <th style={{ width: "225px" }} scope="col">
                <div className="th_cell_div"> Handle</div>
              </th>
              <th style={{ width: "28 0px" }} scope="col">
                <div className="th_cell_div"> Manager Note</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {proformaInvoices.map((proformaInvoice, index) => (
              <tr className={index % 2 === 0 ? `tr_border` : `tr_border tr_dark`} key={index}>
                <td scope="row">
                  {" "}
                  <div style={{ fontWeight: "bold" }} className="td_padding">
                    {proformaInvoice.pi_no}
                  </div>
                </td>
                <td>
                  <div className="td_padding employee_cell">{proformaInvoice?.employee?.split("/")[0]}</div>
                </td>
                <td>
                  <div className="td_padding">{timeAgo(new Date(proformaInvoice.updatedAt))}</div>
                </td>
                <td>
                  <div className="td_padding customer_cell">{proformaInvoice.buyer_address}</div>
                </td>
                <td>
                  <div className={colorByStatus(proformaInvoice?.status)}>{proformaInvoice?.status}</div>
                </td>
                <td>
                  <button
                    type="button"
                    className="button_edit_pdf button_pdf"
                    onClick={() => handlePDF(proformaInvoice)}
                  >
                    PDF
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex" }}>
                    <button
                      type="button"
                      className="button_edit_pdf button_reject"
                      onClick={() => {
                        setCurrentPi(proformaInvoice);
                        handleReject(proformaInvoice._id);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="button_edit_pdf button_approve"
                      onClick={() => handleApprove(proformaInvoice._id)}
                    >
                      Approve
                    </button>
                  </div>
                </td>
                <td className={colorByUpdate(proformaInvoice.createdAt, proformaInvoice.updatedAt)}>
                  {proformaInvoice.managerMessage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PIActionsAdmin;
