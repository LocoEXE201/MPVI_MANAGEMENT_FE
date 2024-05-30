import React, { useEffect, useState } from "react";
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
import "./DeliveryDetailTable.css";
import axios from "axios";
import useAppContext from "@/hooks/useAppContext";
import Loading from "@/components/Loading/Loading";
import ChangeDriverInfo from "@/components/DialogForm/ChangeDriverInfo";
import ReceiptProductTicket from "@/components/DialogForm/ReceiptProductTicket";
import CheckReceiptProduct from "@/components/DialogForm/CheckReceiptProduct";

interface DeliveryDetail {
  deliveryDetailId: number;
  deliveryLogId: number;
  categoryId: number;
  categoryName: string;
  quantity: number;
  status: string;
  categoryStatusCk: number;
  note: string;
  supplier: { supplierId: number; name: string };
  createdOn: string;
  deliveryOn: string;
  driverContact: string;
}

const getColor = (status: string) => {
  switch (status) {
    case "Rejected":
      return { main: "#FF6B6B", hover: red[700] };
    case "Pending":
      return { main: "#FFD93D", hover: yellow[700] };
    case "Approved":
      return { main: "#6BCB77", hover: green[700] };
    case "Receipt":
      return { main: "#AD88C6", hover: "#7469B6" };
    default:
      return { main: "#1E90FF", hover: "#4169E1" };
  }
};

const DeliveryDetailTable = ({
  deliveryLogId,
  onStatusChange,
}: {
  deliveryLogId: number;
  onStatusChange: (status: string) => void;
}) => {
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [details, setDetails] = useState<DeliveryDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const [supplier, setSupplier] = useState<{
    supplerId: number;
    name: string;
  }>({
    supplerId: 0,
    name: "",
  });
  const [driverContact, setDriverContact] = useState<string>("");
  // const [receiptStatus, setReceiptStatus] = useState<string>("");
  const [createdOn, setCreatedOn] = useState<string>("");
  const [deliveryOn, setDeliveryOn] = useState<string>("");
  useEffect(() => {
    const fetchDetails = async () => {
      if (!deliveryLogId) return;
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        enableLoading();
        const response = await axios.post(
          `https://mpviwarehouse.azurewebsites.net/api/delivery/GetTicketByID?DeliveryID=${deliveryLogId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.isSuccess) {
          const { deliveryLog, datalList } = response.data.result;
          console.log(response.data);
          const supplier = deliveryLog.supplier;
          setSupplier(deliveryLog.supplier);
          setDriverContact(deliveryLog.driverContact);
          setCreatedOn(deliveryLog.createdOn);
          setDeliveryOn(deliveryLog.deliveryOn);

          const formattedDetails = datalList.map((item: any) => ({
            deliveryDetailId: item.deliveryDetailId,
            deliveryLogId: item.deliveryLog.deliveryLogId,
            categoryId: item.category.categoryId,
            categoryName: item.category.categoryName,
            quantity: item.quantity,
            status: item.status,
            categoryStatusCk: item.categoryStatusCk,
            note: deliveryLog.note,
            supplier: {
              supplierId: supplier.supplerId,
              name: supplier.supplierName,
            },
            createdOn: deliveryLog.createdOn,
            deliveryOn: deliveryLog.deliveryOn,
            driverContact: deliveryLog.driverContact,
          }));

          setDetails(formattedDetails);
          datalList.forEach((item: any) => onStatusChange(item.status));
          console.log(details);
          disableLoading();
        } else {
          console.error("API request unsuccessful:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [deliveryLogId]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredDetails = details.filter((detail) => {
    const matchesStatus =
      status === "" || detail.status.toLowerCase() === status.toLowerCase();
    const matchesCategory =
      category === "" ||
      detail.categoryName.toLowerCase().includes(category.toLowerCase());
    const matchesSearchQuery = Object.values(detail)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery);
    return matchesStatus && matchesCategory && matchesSearchQuery;
  });

  const getRowSpan = (
    details: DeliveryDetail[],
    index: number,
    key: keyof DeliveryDetail
  ) => {
    const detail = details[index];
    let rowSpan = 1;
    for (let i = index + 1; i < details.length; i++) {
      if (details[i][key] === detail[key]) {
        rowSpan++;
      } else {
        break;
      }
    }
    return rowSpan;
  };

  return (
    <>
      <Loading loading={isLoading} />
      <div>
        <div className="report-container">
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
              onChange={handleSearchChange} // Handle search query change
            />
          </div>
          <div className="dropdown">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ color: "grey" }}
              >
                Filter by Status
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Filter by Status"
                value={status}
                onChange={handleStatusChange}
                sx={{
                  bgcolor: "#fff",
                  color: blue[500],
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Approved">APPROVED</MenuItem>
                <MenuItem value="Pending">PENDING</MenuItem>
                <MenuItem value="Rejected">REJECTED</MenuItem>
                <MenuItem value="Receipt">RECEIPT</MenuItem>
                <MenuItem value="Completed">COMPLETED</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-category-label"
                style={{ color: "grey" }}
              >
                Filter by Category
              </InputLabel>
              <Select
                labelId="demo-select-category-label"
                id="demo-select-category"
                label="Filter by Category"
                value={category}
                onChange={handleCategoryChange}
                sx={{
                  bgcolor: "#fff",
                  color: blue[500],
                }}
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(
                  new Set(details.map((detail) => detail.categoryName))
                ).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <ReceiptProductTicket
              deliveryLogId={deliveryLogId}
              supplierId={supplier.supplerId}
              details={filteredDetails}
              driverContact={driverContact}
              createdOn={createdOn}
              deliveryOn={deliveryOn}
            />
          </div>
          <div>
            <CheckReceiptProduct
              deliveryLogId={deliveryLogId}
              details={filteredDetails}
            />
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
                  Delivery Log ID
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Supplier
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
                  Category Name
                </TableCell>
                <TableCell
                  align="center"
                  className="header-table"
                  style={{ color: "silver", fontWeight: "bold" }}
                >
                  Quantity
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
                  Category Status CK
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
                  Change Driver Info
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDetails.map((detail, index) => {
                const { main, hover } = getColor(detail.status);
                const rowSpan = getRowSpan(
                  filteredDetails,
                  index,
                  "deliveryLogId"
                );

                return (
                  <TableRow
                    key={detail.deliveryDetailId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" style={{ color: "grey" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {detail.deliveryLogId}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.supplier.supplierId === 2
                        ? "MPVI - Mentorship for people with vision impairment"
                        : detail.supplier.name}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {new Date(detail.createdOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {new Date(detail.deliveryOn).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.driverContact}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.categoryName}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.quantity}
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
                        {detail.status}
                      </Button>
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.categoryStatusCk === 1 ? "TRUE" : "FALSE"}
                    </TableCell>
                    <TableCell align="center" style={{ color: "grey" }}>
                      {detail.note}
                    </TableCell>
                    {index === 0 ||
                    filteredDetails[index - 1].deliveryLogId !==
                      detail.deliveryLogId ? (
                      <TableCell align="center" rowSpan={rowSpan}>
                        <ChangeDriverInfo
                          deliveryLogId={detail.deliveryLogId}
                          status={detail.status}
                        />
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DeliveryDetailTable;
