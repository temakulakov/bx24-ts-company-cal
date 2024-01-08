import React from 'react';
import './App.css';
import {Box} from "@mui/material";
import styles from './App.module.scss';
import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import ruLocale from 'dayjs/locale/ru'
import DayControll from "./components/DayControll/DayControll";
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarViewAtom, selectDateTimeFromAtom, selectDateTimeToAtom} from "./store/atoms";
import ControllPanel from "./components/ControllPanel/ControllPanel";
import Grid from "./components/Grid/Grid";

function App() {
    const show = useRecoilValue(calendarViewAtom);
    const [dateFrom, setDateFrom] = useRecoilState(selectDateTimeFromAtom);
    const [dateTo, setDateTo] = useRecoilState(selectDateTimeToAtom);
    React.useEffect(() => {
        setDateFrom(dayjs(dayjs()))
        setDateTo(dayjs(dayjs()))
    }, []);
  return (
    <div className="App">
      <Box
          style={{width: show === "day" ? "80%" : "100%",
          transition: "0.15s all ease-in-out",
          }}
          sx={{
            height: 'fit-content',
              backgroundColor: 'white',
            borderRadius: 1,
            marginRight: "10px"
          }}
      >
          <ControllPanel/>
            <Grid/>
      </Box>
        <DayControll/>
    </div>
  );
}

export default App;
