"use client";
import React, { useEffect, useState } from "react";
import ReportTable from "@/components/layouts/table/ReportTable";
import ReportChart from "@/components/layouts/charts/ReportChart";

import "./Report.css";

const ReportPageComponent = (props: {}) => {
  return (
    <div style={{ backgroundColor: "#F1F5F9" }}>
      <div className="container-grid">
        <div className="report-chart">
          <ReportChart />
        </div>
        <div className="container-grid-1">
          <div className="grid-item-1">
            <div className="item-1">
              <h3>Todo Inspection</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident tenetur fugit sint incidunt temporibus error
                excepturi! Commodi placeat incidunt consequatur?
              </p>
            </div>
          </div>
          <div className="grid-item-2">
            <div className="item-2">
              <h3>Human Report</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
                doloribus harum fugiat quam veniam. Recusandae unde modi tempora
                ab quibusdam.
              </p>
            </div>
          </div>
          <div className="grid-item-3">
            <div className="item-3">
              <h3>Monthly Inspection</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                minima voluptate commodi sint iure architecto ad exercitationem
                libero culpa dolorem?
              </p>
            </div>
          </div>
        </div>
        <div className="report-table">
          <ReportTable />
        </div>
      </div>
    </div>
  );
};

export default ReportPageComponent;
