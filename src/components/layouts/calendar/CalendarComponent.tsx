import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./Calendar.css";

export default function Calendar() {
  return (
    <div>
      <div className="delivery-calendar">
        <Button
          variant="outlined"
          sx={{
            bgcolor: "pink",
            color: "black",
            borderRadius: "10px",
            border: "1px solid black",
            height: "30px",
            "&:hover": {
              bgcolor: "pink",
              borderColor: "black",
            },
          }}
          startIcon={<CalendarTodayIcon style={{ color: "black" }} />}
        >
          Delivery Calendar
        </Button>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar className="calendar-border" />
      </LocalizationProvider>
    </div>
  );
}
