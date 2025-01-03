import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskForm } from "../../redux/uiSlice";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Divider,
  Box,
  Dialog,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateTask } from "../../redux/tasksSlice";

const defaultTask = {
  taskId: "",
  title: "",
  description: "",
  dueDate: "",
  priority: "",
  category: "",
  status: "",
  timeSpent: "00:00:00",
  pined: false,
};
const UpdateTaskInUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const isUpdateTaskForm = useSelector((state) => state.ui.isUpdateTaskForm);
  const updateTaskFormData = useSelector(
    (state) => state.ui.updateTaskFormData
  );
  const [updatedTask, setUpdatedTask] = useState(updateTaskFormData);
  const [errors, setErrors] = useState(defaultTask);
  useEffect(() => {
    setUpdatedTask(updateTaskFormData);
  }, [updateTaskFormData]);
  const isFormValid =
    !errors.description &&
    !errors.dueDate &&
    !errors.category &&
    !errors.priority &&
    updatedTask.title &&
    updatedTask.description &&
    updatedTask.dueDate &&
    updatedTask.category &&
    updatedTask.priority;

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "pinned") {
      setUpdatedTask((prevState) => ({
        ...prevState,
        [name]: checked, 
      }));
    } else {
      setUpdatedTask({ ...updatedTask, [name]: value });
    }
    switch (name) {
      case "description":
        setErrors({
          ...errors,
          description: value.length > 0 ? "" : "description can not be empty",
        });
        break;
      default:
        break;
    }
  };

  const handleUpdateTaskClick = () => {
    dispatch(
      updateTask({
        data: updatedTask,
        userId: currentUser.email,
        taskId: updatedTask.taskId,
      })
    );
    setUpdatedTask(defaultTask);
    dispatch(updateTaskForm({ arg1: false, arg2: {} }));
  };
  const handleClose = () => {
    dispatch(updateTaskForm({ arg1: false, arg2: {} }));
  };

  return (
    <>
      <Dialog
        open={isUpdateTaskForm}
        onClose={handleClose}
        PaperProps={{
          style: {
            marginTop: "50px",
            width: "40vw",
            overflow: "hidden",
          },
        }}
      >
        {isUpdateTaskForm && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Box
                sx={{
                  textAlign: "center",
                  flexGrow: 2,
                }}
              >
                <Typography variant="h5">Update Task</Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ mx: "15%", my: 4 }}>
              <Box sx={{ mb: 3, display: "flex" }}>
                <Box sx={{ flexGrow: 2 }}>
                  <Typography variant="inherit">Task name</Typography>

                  <TextField
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    disabled
                    value={updatedTask.title || ""}
                  />
                </Box>
                {/* <Box sx={{ ml: 2, pl: 2 }}>
                  <Typography variant="inherit">Pin task</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="pinned"
                        name="pinned"
                        color="info"
                        checked={updatedTask.pinned || false}
                        onChange={handleChange}
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 50 },
                        }}
                      />
                    }
                  />
                </Box> */}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="inherit">Task description</Typography>

                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  color="info"
                  value={updatedTask.description || ""}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}
              >
                <Box sx={{ width: "-webkit-fill-available", mr: 1 }}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      id="priority"
                      name="priority"
                      defaultValue=""
                      color="info"
                      value={updatedTask.priority || ""}
                      onChange={handleChange}
                      label="Priority"
                      fullWidth
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ width: "-webkit-fill-available", mx: 1 }}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      defaultValue=""
                      color="info"
                      value={updatedTask.category || ""}
                      onChange={handleChange}
                      label="Category"
                      fullWidth
                    >
                      <MenuItem value="Work">Work</MenuItem>
                      <MenuItem value="Personal">Personal</MenuItem>
                      <MenuItem value="Study">Study</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: "-webkit-fill-available", ml: 1 }}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      defaultValue=""
                      value={updatedTask.status || ""}
                      onChange={handleChange}
                      label="status"
                      color="info"
                      fullWidth
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="inherit">Task due date</Typography>

                <TextField
                  margin="dense"
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  fullWidth
                  variant="outlined"
                  color="info"
                  value={updatedTask.dueDate || ""}
                  onChange={handleChange}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ marginRight: 2, width: "50%" }}>
                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={handleClose}
                  >
                    <span>Cancel</span> <CloseIcon />
                  </Button>
                </Box>
                <Box sx={{ marginLeft: 2, width: "50%" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleUpdateTaskClick}
                    fullWidth
                    disabled={!isFormValid}
                    sx={{
                      border: "2px solid #f57c00",
                      "&.Mui-disabled": {
                        backgroundColor: "warning.main", 
                        color: "white", 
                      },
                    }}
                  >
                    <span>Update</span>
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};

export default UpdateTaskInUser;
