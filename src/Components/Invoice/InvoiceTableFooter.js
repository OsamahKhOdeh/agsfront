import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    fontSize: "10px",

    width: "85%",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    fontSize: "10px",
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

var a = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];
var b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

const InvoiceTableFooter = ({ products, currency, discount }) => {
  let currency_word = "";
  if (currency === "USD") currency_word = "Dollars";
  else currency_word = "UAE Dirhams";
  function inWords(num) {
    if ((num = num.toString()).length > 9) return "overflow";
    let n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore " : "";
    str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh " : "";
    str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand " : "";
    str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred " : "";
    str += n[5] != 0 ? (str != "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + currency_word + " " + "only " : "";
    return str;
  }
  const total = products.map((item) => item.qty * item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.total}>
          {Number.parseFloat(total).toFixed(3)}&nbsp;{currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>DISCOUNT</Text>
        <Text style={styles.total}>
          {discount}&nbsp;{currency}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>{inWords(parseInt(total - discount))}</Text>
        <Text style={styles.total}>
          {Number.parseFloat(total - discount).toFixed(3)}&nbsp;{currency}
        </Text>
      </View>
    </>
  );
};

export default InvoiceTableFooter;
