import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changePickUpDate } from '../../redux/useFullSlice';
import "./Calendar.css";

export default function BasicDateCalendar() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(dayjs(new Date()));
  useEffect(() => {
    dispatch(changePickUpDate({ type: 'SET_DATE',
        payload: value  .format('YYYY-MM-DD')}));
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)}/>
    </LocalizationProvider>
  );
}