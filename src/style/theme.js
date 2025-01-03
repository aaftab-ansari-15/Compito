import { createTheme } from "@mui/material";
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff233", // Adjust the yellow hex code as needed
      dark: "#ffdb00", //dark yellow
      grey: "#dedede",
      light: "#fffabf",
      light1: "#fdf265",
    },
    secondary: {
      main: "#fff233", //yellow
      dark: "#f0f0f0",
      light: "#B3D1FF",
    },
    background: {
      default: "#fffee5", //light yellow
    },
    text: {
      primary: "#2a2a2a", // '#000'
    },
    scrollbar: {
      thumb: "#f8fa93",
      track: "#7b7b7b",
    },
    myTaskCard: {
      main: "#fdfbbf",
    },
    taskTrackButton: {
      start: "#00b900",
      pause: "#e5540f",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff233", // Adjust the yellow hex code as needed
      dark: "#ffdb00", //dark yellow
      grey: "#606060",
      light: "#fffabf",
      light1: "#fdf265",
    },
    secondary: {
      main: "#323232",
      dark: "#2a2a2a",
      light: "#B3D1FF",
    },
    background: {
      default: "#121212", // white
      // paper: '#242424'// white
    },
    text: {
      primary: "#FFF", //'#000'
    },
    scrollbar: {
      thumb: "#555555",
      track: "#e9e9e9",
    },
    myTaskCard: {
      main: "#2a2a2a",
    },
    taskTrackButton: {
      start: "#4c4c4c", // '#000'
      pause: "#6c6c6c",
    },
  },
});

export { lightTheme, darkTheme };
