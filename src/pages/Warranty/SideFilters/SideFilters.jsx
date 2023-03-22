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
    <div>
      <div class="radio-toolbar">
       <input type="radio" id="radioBananafq" name="radioFruitfq" value="All" />
       <label for="radioBananafq">All</label>
       <input type="radio" id="radioOrangef1" name="radioFruitf1" value="Booked"/>
       <label for="radioOrangef1">Booked</label> 
       <input type="radio" id="radioBananafqq" name="radioFruitfqq" value="Coming" />
       <label for="radioBananafq">Coming</label>
       <input type="radio" id="radioOrangef1q" name="radioFruitf1q" value="Available"/>
       <label for="radioOrangef1">Available</label> 
     </div>
      <div class="radio-toolbar" onChange={handleLocationChange}>
       <input type="radio" id="radioBanana" name="radioFruit" value="freezone" />
       <label for="radioBanana">Freezone</label>
       <input type="radio" id="radioOrange" name="radioFruit" value="local"/>
       <label for="radioOrange">Local</label> 
     </div>
     <div class="radio-toolbar" onChange={handleCurrencyChange}>
       <input type="radio" id="radioBananaf" name="radioFruitf" value="AED" />
       <label for="radioBananaf">AED</label>
       <input type="radio" id="radioOrangef" name="radioFruitf" value="USD"/>
       <label for="radioOrangef">USD</label> 
     </div>
      <Grid item xs={12} sm={6} md={8}>
        
       
        
        
      </Grid>
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