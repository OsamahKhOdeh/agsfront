import React, { Fragment } from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 75,
    fontStyle: "bold",
    fontSize: "10px",
  },
  no: {
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  description: {
    width: "45%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  price: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  image: {
    width: "25%",
    height: 75,
    marginLeft : "10px",
    textAlign: "right",
    paddingRight: 8,
  },
  logo: {
    width: "100%",
    height: 66,
    marginLeft: "0",
    marginRight: "0",
  },
});

const InvoiceTableRow = ({ products, currency ,location, usdToAedRate}) => {
  
console.log("LOOOOOOOOOO"+location);
function calcPrice(item) {
  let price =0;
  if(location === "freezone" && currency === "AED"){
    price = item.freezonePriceAED;
  }
  if(location === "local" && currency === "AED"){
    price = item.LocalPriceAED;
  }
  if(location === "freezone" && currency === "USD"){
    price = item.freezonePrice;
  }if(location === "local" && currency === "USD"){
    price = item.LocalPrice;
  }
  
  return price;
}
  let no = 0;
  const rows = products.map((item , index) => (
    <View style={styles.row}  key={index}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.brand}&nbsp;
        {item.code}&nbsp;/&nbsp;{item.capacity}
      </Text>
      <Text style={styles.price}>
        {calcPrice(item).toFixed(2)}
          &nbsp;&nbsp;
        {currency}
      </Text>
      <Image style={styles.image} src={
                  item.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png" ?  item.image  :   process.env.PUBLIC_URL+`images/${item._id}_1.png` ||  `images/${item._id}_1.jpg` || `images/${item._id}_1.JPG`
            }  />
     
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
