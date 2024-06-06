import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectChangeEvent } from "@mui/material/Select";

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

interface FetchedCategory {
  categoryId: number;
  categoryName: string;
}

interface Supplier {
  supplerId: number;
  supplierName: string;
}

const DeliveryBookTicket: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(true);
  const [supplierId, setSupplierId] = useState<number>(2);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchedCategories, setFetchedCategories] = useState<FetchedCategory[]>(
    []
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://14.225.211.1:8084/api/category/GetAllCategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.result && Array.isArray(data.result)) {
            setFetchedCategories(data.result);
            if (data.result.length > 0) {
              setCategories([
                { categoryId: data.result[0].categoryId, quantity: 1 },
              ]);
            }
          } else {
            console.error("Fetched data is not in expected format:", data);
          }
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.post(
          "http://14.225.211.1:8084/api/Supplier/GetAllSupplier",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.isSuccess) {
          setSuppliers(response.data.result);
        } else {
          console.error("Error fetching suppliers:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchCategories();
    fetchSuppliers();
  }, [token]);

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
    if (fetchedCategories.length > 0) {
      setCategories([
        ...categories,
        { categoryId: fetchedCategories[0].categoryId, quantity: 1 },
      ]);
    }
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
    const supplierName =
      suppliers.find((supplier) => supplier.supplerId === supplierId)
        ?.supplierName || "";

    const deliveryData = {
      deliveryLog: {
        supplier: { supplerId: supplierId, supplierName: supplierName },
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
        `http://14.225.211.1:8084/api/delivery/BookDeliveryTicket?confirm=${confirm}`,
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
    <>
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
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.supplerId} value={supplier.supplerId}>
                  {supplier.supplierName}
                </MenuItem>
              ))}
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
                  {fetchedCategories.map((fetchedCategory) => (
                    <MenuItem
                      key={fetchedCategory.categoryId}
                      value={fetchedCategory.categoryId}
                    >
                      {fetchedCategory.categoryName}
                    </MenuItem>
                  ))}
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
          <Button onClick={addCategory} sx={{ marginTop: 2 }}>
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
    </>
  );
};

export default DeliveryBookTicket;
