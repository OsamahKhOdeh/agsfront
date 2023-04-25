import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../actions/products";

const MakePo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return <div>PPPPPPPPPPPPPOOOOOOOOOOOOOOOOOOOO</div>;
};

export default MakePo;
