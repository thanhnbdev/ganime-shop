import React from "react";
import { Page, Text, Font, Document, StyleSheet } from "@react-pdf/renderer";

// Register Font
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

const PDFFile = (props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          <Text>================ THỜI TRANG SHOP V ================</Text>
        </Text>
        <Text style={{ textAlign: "center" }}>
          Địa chỉ : số 1 đường Trịnh Văn Bô – Nam Từ Liêm – Hà Nội
        </Text>
        <Text style={styles.title}>HÓA ĐƠN BÁN HÀNG</Text>
        <Text style={{ textAlign: "center" }}>Hẹn gặp lại quý khách !</Text>
      </Page>
    </Document>
  );
};

export default PDFFile;
