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
    alignItems: "center",
    height: 15,
    textAlign: "left",
    flexGrow: 1,
  },
  no: { width: "4%", textAlign: "center", borderRightColor: borderColor, borderRightWidth: 1 },
  description: {
    paddingLeft: "5px",
    fontSize: "9px",
    width: "100%",
   
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

const InvoiceTerms = ({ terms }) => (
  <>
    
    {terms?.length > 0 ? 
      (terms.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.description}>{item}</Text>
        </View>))
      ) : null
    }
   
  </>
);

export default InvoiceTerms;
