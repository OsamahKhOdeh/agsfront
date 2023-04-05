import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import './side_filters_styles.css';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrency,
  changeLocation,
  setUsdToAedRate,
} from "../../../store/filtersSlice";
import {
  changeShowDatasheet,
  changeShowPrice,
  changeShowStock,
} from "../../../store/showingSlice";
import { availabiltyStatus, priceCurrency, priceOnLocation } from "../data";

const SideFilters = () => {
  const dispatch = useDispatch();
  //Side Filters//////////////////////////////////////////////

  const [showPrice, setShowPrice] = useState(
    useSelector((state) => state.show.showPrice)
  );
  const [showStock, setShowStock] = useState(
    useSelector((state) => state.show.showStock)
  );
  const [showDatasheet, setShowDatasheet] = useState(
    useSelector((state) => state.show.showDatasheet)
  );

  const handleShowPriceChange = (e) => {
    setShowPrice(e.target.checked);
    dispatch(changeShowPrice(!showPrice));
  };
  const handleShowStockChange = (e) => {
    setShowStock(e.target.checked);
    dispatch(changeShowStock(!showStock));
  };

  const handleShowDatasheetChange = (e) => {
    setShowDatasheet(e.target.checked);
    dispatch(changeShowDatasheet(!showDatasheet));
  };
  ////////////////////////////////////////////Usd To Aed //////
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  const [usdToAedRateUseState, setUsdToAedRateUseState] = useState(
    useSelector((state) => state.filters.usdToAedRate)
  );
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const handleCurrencyChange = (e) => {
    dispatch(changeCurrency(e.target.value));
  };
  const handleLocationChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLocation(e.target.value));
  };

  //Hid & Show Filters //////////////////////////////////////////////////////////////
  return (
    <div className="side_filters" > 
      <div className="radio-toolbar">
       <input type="radio" id="radioAll" name="radioStatus" value="All" />
       <label htmlFor="radioAll">All</label>
       <input type="radio" id="radioBooked" name="radioStatus" value="Booked"/>
       <label htmlFor="radioBooked">Booked</label> 
       <input type="radio" id="radioComing" name="radioStatus" value="Coming" />
       <label htmlFor="radioComing">Coming</label>
       <input type="radio" id="radioAvailable" name="radioStatus" value="Available"/>
       <label htmlFor="radioAvailable">Available</label> 
     </div>
      <div className="radio-toolbar" onChange={handleLocationChange}>
       <input type="radio" id="radioBanana" name="radioFruit" onChange={()=>{}} checked={location==="freezone"} value="freezone" />
       <label htmlFor="radioBanana">Freezone</label>
       <input type="radio" id="radioOrange" name="radioFruit" onChange={()=>{}} checked={location==="local"} value="local"/>
       <label htmlFor="radioOrange">Local</label> 
     </div>
     <div className="radio-toolbar" onChange={handleCurrencyChange}>
       <input type="radio" id="radioBananaf" onChange={()=>{}} checked={currency==="AED"} name="radioFruitf" value="AED" />
       <label htmlFor="radioBananaf">AED</label>
       <input type="radio" id="radioOrangef" onChange={()=>{}} checked={currency==="USD"} name="radioFruitf" value="USD"/>
       <label htmlFor="radioOrangef">USD</label> 
     </div>
     <div className="cat comedy">
      <label>
      <input onChange={handleShowDatasheetChange} type="checkbox" checked={showDatasheet} value="1"/><span>Datasheet</span>
      </label>
     </div>
     <div className="cat comedy">
      <label>
      <input onChange={handleShowPriceChange} type="checkbox" checked={showPrice} value="1"/><span>Price</span>
      </label>
     </div><div className="cat comedy">
      <label>
      <input onChange={handleShowStockChange} type="checkbox" checked={showStock} value="1"/><span>Stock</span>
      </label>
     </div>
    </div>
  );
};

export default SideFilters;


/*<Paper style={{ display: "flex", backgroundColor: "#c5d2d4" }}>
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox checked={showPrice} onChange={handleShowPriceChange} />
            }
            label='Price'
          />
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox checked={showStock} onChange={handleShowStockChange} />
            }
            label='Stock'
          />
          <FormControlLabel
            style={{ flex: 1 }}
            control={
              <Checkbox
                checked={showDatasheet}
                onChange={handleShowDatasheetChange}
              />
            }
            label='Datasheet'
          />
        </Paper>
        <Paper>
          <TextField
            label='Promo Code'
            id='outlined-size-small'
            fullWidth
            variant='outlined'
            defaultValue=''
            size='medium'
          />
        </Paper>*/