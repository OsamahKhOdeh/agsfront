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
      <div class="radio-toolbar">
       <input type="radio" id="radioAll" name="radioStatus" value="All" />
       <label for="radioAll">All</label>
       <input type="radio" id="radioBooked" name="radioStatus" value="Booked"/>
       <label for="radioBooked">Booked</label> 
       <input type="radio" id="radioComing" name="radioStatus" value="Coming" />
       <label for="radioComing">Coming</label>
       <input type="radio" id="radioAvailable" name="radioStatus" value="Available"/>
       <label for="radioAvailable">Available</label> 
     </div>
      <div class="radio-toolbar" onChange={handleLocationChange}>
       <input type="radio" id="radioBanana" name="radioFruit" checked={location==="freezone"} value="freezone" />
       <label for="radioBanana">Freezone</label>
       <input type="radio" id="radioOrange" name="radioFruit" checked={location==="local"} value="local"/>
       <label for="radioOrange">Local</label> 
     </div>
     <div class="radio-toolbar" onChange={handleCurrencyChange}>
       <input type="radio" id="radioBananaf" checked={currency==="AED"} name="radioFruitf" value="AED" />
       <label for="radioBananaf">AED</label>
       <input type="radio" id="radioOrangef" checked={currency==="USD"} name="radioFruitf" value="USD"/>
       <label for="radioOrangef">USD</label> 
     </div>
     <div class="cat comedy">
      <label>
      <input onChange={handleShowDatasheetChange} type="checkbox" checked={showDatasheet} value="1"/><span>Datasheet</span>
      </label>
     </div>
     <div class="cat comedy">
      <label>
      <input onChange={handleShowPriceChange} type="checkbox" checked={showPrice} value="1"/><span>Price</span>
      </label>
     </div><div class="cat comedy">
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