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
        />
      </div>

      <div class="contentBox">
        <h3>
          {product.brand}&nbsp;{product.code}
        </h3>
        <h2 class="price">{product.capacity}</h2>
        <a href="#" onClick={onButtonClick} class="buy">
          Download Datasheet
        </a>
      </div>
    </div>
  );
};

export default ProductNew;
