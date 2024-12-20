import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import TaskCategoryIcon from "../../../icons/TaskCategoryIcon";
import { updateTask } from "../../../../redux/tasksSlice";
import { useDispatch } from "react-redux";
import { updateTaskTrackTimer } from "../../../../redux/uiSlice";
const WidgetTaskTrackTime = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const getTasksListData = useSelector(
    (state) => state.ui.displayDashboardTasks
  );
  const taskInProgress = useSelector((state) => state.ui.taskInProgress);
  const taskInProgressData = useSelector(
    (state) => state.ui.taskInProgressData
  );
  const [pendingTasksListData, setPendingTasksListData] = useState([]);
  useEffect(() => {
    const pendingTasks = getTasksListData.filter((task) => {
      return task.status === "Pending" || task.status === "In-progress";
    });
    setPendingTasksListData(pendingTasks);
  }, [getTasksListData]);
  const handleTaskTimerButton = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === "Pending" ? "In-progress" : "Pending",
    };
    dispatch(
      updateTask({
        data: updatedTask,
        userId: currentUser.email,
        taskId: updatedTask.taskId,
      })
    );
    if (taskInProgress === true) {
      dispatch(updateTaskTrackTimer({ status: false, task: {} }));
    } else {
      dispatch(updateTaskTrackTimer({ status: true, task: updatedTask }));
    }
  };
  return (
    <>
      <Grid2 mt={1} container alignItems={"center"}>
        <Grid2 size={10}>
          <Typography className="dashboard-widget-title" variant="h6">
            Track task time
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Tooltip title="Click on Start to start timer.">
            <Typography
              fontFamily={"monospace"}
              fontWeight={"bolder"}
              variant="h6"
            >
              i
            </Typography>
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
            my: 3,
          },
        }}
      >
        <Box sx={{ px: 3 }}>
          {pendingTasksListData.length > 0 ? (
            pendingTasksListData.map((task, index) => {
              return (
                <React.Fragment key={task.taskId}>
                  <Box sx={{ py: 2 }}>
                    <Grid2 container spacing={2} alignItems={"center"}>
                      <Grid2
                        size={2}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <TaskCategoryIcon category={task.category} />
                      </Grid2>
                      <Grid2 size={6}>
                        <Tooltip
                          title={
                            <Typography variant="body2">
                              {task.title}
                            </Typography>
                          }
                        >
                          <Typography
                            textAlign={"start"}
                            variant="body1"
                            sx={{
                              textOverflow: "ellipsis", // Shows ellipsis by default
                              whiteSpace: "nowrap", // Prevents text wrapping by default
                              overflow: "hidden", // Hides overflowing text
                            }}
                          >
                            {task.title}
                          </Typography>
                        </Tooltip>
                      </Grid2>
                      <Grid2 size={4}>
                        {task.status === "In-progress" ? (
                          <Button
                            onClick={() => handleTaskTimerButton(task)}
                            sx={{
                              bgcolor: theme.palette.primary.grey,
                              color: theme.palette.text.primary,
                            }}
                          >
                            <PauseIcon />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleTaskTimerButton(task)}
                            disabled={taskInProgress}
                            sx={{
                              bgcolor: theme.palette.primary.grey,
                              color: theme.palette.text.primary,
                            }}
                          >
                            <PlayArrowIcon />
                          </Button>
                        )}
                      </Grid2>
                    </Grid2>
                  </Box>
                  {getTasksListData.length - 1 > index ? <Divider /> : <></>}
                </React.Fragment>
              );
            })
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontSize="larger" fontWeight="700">
                No pending Task on this date
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default WidgetTaskTrackTime;
