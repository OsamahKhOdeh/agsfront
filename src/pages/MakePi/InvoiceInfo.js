import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@material-ui/core";
import * as api from "../../api/index.js";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentPercentage, setPiAdditions, setPiBankDetails, setPiBuyerAdress, setPiConsignee, setPICurrencyLocation, setPiDiscount, setPiExporter, setPiFinalDistination, setPiInfo, setPinNotifyParty, setPiNo, setPiNote, setPiPartyOfDischarge, setPiPhoneNumber, setPiTerms } from "../../store/piSlice";
import { bank_details, exporters, final_distination, notify_partys, party_of_discharge, terms_and_conditions, terms_and_conditions_pricelist, terms_collections } from "./data";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLastPiNo } from "../../actions/proformaInvoice.js";

function InvoiceInfo() {
  const navigate = useNavigate();
  const pi = useSelector((state) => state.pi.isPi);
  const dispatch = useDispatch();
  const [piNoState, setPiNoState] = useState(0);
  const [paymentPercentageState , setPaymentPercentageState] = useState(useSelector((state) => state.pi.piInfo?.paymentPercentage));
  const invoiceNumber = useSelector((state) => state.pi.piInfo.invoiceNo);
  const currency = useSelector((state)=>state.filters.currency);
   const location =useSelector((state)=>state.filters.location);

   /** 
  useEffect(() => {
    async function getLast() {
      const lasto = await api.getLastPiNo();
      dispatch(getLastPiNo())
      console.log(lasto.data);
      setPiNoState(lasto.data+1);
     // dispatch(setPiNo(lasto.data));
     
    }
    getLast();

  }, []);
*/
  let terms_and_conditions_pi_pricelist = [];
  if(pi){
    terms_and_conditions_pi_pricelist = terms_and_conditions;
  }else
  terms_and_conditions_pi_pricelist = terms_and_conditions_pricelist;

  useEffect(() => {dispatch(getLastPiNo())},[])
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
    additions:useSelector((state) => state.pi.piInfo.additions),
    phoneNumber : useSelector((state) => state.pi.piInfo.phoneNumber),
    note : useSelector((state) => state.pi.piInfo.invoiceNo),
    terms : useSelector((state) => state.pi.piInfo.terms),
    location : location,
    currency : currency
  });
  
  const handleChange = (event) => {
    dispatch(getLastPiNo());
    setInvoiceInfo({ ...invoiceInfo,invoiceNo : piNoState ,[event.target.name]: event.target.value });
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    switch (propertyName) {
      case "exporter":
        dispatch(setPiExporter(propertyValue))
        break;
      case "buyerAdress" :
        dispatch(setPiBuyerAdress(propertyValue));
        break;
      case "phoneNumber" : 
        dispatch(setPiPhoneNumber(propertyValue))
        break;
      case "consignee" : 
        dispatch(setPiConsignee(propertyValue))
        break;
      case "notifyParty" :
        dispatch(setPinNotifyParty(propertyValue))
        break
      case "partyOfDischarge" : 
        dispatch(setPiPartyOfDischarge(propertyValue))
        break;
      case "finalDistination" : 
        dispatch(setPiFinalDistination(propertyValue))
        break
      case "discount" : 
        dispatch(setPiDiscount(propertyValue))
        break
      case "additions" :
        dispatch(setPiAdditions(propertyValue))
        break
      case "terms" :
        dispatch(setPiTerms(propertyValue))
        break
      case "note" :
        dispatch(setPiNote(propertyValue))
        break;
      
      default:
        break;
    }
    //dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, [event.target.name]: event.target.value }));
  };

  const [terms, setTerms] = useState(useSelector((state) => state?.pi.piInfo.terms));
  const [bankDetailsCollection, setBankDetailsCollection] = useState(useSelector((state) => state?.pi?.piInfo?.bankDetails));
  console.log(bankDetailsCollection);
  const handelTermsChange = (e) => {
        dispatch(setPaymentPercentage(paymentPercentageState))
  };
  const handelBankDetailsChange = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);

     
  };
  console.log(bankDetailsCollection);

  const handleCollectionChange = (e) => {
    const { value } = e.target;
    setTerms(value);
    dispatch(setPiTerms(value))
   {/* switch (value) {
      case "EXWAREHOUSE":
        // setTerms([...terms,[...terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms]]);
       setTerms(terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms);
       dispatch(setPiTerms(terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms))
       //dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" })[0].terms}));

        break;
        case "FOB":
        setTerms(terms_collections.filter(coll=>{return coll.collection === "FOB" })[0].terms);
        dispatch(setPiTerms(terms_collections.filter(coll=>{return coll.collection === "FOB" })[0].terms))
       // dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "FOB" })[0].terms}));

        break;
        case "CIF":
        setTerms(terms_collections.filter(coll=>{return coll.collection === "CIF" })[0].terms);
        dispatch(setPiTerms(terms_collections.filter(coll=>{return coll.collection === "CIF" })[0].terms))
       // dispatch(setPiInfo({ ...invoiceInfo,invoiceNo : piNoState, terms :terms_collections.filter(coll=>{return coll.collection === "CIF" })[0].terms}));

        break;
    
      default:
        break;
    }
    console.log((terms_collections.filter(coll=>{return coll.collection === "EXWAREHOUSE" }))[0]);
  console.log(terms_collections); */}
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
              value={terms}
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
                <input className="form-check-input" type="checkbox" name="bank" checked={bankDetailsCollection?.includes(item.collection)} value={item.collection} id="flexCheckDefault" onChange={handelBankDetailsChange} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {item.collection}
                </label>
              </div>
            ))}
            </div>
            </div>
        </Grid>
      
        

            </>}
            <Grid item xs={12} sm={12}>
          <div className="">
            
                <label className="form-check-label" htmlFor="flexCheckDefault">
                Advance Payment <b>{paymentPercentageState}%</b> Balance to be paid time providing copy of BL
                </label>
                <input value={paymentPercentageState} onChange={(e)=>{setPaymentPercentageState(e.target.value)}} type="text" 
                onBlur={handelTermsChange} style={{border : "solid" , padding : "10px" , width : "75px" , marginLeft : "20px"}} ></input>
              </div>
              
            
           </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default InvoiceInfo;
