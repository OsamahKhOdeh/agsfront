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
  no: { width: "4%", textAlign: "center", borderRightColor: borderColor, borderRightWidth: 1 ,height : "100%"  ,paddingTop : 4},
  description: {
    paddingLeft: "5px",
    fontSize: "9px",
    width: "96%",
  
  },
  header: {
    paddingLeft: "5px",
    width: "100%",
   
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

const InvoiceTerms = ({ terms }) => (
  <>
    <View style={styles.row}>
      <Text style={styles.header}>Terms and Conditions : </Text>
    </View>
    {terms?.length > 0 ? 
      (terms.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.no}>{index + 1}</Text>
          <Text style={styles.description}>{item}</Text>
        </View>))
      ) : null
    }
    <View style={styles.row}>
      <Text style={styles.buyer}>Seller :</Text>
      <Text style={styles.buyer}>Buyer : </Text>
    </View>
  </>
);

export default InvoiceTerms;
