import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSelectedDate, taskAlert } from "../../redux/uiSlice";

export default function BasicDateCalendar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(dayjs(new Date()));
  useEffect(() => {
    dispatch(setSelectedDate({ date: value.format("YYYY-MM-DD") }));
    dispatch(taskAlert({ alertState: false, taskAlertData: {} }));
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{}}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
