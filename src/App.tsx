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
import {calendarViewAtom, eventsAtom, sectionsAtom, selectDateTimeFromAtom, selectDateTimeToAtom} from "./store/atoms";
import ControllPanel from "./components/ControllPanel/ControllPanel";
import Grid from "./components/Grid/Grid";
import axios from "axios";
import ModalC from "./components/ModalC/ModalC";

function App() {
    const show = useRecoilValue(calendarViewAtom);
    const [dateFrom, setDateFrom] = useRecoilState(selectDateTimeFromAtom);
    const [dateTo, setDateTo] = useRecoilState(selectDateTimeToAtom);

    const [sections, setSections] = useRecoilState(sectionsAtom);
    const [events, setEvents] = useRecoilState(eventsAtom);

    React.useEffect(() => {
        setDateFrom(dayjs(dayjs()))
        setDateTo(dayjs(dayjs()))
    }, []);
    React.useEffect(() => {
        const fetchData = async () => {
            try {

                const sectionsResponse = await axios.post(
                    'https://intranet.gctm.ru/rest/1552/jx5itnlnk81dxcol/calendar.section.get',
                    {
                        type: 'company_calendar',
                        ownerId: ''
                    }
                );
                setSections(sectionsResponse.data.result);
                const eventsResponse = await axios.post(
                    'https://intranet.gctm.ru/rest/1552/jx5itnlnk81dxcol/calendar.event.get',
                    {
                        type: 'company_calendar',
                        ownerId: '',
                        from: dateFrom.format('DD.MM.YYYY'),
                        to: dateTo.format('DD.MM.YYYY'),
                    }
                );
                setEvents(eventsResponse.data.result);
                console.log(eventsResponse.data.result);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {

            }
        };
        fetchData();
    }, [dateFrom, dateTo]);
    React.useEffect(() => {
        console.log(sections, events);
    }, [sections, events]);
  return (
    <div className="App">
      <Box
          style={{marginTop: "8px",width: show === "day" ? "75%" : "100%",
          transition: "0.15s all ease-in-out",
          }}
          sx={{
            height: 'fit-content', backgroundColor: 'white',
            borderRadius: 1,
            marginRight: "10px"
          }}
      >
          <ControllPanel/>
            <Grid/>
      </Box>
        <DayControll/>
        <ModalC/>
    </div>
  );
}

export default App;
