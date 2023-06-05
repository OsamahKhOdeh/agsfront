import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

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
    fontSize: 10,
    flexGrow: 1,
  },
  containerTruck: {
    backgroundColor: "#c9eaf2",
    flexDirection: "row",

    borderColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 17,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 10,
    flexGrow: 1,
  },
  no: { width: "3%", borderRightColor: borderColor, borderRightWidth: 1, height: "100%", paddingTop: 1 },
  noBlank: { width: "3%", height: "100%", paddingTop: 1 },

  description: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
    paddingTop: 1,
  },
  descriptionBlank: {
    width: "40%",

    height: "100%",
    paddingTop: 1,
  },
  driverVal: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    width: "22%",
    height: "100%",
    paddingTop: 1,
  },
  amount: { borderRightColor: borderColor, borderRightWidth: 1, width: "11%", height: "100%", paddingTop: 1 },
  amountColored: {
    borderRightColor: borderColor,
    borderRightWidth: 1,
    width: "11%",
    height: "100%",
    paddingTop: 1,
    backgroundColor: "#ebfbff",
  },
  amount2: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
  },
  amount2Colored: {
    width: "13%",
    height: "100%",
    paddingTop: 1,
    color: "blue",
  },
});

const InvoiceTableHeader = ({ truckItem, withPrice }) => (
  <>
    <View style={styles.containerTruck}>
      <Text style={styles.noBlank}> </Text>
      <Text style={styles.description}>Driver : {truckItem.truckDriverName} </Text>
      <Text style={styles.amountColored}>Tel : </Text>
      <Text style={styles.driverVal}>{truckItem.truckDriverTel}</Text>
      <Text style={styles.amountColored}>TRUCK NO.</Text>
      <Text style={styles.amount2Colored}>{truckItem.truckNo}</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.no}>No</Text>
      <Text style={styles.description}>DESCRIPTION</Text>
      <Text style={styles.amount}>QTY(PCS)</Text>
      <Text style={styles.amount}>PALLET</Text>
      <Text style={styles.amount}>NW(KG)</Text>
      <Text style={styles.amount}>GW(KG)</Text>
      <Text style={styles.amount2}>{withPrice && "TOTAL"}</Text>
    </View>
  </>
);

export default InvoiceTableHeader;
