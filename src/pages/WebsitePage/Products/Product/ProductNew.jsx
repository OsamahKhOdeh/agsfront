import React from "react";
import "./ProductNew.css";
import { downloadDatasheet } from "../../../../actions/products";
import { useDispatch, useSelector } from "react-redux";

const ProductNew = ({ product, index }) => {
  const onButtonClick = async (id, downloadedFileName) => {
    downloadDatasheet(id, downloadedFileName);
  };
  const poProucts = useSelector((state) => state.po.products);
  const exist = poProucts.some((item) => item._id === product._id);

  const dispatch = useDispatch();

  return (
    <div class="card">
      <div class="imgBox">
        <img
          src={
            product.image[0] !==
            "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
              ? product.image
              : process.env.PUBLIC_URL + `images/${product._id}_1.png` ||
                `images/${product._id}_1.jpg` ||
                `images/${product._id}_1.JPG`
          }
          class="mouse"
          alt={product.category}
        />
      </div>

      <div class="contentBox">
        <h3 style={{ fontSize: "25px", fontWeight: "700", color: "#ff0000" }}>{product.brand}</h3>
        <h3 style={{ fontSize: "21px", fontFamily: "monospace", fontWeight: "600", color: "rgb(197 19 19)" }}>
          {product.code}
        </h3>
        <h2
          style={{ fontSize: "20px", color: "rgb(110 51 51)", fontWeight: "700", letterSpacing: "1px" }}
          class="price"
        >
          {product.capacity}
        </h2>
        <a onClick={() => onButtonClick(product._id, product.code)} class="buy">
          Download Datasheet
        </a>
      </div>
    </div>
  );
};

export default ProductNew;
