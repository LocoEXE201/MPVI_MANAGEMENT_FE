import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PATH_MAIN } from "@/routes/paths";
import { NextPage } from "next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import DeliveryBookTicket from "@/components/DialogForm/DeliveryBookTicket";
import "./DeliveryTable.css";
import DeleteTicket from "@/components/DialogForm/DeleteTicket";
import useAppContext from "@/hooks/useAppContext";
import Loading from "@/components/Loading/Loading";

interface DeliveryTicket {
  deliveryLogId: number;
  supplier: { supplerId: number; name: string };
  createdOn: string;
  deliveryOn: string;
  driverContact: string;
  note: string;
}

const DeliveryTable: NextPage = () => {
  const [supplierId, setSupplierId] = useState<number>(2);
  const [tickets, setTickets] = useState<DeliveryTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, enableLoading, disableLoading } = useAppContext();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        enableLoading();
        const response = await fetch(
          "https://mpviwarehouse.azurewebsites.net/api/delivery/GetAllTicket",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.isSuccess) {
            if (Array.isArray(data.result)) {
              setTickets(data.result);
              console.log(data.result);
              disableLoading();
            } else {
              console.error("Result is not an array", data);
            }
          } else {
            console.error("API request unsuccessful:", data.message);
          }
        } else {
          console.error("Failed to fetch tickets", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSupplierId(Number(event.target.value));
    setSearchQuery(""); // Optional: Reset search query when filter changes
  };

  const handleDeleteTicket = (id: number) => {
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.deliveryLogId !== id)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      (ticket.supplier.supplerId === supplierId || supplierId === 0) &&
      (ticket.supplier?.name?.toLowerCase().includes(searchQuery) ||
        ticket.driverContact?.toLowerCase().includes(searchQuery) ||
        ticket.note?.toLowerCase().includes(searchQuery))
  );

  return (
    <>
      <Loading loading={isLoading} />
      <div>
        <div className="delivery-container">
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search here"
              sx={{
                bgcolor: "#fff",
                width: "80%",
                borderRadius: "4px",
                boxShadow: `0px 2px 1px -1px rgba(255, 182, 193, 0.2),
                    0px 1px 1px 0px rgba(255, 182, 193, 0.14),
                    0px 1px 3px 0px rgba(255, 182, 193, 0.12)`,
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "10px 14px",
                  },
                },
                "& .MuiInputAdornment-root": {
                  marginRight: "4px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "grey" }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Filter"
                value={supplierId}
                onChange={handleChange}
                sx={{
                  bgcolor: "#fff",
                  color: blue[500],
                }}
              >
                <MenuItem value={2}>
                  MPVI - Mentorship for people with vision impairment
                </MenuItem>
                <MenuItem value={1}>Oceanic Entertainment</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="book-ticket-button">
            <DeliveryBookTicket />
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  No.
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Supplier ID
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Created On
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Delivery On
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Driver Contact
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Note
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket, index) => (
                <TableRow
                  key={ticket.deliveryLogId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ color: "grey", fontWeight: "500" }}>
                    {ticket.supplier.supplerId === 2
                      ? "MPVI - Mentorship for people with vision impairment"
                      : ""}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {new Date(ticket.createdOn).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {new Date(ticket.deliveryOn).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {ticket.driverContact}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {ticket.note}
                  </TableCell>

                  <TableCell align="center">
                    <div className="operation">
                      <Link
                        href={PATH_MAIN.deliveryDetail(ticket.deliveryLogId)}
                        passHref
                      >
                        <Button variant="text">
                          <InfoSharpIcon sx={{ color: "#BBBFCA" }} />
                        </Button>
                      </Link>
                      <DeleteTicket
                        deliveryLogId={ticket.deliveryLogId}
                        onDelete={handleDeleteTicket}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DeliveryTable;
