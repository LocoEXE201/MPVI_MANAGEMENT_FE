"use client";
import React, { useEffect, useState } from "react";
import DeliveryTable from "@/components/layouts/table/DeliveryTable";
import Calendar from "@/components/layouts/calendar/CalendarComponent";

import "./Delivery.css";

const DeliveryPageComponent = (props: {}) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>
      <div className="container h-full" style={{ backgroundColor: "#F1F5F9" }}>
        <div className="calendar">
          <Calendar />
        </div>
        <div className="delivery-table" style={{}}>
          <DeliveryTable />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPageComponent;
