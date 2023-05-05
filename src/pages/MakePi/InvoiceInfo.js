import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLastPiNo } from "../../actions/proformaInvoice.js";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import * as api from "../../api/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeliveryDate,
  setPaymentPercentage,
  setPiAdditions,
  setPiBankDetails,
  setPiBuyerAdress,
  setPiConsignee,
  setPICurrencyLocation,
  setPiDiscount,
  setPiExporter,
  setPiFinalDistination,
  setPiInfo,
  setPinNotifyParty,
  setPiNo,
  setPiNote,
  setPiPartyOfDischarge,
  setPiPhoneNumber,
  setPiTerms,
} from "../../store/piSlice";
import {
  bank_details,
  exporters,
  final_distination,
  notify_partys,
  party_of_discharge,
  terms_and_conditions,
  terms_and_conditions_pricelist,
  terms_collections,
} from "./data";

function InvoiceInfo() {
  const navigate = useNavigate();
  const pi = useSelector((state) => state.pi.isPi);
  const dispatch = useDispatch();
  const [piNoState, setPiNoState] = useState(0);
  const [paymentPercentageState, setPaymentPercentageState] = useState(
    useSelector((state) => state.pi.piInfo?.paymentPercentage)
  );
  const [deliveryDateState, setDeliveryDateState] = useState(useSelector((state) => state.pi.piInfo?.deliveryDate));
  const invoiceNumber = useSelector((state) => state.pi.piInfo.invoiceNo);
  const currency = useSelector((state) => state.filters.currency);
  const location = useSelector((state) => state.filters.location);

  let terms_and_conditions_pi_pricelist = [];
  if (pi) {
    terms_and_conditions_pi_pricelist = terms_and_conditions;
  } else terms_and_conditions_pi_pricelist = terms_and_conditions_pricelist;

  useEffect(() => {
    dispatch(getLastPiNo());
  }, []);
  const [exporter, setExporter] = useState("");
  const [invoiceInfo, setInvoiceInfo] = useState({
    //   piProducts: [],
    invoiceNo: useSelector((state) => state.pi.piInfo.invoiceNo),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    exporter: useSelector((state) => state.pi.piInfo.exporter),
    buyerAdress: useSelector((state) => state.pi.piInfo.buyerAdress),
    consignee: useSelector((state) => state.pi.piInfo.consignee),
    notifyParty: useSelector((state) => state.pi.piInfo.notifyParty),
    partyOfDischarge: useSelector((state) => state.pi.piInfo.partyOfDischarge),
    finalDistination: useSelector((state) => state.pi.piInfo.finalDistination),
    discount: useSelector((state) => state.pi.piInfo.discount),
    additions: useSelector((state) => state.pi.piInfo.additions),
    phoneNumber: useSelector((state) => state.pi.piInfo.phoneNumber),
    note: useSelector((state) => state.pi.piInfo.invoiceNo),
    terms: useSelector((state) => state.pi.piInfo.terms),
    bankDetails: useSelector((state) => state.pi.piInfo.bankDetails),
    location: location,
    currency: currency,
  });
  const [terms, setTerms] = useState(useSelector((state) => state?.pi.piInfo.terms));
  const [bankDetailsCollection, setBankDetailsCollection] = useState(
    useSelector((state) => state?.pi?.piInfo?.bankDetails)
  );

  /* ------------------------------ data handling ------------------------------ */

  const handleChange = (event) => {
    // dispatch(getLastPiNo());
    setInvoiceInfo({ ...invoiceInfo, [event.target.name]: event.target.value });
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    switch (propertyName) {
      case "exporter":
        dispatch(setPiExporter(propertyValue));
        break;
      case "buyerAdress":
        dispatch(setPiBuyerAdress(propertyValue));
        break;
      case "phoneNumber":
        dispatch(setPiPhoneNumber(propertyValue));
        break;
      case "consignee":
        dispatch(setPiConsignee(propertyValue));
        break;
      case "notifyParty":
        dispatch(setPinNotifyParty(propertyValue));
        break;
      case "partyOfDischarge":
        dispatch(setPiPartyOfDischarge(propertyValue));
        break;
      case "finalDistination":
        dispatch(setPiFinalDistination(propertyValue));
        break;
      case "discount":
        dispatch(setPiDiscount(propertyValue));
        break;
      case "additions":
        dispatch(setPiAdditions(propertyValue));
        break;
      case "terms":
        dispatch(setPiTerms(propertyValue));
        break;
      case "note":
        dispatch(setPiNote(propertyValue));
        break;

      default:
        break;
    }
    //dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, [event.target.name]: event.target.value }));
  };
  const handelTermsChange = (e) => {
    dispatch(setPaymentPercentage(paymentPercentageState));
  };
  const handelDeliveryDateChange = (e) => {
    dispatch(setDeliveryDate(deliveryDateState));
  };
  const handelBankDetailsChange = (e) => {
    const { value, checked } = e.target;
    let newBankDetails = [...invoiceInfo.bankDetails];
    if (checked) {
      newBankDetails.push(value);
      //  setInputs(values => ({...values, bankDetails: newBankDetails}))
      setInvoiceInfo((values) => ({ ...values, bankDetails: newBankDetails }));
      dispatch(setPiBankDetails(newBankDetails));
    } else {
      //  setInputs(values => ({...values, bankDetails: inputs.bankDetails.filter((e) => e !== value)}))
      setInvoiceInfo((values) => ({ ...values, bankDetails: newBankDetails.filter((e) => e !== value) }));
      dispatch(setPiBankDetails(newBankDetails.filter((e) => e !== value)));
    }
  };

  const handleCollectionChange = (e) => {
    const { value } = e.target;
    setTerms(value);
    dispatch(setPiTerms(value));
  };
  /* ---------------------------- end data handling --------------------------- */

  // const invoiceNo = useSelector((state)=>state.pi.piInfo.invoiceNo) console.log();
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid style={{ paddingBottom: "30px" }} item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">EXPORTER</InputLabel>
            <Select
              name="exporter"
              value={invoiceInfo.exporter}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {exporters.map((exporter) => (
                <MenuItem key={exporter.name} value={exporter.value}>
                  {exporter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField
            name="buyerAdress"
            value={invoiceInfo.buyerAdress}
            onChange={handleChange}
            label="BUYER ADDRESS"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phoneNumber"
            value={invoiceInfo.phoneNumber}
            onChange={handleChange}
            label="Phone Number"
            fullWidth
          ></TextField>
        </Grid>
        {pi && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="consignee"
              value={invoiceInfo.consignee}
              onChange={handleChange}
              label="CONSIGNEE"
              fullWidth
            ></TextField>
          </Grid>
        )}
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">NOTIFY PARTY</InputLabel>
                <Select
                  name="notifyParty"
                  value={invoiceInfo.notifyParty}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {notify_partys.map((notify_party) => (
                    <MenuItem key={notify_party.name} value={notify_party.value}>
                      {notify_party.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">PARTY OF DISCHARGE</InputLabel>
                <Select
                  name="partyOfDischarge"
                  value={invoiceInfo.partyOfDischarge}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {party_of_discharge.map((party) => (
                    <MenuItem key={party.name} value={party.value}>
                      {party.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="partyOfDischarge"
                value={invoiceInfo.partyOfDischarge}
                onChange={handleChange}
                label="PARTY OF DISCHARGE"
                fullWidth
              ></TextField>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">FINAL DESTINATION</InputLabel>
            <Select
              name="finalDistination"
              value={invoiceInfo.finalDistination}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {final_distination.map((dest) => (
                <MenuItem key={dest.name} value={dest.value}>
                  {dest.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            name="finalDistination"
            value={invoiceInfo.finalDistination}
            onChange={handleChange}
            label="FINAL DESTINATION"
            fullWidth
          ></TextField>
        </Grid>
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField name="invoiceNo" value={invoiceNumber} label="INVOICE NUMBER" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="discount"
                value={invoiceInfo.discount}
                onChange={handleChange}
                label="Discount"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="additions"
                value={invoiceInfo.additions}
                onChange={handleChange}
                label="Additions"
                fullWidth
              ></TextField>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <TextField name="date" value={invoiceInfo.date} label="DATE MM/DD/YYYY" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="note" value={invoiceInfo.note} onChange={handleChange} label="Notes" fullWidth></TextField>
        </Grid>
        {pi && (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Terms Collections : </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleCollectionChange}
                  value={terms}
                >
                  <FormControlLabel value="EXWAREHOUSE" control={<Radio />} label="EXWAREHOUSE" />
                  <FormControlLabel value="FOB" control={<Radio />} label="FOB" />
                  <FormControlLabel value="CIF" control={<Radio />} label="CIF" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">Bank Details : </InputLabel>
              <div>
                <div style={{ display: "flex", flexDirection: "row" }} className="col-md-12">
                  {bank_details.map((item, i) => (
                    <div className="form-check m-3" key={i}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="bank"
                        checked={invoiceInfo.bankDetails?.includes(item.collection)}
                        value={item.collection}
                        id="flexCheckDefault"
                        onChange={handelBankDetailsChange}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.collection}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12}>
          <div className="">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Goods will be delivered with in <b>{deliveryDateState}</b> days after completion of full payment
            </label>
            <input
              value={deliveryDateState}
              onChange={(e) => {
                setDeliveryDateState(e.target.value);
              }}
              type="text"
              onBlur={handelDeliveryDateChange}
              style={{ border: "solid", padding: "10px", width: "75px", marginLeft: "20px" }}
            ></input>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Advance Payment <b>{paymentPercentageState}%</b> Balance to be paid time providing copy of BL
            </label>
            <input
              value={paymentPercentageState}
              onChange={(e) => {
                setPaymentPercentageState(e.target.value);
              }}
              type="text"
              onBlur={handelTermsChange}
              style={{ border: "solid", padding: "10px", width: "75px", marginLeft: "20px" }}
            ></input>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InvoiceInfo;
