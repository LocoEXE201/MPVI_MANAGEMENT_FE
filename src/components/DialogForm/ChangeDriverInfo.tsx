import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import axios from "axios";

export default function ChangeDriverInfo({
  deliveryLogId,
  status,
}: {
  deliveryLogId: number;
  status: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (status === "Pending") {
      setOpen(true);
    } else {
      alert("Can not change driver info!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const driverContact = formJson.driverContact;
    const note = formJson.note;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        `https://mpviwarehouse.azurewebsites.net/api/delivery/ChangeDriverInfo?ticket_ID=${deliveryLogId}&driverContact=${driverContact}&note=${note}`,
        {},
        {
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.isSuccess) {
        console.log("Driver info updated successfully:", response.data);
        handleClose();
        window.location.reload();
      } else {
        console.error("Failed to update driver info:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating driver info:", error);
    }
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="edit"
        size="large"
        onClick={handleClickOpen}
        // style={{ color: "orange" }}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Change Driver Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the driver info, please enter the contact information and
            note here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="driverContact"
            name="driverContact"
            label="Driver Contact"
            type="text"
            fullWidth
            variant="standard"
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
