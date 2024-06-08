"use client";
import React, { useEffect, useState } from "react";
import DeliveryDetailTable from "@/components/layouts/table/DeliveryDetailTable";
import "./DeliveryDetail.css";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { PATH_MAIN } from "@/routes/paths";
import axios from "axios";

const LOCALSTORAGE_CONSTANTS = {
  CURRENT_PAGE: "currentPage",
};

const DeliveryDetailPageComponent = () => {
  const params = useParams();
  const deliveryLogId = Number(params.deliveryLogId);
  console.log(deliveryLogId);
  const [status, setStatus] = useState<string>("");

  const handleStatusChange = (status: string) => {
    setStatus(status);
  };

  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [actionTaken, setActionTaken] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);
  const router = useRouter();

  const navigateToPage = (route: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALSTORAGE_CONSTANTS.CURRENT_PAGE, route);
    }
    router.push(route);
  };

  useEffect(() => {
    const actionStatus = localStorage.getItem(`actionTaken_${deliveryLogId}`);
    if (actionStatus === "true") {
      setActionTaken(true);
      setButtonsVisible(false);
    }
  }, [deliveryLogId]);

  const handleOpenConfirmDialog = (action: "approve" | "reject") => {
    setConfirmAction(action);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setConfirmAction(null);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    setButtonsDisabled(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      setButtonsDisabled(false);
      return;
    }

    const url =
      confirmAction === "approve"
        ? `http://14.225.211.1:8084/api/delivery/ApprovedTicket?ticket_ID=${deliveryLogId}`
        : `http://14.225.211.1:8084/api/delivery/RejecTicket?ticket_ID=${deliveryLogId}`;

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

      if (response.status === 200 && response.data.isSuccess) {
        console.log(
          `${confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)} successful:`,
          response.data
        );
        localStorage.setItem(`actionTaken_${deliveryLogId}`, "true");
        setButtonsVisible(false);
        setActionTaken(true);
        window.location.reload();
      } else {
        console.error(
          `${confirmAction.charAt(0).toUpperCase() + confirmAction.slice(1)} unsuccessful:`,
          response.data.message
        );
        setButtonsDisabled(false);
      }
    } catch (error) {
      console.error(
        `Error ${confirmAction === "approve" ? "approving" : "rejecting"} ticket:`,
        error
      );
      setButtonsDisabled(false);
    } finally {
      handleCloseConfirmDialog();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>
      <div className="delivery-detail-table">
        <DeliveryDetailTable
          deliveryLogId={deliveryLogId}
          onStatusChange={handleStatusChange}
        />
      </div>
      {buttonsVisible && status === "Pending" && (
        <div className="buttons">
          <Button
            variant="contained"
            onClick={() => handleOpenConfirmDialog("approve")}
            disabled={buttonsDisabled}
            size="large"
            sx={{
              backgroundColor: "#44C662",
              "&:hover": {
                bgcolor: "#0bcd2f",
              },
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenConfirmDialog("reject")}
            disabled={buttonsDisabled}
            size="large"
            sx={{
              backgroundColor: "#F23A3A",
              "&:hover": {
                bgcolor: "red",
              },
            }}
          >
            Reject
          </Button>
        </div>
      )}
      {status !== "Pending" && (
        <div className="done-button">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigateToPage(PATH_MAIN.delivery)}
          >
            &larr; Go Back
          </Button>
        </div>
      )}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmAction} this ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmAction === "approve" ? "success" : "error"}
          >
            {confirmAction === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeliveryDetailPageComponent;
