import React from "react";
import "./Loading.scss";
import { NextPage } from "next";

type LoadingType = {
  loading?: boolean;
};

const Loading: NextPage<LoadingType> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader_overlay">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loader_text font-baloo-2">
        Xin vui lòng đợi trong một vài giây...
      </div>
    </div>
  );
};

export default Loading;
