import * as React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./Calendar.css";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleDateChange = async (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);

      const formattedDate = date.format("M-D-YYYY");
      const url = `https://mpviwarehouse.azurewebsites.net/api/delivery/GetTicketCalendar?selectedDate=${formattedDate}`;

      const token = localStorage.getItem("accessToken"); // Ensure you have the token stored in localStorage

      try {
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              accept: "text/plain",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (data.isSuccess) {
          if (data.result.length > 0) {
            const result = data.result.map((item: any) => {
              return `Delivery Date: ${dayjs(item.deliveryDate).format(
                "MMMM D, YYYY"
              )}, Ticket ID: ${item.ticketID}`;
            });
            setMessage(result.join("\n"));
          } else {
            setMessage(
              data.message || "No tickets found for the selected date."
            );
          }
        } else {
          setMessage("Failed to fetch data");
        }

        setOpen(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to fetch data");
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <DateCalendar
          className="calendar-border"
          onChange={(date) => handleDateChange(date as Dayjs)}
        />
      </LocalizationProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <pre>{message}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
