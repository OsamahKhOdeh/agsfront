import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderLeft: 1,
    borderRight: 1,
    alignItems: "center",
    height: 20,
    fontSize: "10px",
    fontStyle: "bold",
  },
  container: {
    flexDirection: "row",
    borderLeft: 1,
    borderRight: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: "center",
    height: 15,
    textAlign: "left",
    flexGrow: 1,
  },
  no: { width: "4%", textAlign: "center", borderRightColor: borderColor, borderRightWidth: 1 },
  description: {
    paddingLeft: "5px",
    fontSize: "9px",
    width: "96%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  header: {
    paddingLeft: "5px",
    width: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  seller: {
    textAlign: "center",
    fontSize: "16px",
    width: "50%",
  },
  buyer: {
    textAlign: "center",
    fontSize: "9px",
    width: "50%",
  },
});

const InvoiceTerms = ({ currency }) => (
  <>
    <View style={styles.row}>
      <Text style={styles.header}>Terms and Conditions</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.no}>1</Text>
      <Text style={styles.description}>This is EX-Warehouse</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.no}>2</Text>
      <Text style={styles.description}>Delivery Time : 7 days after deposit</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.no}>3</Text>
      <Text style={styles.description}>We will not be held responsible for any delivery delay occurred by the manufacturer or due to dalays in shippment</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.buyer}>Seller :</Text>
      <Text style={styles.buyer}>Buyer : </Text>
    </View>
  </>
);

export default InvoiceTerms;
