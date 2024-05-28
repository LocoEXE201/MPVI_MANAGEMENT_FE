import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface FormValues {
  driverContact: string;
  supplierId: number;
  note: string;
  deliveryOn: string;
}

interface Category {
  categoryId: number;
  quantity: number;
}

const DeliveryBookTicket: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [confirm, setConfirm] = React.useState<boolean>(true);
  const [supplierId, setSupplierId] = React.useState<number>(2);
  const [categories, setCategories] = React.useState<Category[]>([
    { categoryId: 2, quantity: 1 },
  ]);
  const token = localStorage.getItem("accessToken");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setConfirm(false);
    setOpen(false);
  };

  const handleSupplierChange = (event: SelectChangeEvent<number>) => {
    setSupplierId(Number(event.target.value));
  };

  const handleCategoryChange = (
    index: number,
    event: SelectChangeEvent<number>
  ) => {
    const newCategories = [...categories];
    newCategories[index].categoryId = Number(event.target.value);
    setCategories(newCategories);
  };

  const handleQuantityChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCategories = [...categories];
    newCategories[index].quantity = Number(event.target.value);
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { categoryId: 2, quantity: 1 }]);
  };

  const deleteCategory = (index: number) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(
      formData.entries()
    ) as unknown as FormValues;

    const deliveryData = {
      deliveryLog: {
        supplier: { supplerId: supplierId },
        createdOn: new Date().toISOString(),
        deliveryOn: new Date(formJson.deliveryOn).toISOString(),
        driverContact: formJson.driverContact,
        note: formJson.note,
      },
      cateList: categories.map((category) => ({
        categoryID: category.categoryId,
        quantity: category.quantity,
      })),
    };

    try {
      const response = await fetch(
        `https://mpviwarehouse.azurewebsites.net/api/delivery/BookDeliveryTicket?confirm=${confirm}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(deliveryData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        window.location.reload(); // Reload the page after successful booking
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ height: "40px" }}
        startIcon={<AddIcon style={{ color: "#fff" }} />}
      >
        Book Ticket
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            setConfirm(true);
            handleSubmit(event);
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          BOOKING DELIVERY TICKET
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book a ticket, please fill in all the fields and click on the
            Submit button.
          </DialogContentText>
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              id="supplierId"
              name="supplierId"
              value={supplierId}
              onChange={handleSupplierChange}
              label="Supplier"
            >
              <MenuItem value={1}>Oceanic Entertainment</MenuItem>
              <MenuItem value={2}>
                MPVI - Mentorship for people with vision impairment
              </MenuItem>
            </Select>
          </FormControl>
          {categories.map((category, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <FormControl fullWidth margin="dense" variant="standard">
                <InputLabel id={`category-label-${index}`}>Product</InputLabel>
                <Select
                  labelId={`category-label-${index}`}
                  id={`categoryId-${index}`}
                  name={`categoryId-${index}`}
                  value={category.categoryId}
                  onChange={(event) => handleCategoryChange(index, event)}
                  label="Product"
                >
                  <MenuItem value={2}>Milk coffee</MenuItem>
                  <MenuItem value={3}>Black coffee</MenuItem>
                  <MenuItem value={4}>Cappuccino</MenuItem>
                  <MenuItem value={5}>Book type 1</MenuItem>
                  <MenuItem value={6}>Book type 2</MenuItem>
                  <MenuItem value={7}>Dash book</MenuItem>
                  <MenuItem value={8}>Black pen</MenuItem>
                  <MenuItem value={9}>Color pen 8</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                margin="dense"
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                label="Quantity"
                type="number"
                fullWidth
                variant="standard"
                value={category.quantity}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuantityChange(index, event)
                }
                style={{ marginLeft: 8 }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteCategory(index)}
                style={{ marginLeft: 8 }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={addCategory}>
            Add Product
            <AddIcon fontSize="small" style={{ marginLeft: "5px" }} />
          </Button>
          <TextField
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
            id="deliveryOn"
            name="deliveryOn"
            label="Delivery On"
            type="datetime-local"
            fullWidth
            variant="standard"
            defaultValue={new Date().toISOString().slice(0, 16)}
          />
          <TextField
            margin="dense"
            id="note"
            name="note"
            label="Note"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeliveryBookTicket;
