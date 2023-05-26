import React from "react";
import "./ProductNew.css";
import { downloadDatasheet } from "../../../../actions/products";
import { useDispatch, useSelector } from "react-redux";
import ReactWhatsapp from "react-whatsapp";

const ProductNew = ({ product, index }) => {
  const onButtonClick = async (id, downloadedFileName) => {
    downloadDatasheet(id, downloadedFileName);
  };

  const onGetQuoteClick = (id, code, capacity) => {
    const phoneNumber = "971565527684";
    const message = "Hello AGS, I'm looking for more information about " + code + " with capacity " + capacity;
    const messageArabic = "الرجاء ارسال عرض سعر للمنتج " + "\n" + code + capacity;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl);
  };

  const onGetQuoteClick1 = (id, code) => {
    <a href="https://wa.me/1234567890" target="_blank" class="whatsapp-button">
      <i class="fab fa-whatsapp"></i> Contact us on WhatsApp
    </a>;
  };
  const poProucts = useSelector((state) => state.po.products);
  const exist = poProucts.some((item) => item._id === product._id);

  const dispatch = useDispatch();

  return (
    <div class="card">
      <div class="imgBox">
        <img
          src={
            product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
              ? product.image
              : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
          }
          class="mouse"
          alt={product.category}
        />
      </div>

      <div class="contentBox">
        <h3 style={{ fontSize: "25px", fontWeight: "700", color: "#ff0000" }}>{product.brand}</h3>
        <h3 style={{ fontSize: "16px", fontFamily: "monospace", fontWeight: "600", color: "rgb(197 19 19)" }}>{product.code}</h3>
        <h2 style={{ fontSize: "20px", color: "rgb(110 51 51)", fontWeight: "700", letterSpacing: "1px" }} class="price">
          {product.capacity}
        </h2>
        <div className="butt_container">
          <a onClick={() => onButtonClick(product._id, product.code)} class="buy">
            Datasheet
          </a>
          <a
            onClick={() => onGetQuoteClick(product._id, product.code, product.capacity)}
            style={{ background: "green" }}
            class="buy butt_qoute"
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
