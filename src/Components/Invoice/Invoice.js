import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import logo_agc from "./logo_ags.png";
import logo_ajs from "./logo_ajs.png";
import ags_stamp from "./ags_stamp.png";
import ajs_stamp from "./ajs_stamp.png";

import piFooter from "./pifooter.png";
import InvoiceInfo from "./InvoiceInfo";
import { useSelector } from "react-redux";
import InvoiceTerms from "./InvoiceTerms";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 15,
    paddingLeft: 35,
    paddingRight: 35,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: "100%",
    height: 66,
    marginLeft: "0",
    marginRight: "0",
  },
  pi_footer: {
    width: "100%",
    marginLeft: "0",
    marginRight: "0",
  },
});

const Invoice = ({ pi, currency }) => {
  let logo = logo_agc;
  let stamp = ags_stamp;
  console.log(pi.piInfo.exporter);
  if (pi.piInfo.exporter === "ABDULJALIL CHHADA AUTO SPARE PARTS TRADING LLC DEIRA NAIF, AL MAKTOUM HOSPITAL ROAD    CONTACT:+971 558952656,   Email: info@jalil.ae") {
    logo = logo_ajs;
    stamp = ajs_stamp;
  }
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <InvoiceTitle title="PROFORMA INVOICE" />
        <InvoiceInfo piInfo={pi.piInfo} />
        <InvoiceItemsTable products={pi.piProducts} discount={pi.piInfo.discount} currency={currency} />
        <InvoiceTerms />
        <Image style={styles.pi_footer} src={stamp} />
      </Page>
    </Document>
  );
};
export default Invoice;
