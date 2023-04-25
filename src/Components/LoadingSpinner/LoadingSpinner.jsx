import React from "react";
import "./LoadingSpinner.css";
import { RotatingLines } from "react-loader-spinner";

const LoadingSpinner = () => {
  return <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="200" visible={true} />;
};

export default LoadingSpinner;
