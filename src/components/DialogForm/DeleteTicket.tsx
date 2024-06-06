import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";

const DeleteTicket = ({
  deliveryLogId,
  onDelete,
}: {
  deliveryLogId: number;
  onDelete: (id: number) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://14.225.211.1:8084/api/delivery/DeleteTicket?ticket_ID=${deliveryLogId}`,
        {},
        {
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Delete successful:", response.data);
        onDelete(deliveryLogId); // Call the onDelete prop to update the state in the parent component
        setOpen(false); // Close the dialog
        window.location.reload();
      } else {
        console.error("Delete unsuccessful:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={handleClickOpen}
        style={{ color: "#495464" }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this data?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteTicket;
