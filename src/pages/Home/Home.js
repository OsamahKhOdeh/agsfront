import React, { useState } from "react";
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import useStyles from "./styles";
import Products from "../../Components/Products/Products";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {username ,isAdmin , status} = useAuth();

  return (
    <Grow in>
      <Container style={{  flexDirection: "column", alignItems: "center", width: "900px" }} maxWidth="xl">
        <Button style={{ width: "25%", padding: "25px", margin : "20px" , backgroundColor: "#c1daf7" }} variant="outlined" onClick={() => navigate("/user/makepi")}>
          Make PI
        </Button>{" "}
       {isAdmin && <Button style={{ width: "25%", padding: "25px" , margin : "20px" , backgroundColor : "#f7746a" }} variant="outlined" onClick={() => navigate("/user/admin")}>
          Admin
        </Button>}
        <Button style={{ width: "25%", padding: "25px", margin : "20px"  }} variant="contained">
          Make PKL
        </Button>
        <Button style={{ width: "25%", padding: "25px", backgroundColor: "#c1daf7" , margin : "20px" }} variant="contained" onClick={() => navigate("/user/warranty")}>
          PriceList{" "}
        </Button>
        {/* { isAdmin && <Button style={{ width: "25%", padding: "25px" , margin : "20px" }} variant="outlined">
          Show PIs
        </Button>}
        {isAdmin && <Button style={{ width: "25%", padding: "25px", margin : "20px"  }} variant="contained">
          Show PKLs
        </Button>}
        {isAdmin && <Button style={{ width: "25%", padding: "25px" , margin : "20px" }} variant="outlined">
          Edit Price
        </Button>}
        {isAdmin && <Button style={{ width: "25%", padding: "25px" , margin : "20px" }} variant="contained">
          Promo Codes{" "}
        </Button>} */}
        {isAdmin && <Button style={{ width: "25%", padding: "25px", margin : "20px"  ,backgroundColor : "#f7746a" }} variant="outlined" onClick={() => navigate("/user/addproduct")}>
          Add Products
        </Button>}
       {/* <Button style={{ width: "25%", padding: "25px" , margin : "20px" }} variant="contained">
          Edit Product Card
        </Button>
        <Button style={{ width: "25%", padding: "25px" , margin : "20px" }} variant="outlined">
          Add Stock
        </Button>*/}
      </Container>
    </Grow>
  );
};

export default Home;
