import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToPo, deleteProductFromPo } from "../../../../store/poSlice";
import "./Product.scss";
const Product = ({ product, index }) => {
  const poProucts = useSelector((state) => state.po.products);
  const exist = poProucts.some((item) => item._id === product._id);
  const showPrice = useSelector((state) => state.show.showPrice);
  const showStock = useSelector((state) => state.show.showStock);
  const location = useSelector((state) => state.filters.location);
  const currency = useSelector((state) => state.filters.currency);
  const usdToAedRate = useSelector((state) => state.filters.usdToAedRate);
  const inStock = product.stock > 0;
  const dispatch = useDispatch();
  const removefromPo = (items, index) => {
    dispatch(deleteProductFromPo(items, index));
  };
  const addToPo = (items, index) => {
    dispatch(addProductToPo(items));

    // document.querySelector(".sidebar").style.display = "block";
  };
  return (
    <>
      <div className="po">
        <div className={exist ? "item_card active-card" : "item_card"}>
          <div className="product__item" style={{}}>
            <div className="product__image ">
              {exist ? (
                <img
                  onClick={() => {
                    removefromPo(product, index);
                  }}
                  src={
                    product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                      ? product.image
                      : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
                  }
                  alt=""
                />
              ) : (
                <img
                  onClick={() => {
                    addToPo(product);
                  }}
                  src={
                    product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                      ? product.image
                      : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
                  }
                  alt=""
                />
              )}
              {exist ? (
                <div
                  className="check__product"
                  onClick={() => {
                    removefromPo(product, index);
                  }}
                >
                  {/* <span className="check__product__icon_checked">&#10004;</span> */}
                  <i class="uil uil-check"></i>
                </div>
              ) : (
                <div
                  className="check__product"
                  onClick={() => {
                    addToPo(product);
                  }}
                >
                  <span className="check__product__icon_unchecked">&#10004;</span>
                </div>
              )}
            </div>
            <div className="card-desc">
              <p className="capacity">
                {product.brand} {product.code}{" "}
              </p>
              <p className="capacity">
                <span>({product.capacity})</span>
              </p>
              <div class="grid-container">
                {/* <div class="grid-item">
                  <p>Capacity</p>
                  <h5>5 Ah</h5>
                </div> */}
                {/* <div class="grid-item"> */}
                <div class="grid-item">
                  <p>Price</p>
                  <h5>
                    <div>
                      {showPrice && (
                        <div>
                          {currency === "AED" ? (
                            <>
                              {location === "freezone" ? (product.freezonePrice * usdToAedRate)?.toFixed(2) : (product.LocalPrice * usdToAedRate)?.toFixed(2)}
                              &nbsp;AED
                            </>
                          ) : (
                            <>{location === "freezone" ? product.freezonePrice : product.LocalPrice}&nbsp;$</>
                          )}

                          {}
                        </div>
                      )}
                    </div>
                  </h5>
                </div>
                {/* </div> */}
                {/* <div class="grid-item"> */}
                <div class="grid-item">
                  <p>Stock </p>
                  <h5>
                    {showStock && (
                      <div style={inStock ? { color: "green" } : { color: "red" }}>
                        <div htmlFor=""> {product.stock} </div>
                      </div>
                    )}
                  </h5>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
