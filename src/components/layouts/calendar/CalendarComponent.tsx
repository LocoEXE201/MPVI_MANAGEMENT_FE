import * as React from "react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./Calendar.css";

interface TicketDateResponse {
  deliveryDate: string;
  ticketID: string;
}

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [ticketDates, setTicketDates] = useState<Set<string>>(new Set());

  const fetchTicketDates = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await axios.get<{
        isSuccess: boolean;
        result: TicketDateResponse[];
      }>(
        "https://mpviwarehouse.azurewebsites.net/api/delivery/GetAllTicketDates",
        {
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.isSuccess) {
        const dates = data.result.map((item) =>
          dayjs(item.deliveryDate).format("YYYY-MM-DD")
        );
        setTicketDates(new Set(dates));
      } else {
        console.error("Failed to fetch ticket dates");
      }
    } catch (error) {
      console.error("Error fetching ticket dates:", error);
    }
  };

  useEffect(() => {
    fetchTicketDates();
  }, []);

  const handleDateChange = async (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date);

      const formattedDate = date.format("M-D-YYYY");
      const url = `https://mpviwarehouse.azurewebsites.net/api/delivery/GetTicketCalendar?selectedDate=${formattedDate}`;

      const token = localStorage.getItem("accessToken");

      try {
        const response = await axios.post<{
          isSuccess: boolean;
          result: TicketDateResponse[];
          message?: string;
        }>(
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
            const result = data.result.map((item) => {
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

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    const daysInMonth = date.daysInMonth();
    const daysToHighlight = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

    const highlighted = daysToHighlight.filter((day) =>
      ticketDates.has(date.date(day).format("YYYY-MM-DD"))
    );

    setHighlightedDays(highlighted);
    setIsLoading(false);

    requestAbortController.current = controller;
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  useEffect(() => {
    fetchHighlightedDays(dayjs());
  }, [ticketDates]);

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
          loading={isLoading}
          onMonthChange={handleMonthChange}
          onChange={(date) => handleDateChange(date as Dayjs)}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
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
