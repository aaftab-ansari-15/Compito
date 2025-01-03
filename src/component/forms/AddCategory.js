import {
  Box,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryForm } from "../../redux/uiSlice";
import { addCategory } from "../../redux/categorySlice";
import CloseIcon from "@mui/icons-material/Close";
import { generateRandomID } from "../../utills/genral";
const initialCategoryData = {
  id: "",
  name: "",
  icon: "",
  date: (() => {
    const today = new Date().toISOString();
    const [year, month, day] = today.split("T")[0].split("-");
    return `${month}/${day}/${year}`;
  })(),
};

const AddCategory = () => {
  const dispatch = useDispatch();
  const isCategoryFormOpen = useSelector((state) => state.ui.isCategoryForm);
  const categoryData = useSelector((state) => state.category);
  const [newCategory, setNewCategory] = useState(initialCategoryData);
  const [formError, setFormError] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
    if (value !== "") {
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  const handleAddClick = () => {
    const lastIndex = categoryData.length + generateRandomID();
    const icon = "defaultIcon";
    const updatedCategory = {
      ...newCategory,
      id: lastIndex,
      icon: icon,
    };
    dispatch(addCategory(updatedCategory));
    console.log("New Category Added");
    dispatch(addCategoryForm(false));
  };
  const handleCancelClick = () => {
    dispatch(addCategoryForm(false));
  };
  return (
    isCategoryFormOpen && (
      <Dialog
        open={isCategoryFormOpen}
        onClose={handleCancelClick}
        PaperProps={{
          style: {
            width: "40vw",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Typography variant="h5">Add new category</Typography>
        </Box>
        <Divider />
        <Box sx={{ m: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="inherit">New category name</Typography>

            <TextField
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="text"
              fullWidth
              variant="outlined"
              color="info"
              value={newCategory.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="inherit">
              Date created (Today's date)
            </Typography>
            <TextField
              margin="dense"
              id="date"
              name="date"
              type="date"
              fullWidth
              variant="outlined"
              color="info"
              value={newCategory.date}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ marginRight: 2, width: "50%" }}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleCancelClick}
              >
                <span>Cancel</span> <CloseIcon />
              </Button>
            </Box>
            <Box sx={{ marginLeft: 2, width: "50%" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddClick}
                fullWidth
                sx={{
                  border: "2px solid #388e3c",
                  "&.Mui-disabled": {
                    backgroundColor: "success.main",
                    color: "white",
                  },
                }}
                disabled={formError}
              >
                <span>Add</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    )
  );
};
export default AddCategory;
