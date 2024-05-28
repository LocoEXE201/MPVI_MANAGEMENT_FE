import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Detail {
  categoryName: string;
  quantity: number;
  status: string;
  categoryStatusCk: number;
  note: string;
}

interface CheckReceiptProductProps {
  deliveryLogId: number;
  details: Detail[];
}

export default function CheckReceiptProduct({
  deliveryLogId,
  details,
}: CheckReceiptProductProps) {
  const [open, setOpen] = useState(false);
  // const [detailsState, setDetailsState] = useState<Detail[]>(details);
  const [adminRole, setAdminRole] = useState<string>("");
  const [formValues, setFormValues] = useState({
    deliveryLogId: deliveryLogId,
    note: "",
  });

  useEffect(() => {
    const fetchUserInfo = () => {
      const userInfo = localStorage.getItem("USER_INFO");
      if (!userInfo) {
        console.error("No user info found");
        return;
      }

      const user = JSON.parse(userInfo);
      const userRoles = user.role;
      if (userRoles.includes("tTjEu2THQ4ByaQw")) {
        setAdminRole("tTjEu2THQ4ByaQw");
      }
    };

    fetchUserInfo();
  }, []);

  const handleClickOpen = () => {
    const hasReceiptStatus = details.some(
      (detail) => detail.status === "Receipt"
    );

    if (adminRole === "tTjEu2THQ4ByaQw" && hasReceiptStatus) {
      setOpen(true);
    } else if (adminRole !== "tTjEu2THQ4ByaQw") {
      alert("You are not a MPVI_SUPER_ADMIN");
    } else {
      alert("You need to receipt product ticket first !");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { deliveryLogId, note } = formValues;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }
      const response = await axios.post(
        `https://mpviwarehouse.azurewebsites.net/api/delivery/CheckReceiptProduct`,
        null,
        {
          params: {
            DeliveryID: deliveryLogId,
            note: note,
          },
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Failed to fetch delivery details:", error);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="warning"
        sx={{
          backgroundColor: "#DA7A22",
          "&:hover": {
            backgroundColor: "#DA7A22",
          },
        }}
      >
        <CheckCircleOutlineIcon fontSize="small" /> Check Receipt
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Check Receipt Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill all the fields to check receipt product.
          </DialogContentText>
          <TextField
            margin="dense"
            id="deliveryLogId"
            name="deliveryLogId"
            label="Delivery Log ID"
            type="number"
            fullWidth
            variant="standard"
            value={formValues.deliveryLogId}
            onChange={handleInputChange}
            disabled
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
            value={formValues.note}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
