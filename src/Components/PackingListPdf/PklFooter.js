import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "black",
    backgroundColor: "white",
    alignItems: "center",
    height: 39,
    textAlign: "center",
    fontSize: 10,
    flexGrow: 1,
  },
  col: {
    width: "100%",
    flexDirection: "column",
  },
  col_row: {
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    fontSize: 8,
    height: 13,
    width: "100%",
    textAlign: "left",
    paddingLeft: "4px",
    paddingTop: 1,
  },
  col_rowNobutt: { fontSize: 8, height: 13, width: "100%", textAlign: "left", paddingLeft: "4px", paddingTop: 1 },
  bl: {
    backgroundColor: "#ccffdb",
    paddingTop: "15px",
    paddingLeft: "5px",
    height: "100%",
    width: "57%",
    fontSize: 9,
    textAlign: "left",
  },
});
const PklFooter = ({ truckItems, fake }) => {
  let pklTotalGrossWeightFake = 0;
  let pklTotalNetWeightFake = 0;
  let pklTotalGrossWeight = 0;
  let pklTotalNetWeight = 0;
  let pklTotalAmount = 0;

  truckItems.forEach((truckItem) => {
    console.log(truckItem?.truckGrossWeightFake);
    pklTotalGrossWeightFake += parseFloat(truckItem?.truckGrossWeightFake);
    pklTotalNetWeightFake += parseFloat(truckItem?.truckNetWeight);
    pklTotalGrossWeight += parseFloat(truckItem?.truckGrossWeight);
    pklTotalNetWeight += parseFloat(truckItem?.truckNetWeightFake);
    pklTotalAmount += parseFloat(truckItem?.truckTotalAmount);
  });

  return (
    <>
      <View style={styles.col}>
        <Text style={styles.col_row}>
          Packing List Total GROSSWEIGHT:{" "}
          {fake ? Math.round(pklTotalGrossWeightFake).toFixed(2) : Math.round(pklTotalGrossWeight).toFixed(2)} KG
        </Text>
        <Text style={styles.col_row}>
          Packing List Total NETWEIGHT: {fake ? Math.round(pklTotalNetWeightFake).toFixed(2) : Math.round(pklTotalNetWeight).toFixed(2)} KG
        </Text>
        <Text style={styles.col_rowNobutt}>Packing List Total Amount: {Math.round(pklTotalAmount).toFixed(2)}</Text>
      </View>
    </>
  );
};
export default PklFooter;
