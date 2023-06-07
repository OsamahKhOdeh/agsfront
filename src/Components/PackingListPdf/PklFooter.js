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
  let pklTotalGrossWeight = 0;
  let pklTotalNetWeight = 0;
  let pklTotalAmount = 0;
  truckItems.map((truckItem) => {
    pklTotalGrossWeight += parseFloat(truckItem?.truckGrossWeightFake).toFixed(2);
    pklTotalNetWeight += parseFloat(truckItem?.truckNetWeightFake).toFixed(2);
    pklTotalAmount += parseFloat(truckItem?.truckTotalAmount).toFixed(2);
  });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.col}>
          <Text style={styles.col_row}>Packing List Total GROSSWEIGHT: {52000.0} KG</Text>{" "}
          <Text style={styles.col_row}>Packing List Total NETWEIGHT: {50765.0} KG</Text>{" "}
          <Text style={styles.col_rowNobutt}>Packing List Total Amount : {179790.0}</Text>
        </View>{" "}
      </View>
    </>
  );
};

export default PklFooter;
