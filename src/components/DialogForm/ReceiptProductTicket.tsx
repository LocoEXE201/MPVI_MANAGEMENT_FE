import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { DialogContentText } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

interface Detail {
  deliveryDetailId: number;
  categoryId: number;
  categoryName: string;
  quantity: number;
  status: string;
  categoryStatusCk: number;
  note: string;
}

interface ReceiptProductTicketProps {
  deliveryLogId: number;
  supplierId: number;
  details: Detail[];
  driverContact: string;
  createdOn: string;
  deliveryOn: string;
}

export default function ReceiptProductTicket({
  deliveryLogId,
  supplierId,
  details,
  driverContact,
  createdOn,
  deliveryOn,
}: ReceiptProductTicketProps) {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [note, setNote] = useState("");
  const [detailsState, setDetailsState] = useState<Detail[]>(details);
  useEffect(() => {
    setDetailsState(details);
  }, [details]);

  const [checkById, setCheckById] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = () => {
      const userInfo = localStorage.getItem("USER_INFO");
      if (!userInfo) {
        console.error("No user info found");
        return;
      }

      const userId = JSON.parse(userInfo).id;
      setCheckById(userId);
    };

    fetchUserInfo();
  }, []);

  const handleClickOpen = () => {
    const allApproved = details.every((detail) => detail.status === "Approved");
    if (allApproved) {
      setOpen(true);
    } else {
      alert("Can not receipt this ticket!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    setDetailsState((prevDetails) => prevDetails.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setDetailsState((prevDetails) =>
      prevDetails.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      receipltLog: {
        deliveryLog: {
          deliveryLogId: deliveryLogId,
          supplier: {
            supplerId: supplierId,
          },
          createdOn: createdOn,
          deliveryOn: deliveryOn,
          driverContact: driverContact,
          note: "",
        },
        transactionDate: new Date().toISOString(),
        checkBy: {
          id: checkById,
        },
        totalPrice: totalPrice,
        note: note,
      },
      datalList: detailsState.map((detail) => ({
        deliveryDetailId: detail.deliveryDetailId,
        categoryId: detail.categoryId,
        categoryName: detail.categoryName,
        quantity: detail.quantity,
        status: detail.status,
        categoryStatusCk: detail.categoryStatusCk,
        note: detail.note,
      })),
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }

      const response = await axios.post(
        `http://14.225.211.1:8084/api/delivery/ReceiptProductTicket?DeliveryID=${deliveryLogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        console.log("API request successful:", response.data);
        window.location.reload();
      } else {
        console.error("API request unsuccessful:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#6AB187",
          "&:hover": {
            backgroundColor: "#6AB187",
          },
        }}
      >
        <ReceiptLongIcon fontSize="small" /> Make Receipt
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Enter Delivery Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To make a receipt, please check and fill information below.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="deliveryLogId"
              name="deliveryLogId"
              label="Delivery Log ID"
              type="text"
              fullWidth
              variant="standard"
              value={deliveryLogId}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="supplierId"
              name="supplierId"
              label="Supplier ID"
              type="text"
              fullWidth
              variant="standard"
              value={supplierId}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="checkById"
              name="checkById"
              label="Checked By ID"
              type="text"
              fullWidth
              variant="standard"
              value={checkById}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="createdOn"
              name="createdOn"
              label="Created On"
              type="text"
              fullWidth
              variant="standard"
              value={new Date(createdOn).toLocaleDateString()}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="deliveryOn"
              name="deliveryOn"
              label="Delivery On"
              type="text"
              fullWidth
              variant="standard"
              value={new Date(deliveryOn).toLocaleDateString()}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="totalPrice"
              name="totalPrice"
              label="Total Price"
              type="number"
              fullWidth
              variant="standard"
              value={totalPrice}
              onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
            />
            <TextField
              required
              margin="dense"
              id="note"
              name="note"
              label="Note"
              type="text"
              fullWidth
              variant="standard"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            {detailsState.map((detail, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  margin="dense"
                  id={`categoryName-${index}`}
                  label="Category Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={detail.categoryName}
                  disabled
                />
                <TextField
                  margin="dense"
                  id={`quantity-${index}`}
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={detail.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", parseFloat(e.target.value))
                  }
                />
                <TextField
                  margin="dense"
                  id={`status-${index}`}
                  label="Status"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={detail.status}
                  disabled
                />
                <TextField
                  required
                  margin="dense"
                  id={`categoryStatusCk-${index}`}
                  name={`categoryStatusCk-${index}`}
                  label="Category Status Ck"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={detail.categoryStatusCk}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "categoryStatusCk",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <TextField
                  margin="dense"
                  id={`note-${index}`}
                  label="Note"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={detail.note}
                  onChange={(e) => handleChange(index, "note", e.target.value)}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
