import React from "react";
import { useState } from "react";
import ProformaInvoiceOrders from "./ProformaInvoiceOrders/ProformaInvoiceOrders";
import SignedProformaInvoices from "./SignedProformaInvoices/SignedProformaInvoices";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  let pageContent = <ProformaInvoiceOrders />;
  const [page, setPage] = useState("orders");
  switch (page) {
    case "orders":
      pageContent = <ProformaInvoiceOrders />;
      break;
    case "confirmedOrders":
      pageContent = <SignedProformaInvoices />;
      break;
    default:
      break;
  }
  return (
    <div>
      <div className="navigation_bar">
        <button className="btn_nav" onClick={() => setPage("orders")}>
          Orders Page
        </button>
        <button className="btn_nav" onClick={() => setPage("confirmedOrders")}>
          confirmedOrders
        </button>
      </div>

      {pageContent}
    </div>
  );
};

export default Orders;
