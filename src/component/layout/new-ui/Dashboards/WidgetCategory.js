import {
  Box,
  Divider,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { addCategoryForm } from "../../../../redux/uiSlice";
import { useTheme } from "@emotion/react";
import CategoryIcons from "../../../icons/TaskCategoryIcon";

const WidgetCategory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const getCategoryData = useSelector((state) => state.category);

  const handleAddCategory = () => {
    dispatch(addCategoryForm(true));
  };
  return (
    <>
      <Grid2 mt={1} container sx={{ alignItems: "center" }}>
        <Grid2 size={10}>
          <Typography className="dashboard-widget-title" variant="h6">
            Caetegory
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Tooltip title="Add new category">
            <IconButton sx={{ m:0, p:0 }} onClick={handleAddCategory}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid2>
      </Grid2>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          overflow: "auto",
          maxHeight: "240px",
          "&::-webkit-scrollbar": {
            width: "0.5rem",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.scrollbar.thumb,
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.scrollbar.track,
            borderRadius: "10px",
            my:3
          },
        }}
      >
        <List sx={{ width: "100%", px: 2, py: 0 }}>
          {getCategoryData.length > 0 &&
            getCategoryData.map((data, index) => {
              return (
                <React.Fragment key={data.id}>
                  <Box sx={{ py: 1 }}>
                    <ListItem className="widget-list-item-category" sx={{p:0, m:0}}>
                      <Box className="list-item-highlight" />
                      <ListItemAvatar sx={{ ml: 2 }}>
                        <CategoryIcons category={data.icon} />
                      </ListItemAvatar>
                      <ListItemText primary={data.name} secondary={data.date} />
                    </ListItem>
                  </Box>
                  {getCategoryData.length - 1 > index ? (
                    <Divider />
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default WidgetCategory;
