// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import currentUserReducer from "./currentUserSlice";
import tasksReducer from "./tasksSlice";
import uiReducer from "./uiSlice";
import filterReducer from "./filterSlice";
import sortReducer from "./sortSlice";
import useFullReducer from "./useFullSlice";
import categoryReducer from "./categorySlice"
import taskTrackTimeReducer from "./taskTrackTime"
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    tasks: tasksReducer,
    category: categoryReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});
