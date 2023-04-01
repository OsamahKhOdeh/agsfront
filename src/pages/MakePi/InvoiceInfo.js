import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core";
import * as api from "../../api/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setPICurrencyLocation, setPiInfo, setPiNo } from "../../store/piSlice";
import { bank_details, exporters, final_distination, notify_partys, party_of_discharge, terms_and_conditions, terms_collections } from "./data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InvoiceInfo() {
  const navigate = useNavigate();
  const pi = useSelector((state) => state.pi.isPi);
  const dispatch = useDispatch();
  const [piNoState, setPiNoState] = useState(0);
  const invoiceNumber = useSelector((state) => state.pi.piInfo.invoiceNo);
  const currency = useSelector((state)=>state.filters.currency);
   const location =useSelector((state)=>state.filters.location);
  useEffect(() => {
    async function getLast() {
      const lasto = await api.getLastPiNo();
      console.log(lasto.data);
      setPiNoState(lasto.data+1);
      dispatch(setPiNo(lasto.data));
     
    }
    getLast();
  }, [dispatch]);
  const [exporter, setExporter] = useState("");
  const [invoiceInfo, setInvoiceInfo] = useState({
    //   piProducts: [],
    invoiceNo: useSelector((state) => state.pi.piInfo.invoiceNo),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    exporter: "",
    buyerAdress: "",
    consignee: "",
    notifyParty: "",
    partyOfDischarge: "",
    finalDistination: "",
    discount: 0,
    additions:0,
    phoneNumber : "",
    note : "",
    location : location,
    currency : currency
  });
  
  const handleChange = (event) => {
    setInvoiceInfo({ ...invoiceInfo,invoiceNo : piNoState ,[event.target.name]: event.target.value });
    dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, [event.target.name]: event.target.value }));
  };

  const [terms, setTerms] = useState([]);
  const handelTermsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTerms([...terms, value]);
      dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :[...terms, value]   }));
    } else {
      setTerms(terms.filter((e) => e !== value));
      dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms.filter((e) => e !== value)  }));

    }
  };

  const handleCollectionChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "EXWAREHOUSE":
       // setTerms([...terms,[...terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms]]);
       setTerms(terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms);
       dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms}));

        break;
        case "FOB":
        setTerms(terms_collections.filter(coll=>{return coll.collection === "FOB" })[0].terms);
        dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "FOB" })[0].terms}));

        break;
        case "CIF":
        setTerms(terms_collections.filter(coll=>{return coll.collection === "CIF" })[0].terms);
        dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "CIF" })[0].terms}));

        break;
    
      default:
        break;
    }
    console.log((terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" }))[0]);
    console.log(terms_collections);
  };

  console.log(terms);
  // const invoiceNo = useSelector((state)=>state.pi.piInfo.invoiceNo) console.log();
  return (
    <React.Fragment>
     
      <Grid container spacing={4}>
      
        <Grid style={{ paddingBottom: "30px" }} item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">EXPORTER</InputLabel>
            <Select name="exporter" value={invoiceInfo.exporter} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={exporters[0].value}>{exporters[0].name}</MenuItem>
              <MenuItem value={exporters[1].value}>{exporters[1].name}</MenuItem>
              <MenuItem value={exporters[2].value}>{exporters[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField name="buyerAdress" value={invoiceInfo.buyerAdress} onChange={handleChange} label="BUYER ADDRESS" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="phoneNumber" value={invoiceInfo.phoneNumber} onChange={handleChange} label="Phone Number" fullWidth></TextField>
        </Grid>
        {pi && <Grid item xs={12} sm={6}>
          <TextField name="consignee" value={invoiceInfo.consignee} onChange={handleChange} label="CONSIGNEE" fullWidth></TextField>
        </Grid>}
       {pi && <><Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">NOTIFY PARTY</InputLabel>
            <Select name="notifyParty" value={invoiceInfo.notifyParty} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={notify_partys[0].value}>{notify_partys[0].name}</MenuItem>
              <MenuItem value={notify_partys[1].value}>{notify_partys[1].name}</MenuItem>
              <MenuItem value={notify_partys[2].value}>{notify_partys[2].name}</MenuItem>
              <MenuItem value={notify_partys[3].value}>{notify_partys[3].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">PARTY OF DISCHARGE</InputLabel>
            <Select name="partyOfDischarge" value={invoiceInfo.partyOfDischarge} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={party_of_discharge[0].value}>{party_of_discharge[0].name}</MenuItem>
              <MenuItem value={party_of_discharge[1].value}>{party_of_discharge[1].name}</MenuItem>
              <MenuItem value={party_of_discharge[2].value}>{party_of_discharge[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField name="partyOfDischarge" value={invoiceInfo.partyOfDischarge} onChange={handleChange} label="PARTY OF DISCHARGE" fullWidth></TextField>
        </Grid>
        </>
       }
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">FINAL DESTINATION</InputLabel>
            <Select name="finalDistination" value={invoiceInfo.finalDistination} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={final_distination[0].value}>{final_distination[0].name}</MenuItem>
              <MenuItem value={final_distination[1].value}>{final_distination[1].name}</MenuItem>
              <MenuItem value={final_distination[2].value}>{final_distination[2].name}</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField name="finalDistination" value={invoiceInfo.finalDistination} onChange={handleChange} label="FINAL DESTINATION" fullWidth></TextField>
        </Grid>
        {pi && <>
        <Grid item xs={12} sm={6}>
          <TextField name="invoiceNo" value={invoiceNumber} label="INVOICE NUMBER" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="discount" value={invoiceInfo.discount} onChange={handleChange} label="Discount" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="additions" value={invoiceInfo.additions} onChange={handleChange} label="Additions" fullWidth></TextField>
        </Grid>
        </> }
        <Grid item xs={12} sm={6}>
          <TextField name="date" value={invoiceInfo.date} label="DATE MM/DD/YYYY" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="note" value={invoiceInfo.note} onChange={handleChange} label="Notes" fullWidth></TextField>
        </Grid>
        
       {pi && <><Grid item xs={12} sm={6}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Terms Collections : </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleCollectionChange}
            >
             <FormControlLabel  value="EXWAREHOUSE" control={<Radio />} label="EXWAREHOUSE" />
             <FormControlLabel  value="FOB" control={<Radio />} label="FOB" />
             <FormControlLabel  value="CIF" control={<Radio />} label="CIF" />
            </RadioGroup>
           </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <InputLabel id="demo-simple-select-label">Bank Details : </InputLabel>
        <div>
          <div style={{display : "flex" , flexDirection : "row"}} className="col-md-12">
            {bank_details.map((item, i) => (
              <div className="form-check m-3" key={i}>
                <input className="form-check-input" type="checkbox" name="bank" value={item.collection} id="flexCheckDefault" onChange={handelTermsChange} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {item.collection}
                </label>
              </div>
            ))}
            </div>
            </div>
        </Grid>
      
      
        <div>
          <div className="col-md-12">
            {terms_and_conditions.map((term, i) => (
              <div className="form-check m-3" key={i}>
                <input className="form-check-input" type="checkbox" name="terms" value={term.term} id="flexCheckDefault" onChange={handelTermsChange} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {term.term}
                </label>
              </div>
            ))}
            </div>
            </div>

            </>}

      </Grid>
    </React.Fragment>
  );
}

export default InvoiceInfo;
