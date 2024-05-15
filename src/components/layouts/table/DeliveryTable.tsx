import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { red, yellow, blue, green } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import "./DeliveryTable.css";
import DeliveryBookTicket from "@/components/DialogForm/DeliveryBookTicket";

function createData(
  id: number,
  cname: string,
  orderdate: string,
  payment: string,
  status: string
) {
  return { id, cname, orderdate, payment, status };
}

const rows = [
  createData(1, "Hector Hugo", "01/03/2023", "Momo", "Complete"),
  createData(2, "Fermanda", "29/02/2024", "Vnpay", "Complete"),
  createData(3, "Francisco", "29/02/2024", "Cash", "Cancel"),
  createData(4, "Alberto", "29/02/2024", "Cash", "Complete"),
  createData(5, "Hector Hugo", "01/03/2023", "Momo", "Complete"),
  createData(6, "Fermanda", "29/02/2024", "Vnpay", "Complete"),
  createData(7, "Francisco", "29/02/2024", "Cash", "Cancel"),
  createData(8, "Alberto", "29/02/2024", "Cash", "Pending"),
];

const getColor = (status: String) => {
  switch (status) {
    case "Cancel":
      return { main: red[500], hover: red[700] };
    case "Pending":
      return { main: "#FFD700", hover: yellow[700] };
    default:
      return { main: "#1E90FF", hover: "#4169E1" };
  }
};

export default function DeliveryTable() {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  return (
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
                height: "40px", // Adjust the height as needed
                "& input": {
                  padding: "10px 14px", // Adjust padding to center the text vertically
                },
              },
              "& .MuiInputAdornment-root": {
                marginRight: "4px", // Adjust margin to better align icon
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
          />
        </div>
        <div className="dropdown">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label" style={{ color: "grey" }}>
              Filter
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Filter"
              value={status}
              onChange={handleChange}
              sx={{
                bgcolor: "#fff",
                color: blue[500],
              }}
            >
              <MenuItem value="Complete">COMPLETE</MenuItem>
              <MenuItem value="Pending">PENDING</MenuItem>
              <MenuItem value="Cancel">CANCEL</MenuItem>
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
                Customer Name
              </TableCell>
              <TableCell
                align="center"
                className="header-table"
                style={{ color: "silver", fontWeight: "bold" }}
              >
                Order Date
              </TableCell>
              <TableCell
                align="center"
                className="header-table"
                style={{ color: "silver", fontWeight: "bold" }}
              >
                Payment Type
              </TableCell>
              <TableCell
                align="center"
                className="header-table"
                style={{ color: "silver", fontWeight: "bold" }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                className="header-table"
                style={{ color: "silver", fontWeight: "bold" }}
              >
                Detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const { main, hover } = getColor(row.status);
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    {row.cname}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {row.orderdate}
                  </TableCell>
                  <TableCell align="center" style={{ color: "grey" }}>
                    {row.payment}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: main,
                        width: "110px",
                        "&:hover": {
                          bgcolor: hover,
                        },
                      }}
                    >
                      {row.status}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="text">
                      <InfoSharpIcon sx={{ color: "grey" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
