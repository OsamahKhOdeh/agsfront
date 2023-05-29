import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 9,
    flexGrow: 1,
  },
  containerTotal: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 9,
    flexGrow: 1,
  },
  no: { width: "3%", borderRightColor: borderColor, borderRightWidth: 1, height: "100%", paddingTop: 1 },

  description: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
    fontSize: 8,
  },
  amount: { borderRightColor: borderColor, borderRightWidth: 1, width: "11%", height: "100%", paddingTop: 1 },

  amount2: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
  },
  amountTotal: { borderRightColor: borderColor, borderRightWidth: 1, width: "11%", height: "100%", paddingTop: 1, fontWeight: "bold" },

  amount2Total: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
    fontWeight: "bold",
  },
  descriptionTotal: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
    fontSize: 8,
  },
});

const InvoiceTableRow = ({ truckItem }) => {
  let no = 0;
  const rows = truckItem.truckProductItems.map((item, index) => (
    <View style={styles.container} key={index}>
      <Text style={styles.no}>{index + 1}</Text>
      <Text style={styles.description}>
        {item.productCategory}&nbsp;
        {item.productCode}&nbsp;/&nbsp;{item.productCapacity}
      </Text>
      <Text style={styles.amount}>{item.productQty}</Text>
      <Text style={styles.amount}>{item.productPalletQty}</Text>
      <Text style={styles.amount}>{item.productTotalNetWeight}</Text>
      <Text style={styles.amount}>{item.productTotalGrossWeight}</Text>
      <Text style={styles.amount2}>{item.productTotalAmount}</Text>
    </View>
  ));
  return (
    <Fragment>
      {rows}
      <View style={styles.containerTotal}>
        <Text style={styles.no}> </Text>
        <Text style={styles.descriptionTotal}>TOTAL</Text>
        <Text style={styles.amountTotal}>{truckItem.truckTotalPackages}</Text>
        <Text style={styles.amountTotal}>{truckItem?.truckTotalPallets}</Text>
        <Text style={styles.amountTotal}>{truckItem.truckNetWeight}</Text>
        <Text style={styles.amountTotal}>{truckItem.truckGrossWeight}</Text>
        <Text style={styles.amount2Total}>{truckItem?.truckTotalAmount}</Text>
      </View>
    </Fragment>
  );
};

export default InvoiceTableRow;
