import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

import { po } from "./dummyPo.js";
import Invoice from "./Invoice.js";
import InvoiceInfo from "./InvoiceInfo.js";
const PurchaseOrderPdf = () => {
  return (
    <div style={{ width: "100%" }}>
      <PDFViewer width="100%" height="1200" className="app">
        <Invoice po={po} />
      </PDFViewer>
    </div>
  );
};

export default PurchaseOrderPdf;
