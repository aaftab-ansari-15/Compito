import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  setLocalStorageData,
  removeLocalStorageData,
} from "../storage/localStorageUtils";
import {
  getSessionStorageData,
  setSessionStorageData,
  removeSessionStorageData,
} from "../storage/sessionStorageUtils";
import STORAGE_KEYS from "../constants/storageKey";
const getAllUsers = getLocalStorageData(STORAGE_KEYS.USERS);
const getCurrentUser = getSessionStorageData(STORAGE_KEYS.CURRENT_USER);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: getAllUsers,
    currentUser: getCurrentUser,
  },
  reducers: {
    addUser: (state, action) => {
      const { data } = action.payload;
      state.users.push(data);
      setLocalStorageData(STORAGE_KEYS.USERS, state.users);
    },
    updateUser: (state, action) => {
      const { data } = action.payload;
      state.users = state.users.map((user) =>
        user.email === data.email ? { ...user, ...data } : user
      );
      setLocalStorageData(STORAGE_KEYS.USERS, state.users);
    },
    deleteUser: (state, action) => {
      const { userId } = action.payload;
      state.users = state.users.filter((user) => user.email !== userId);
      setLocalStorageData(STORAGE_KEYS.USERS, state.users);
      removeSessionStorageData(STORAGE_KEYS.CURRENT_USER);
    },
    deleteAllusers: (state) => {
      state.users = [];
      removeLocalStorageData(STORAGE_KEYS.USERS);
    },
    loginUser: (state, action) => {
      const { data } = action.payload;
      const usersData = getLocalStorageData(STORAGE_KEYS.USERS);
      usersData.forEach((user) => {
        if (user.email === data.email) {
          user.isLogin = true;
        }
      });
      state.currentUser = data;
      setLocalStorageData(STORAGE_KEYS.USERS, usersData);
      setSessionStorageData(STORAGE_KEYS.CURRENT_USER, state.currentUser);
    },
    logoutUser: (state, action) => {
      const { userId } = action.payload;
      const usersData = getLocalStorageData(STORAGE_KEYS.USERS);
      usersData.forEach((user) => {
        if (user.email === userId) {
          user.isLogin = false;
        }
      });
      state.currentUser = null;
      setLocalStorageData(STORAGE_KEYS.USERS, usersData);
      removeSessionStorageData(STORAGE_KEYS.CURRENT_USER);
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  deleteAllusers,
  loginUser,
  logoutUser,
} = usersSlice.actions;
export default usersSlice.reducer;
