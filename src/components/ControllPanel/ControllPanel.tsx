import styles from './ControllPanel.module.scss';
import React from 'react';
import {Box} from "@mui/material";
import ViewControll from "../ViewControll/ViewControll";
import {useRecoilValue} from "recoil";
import {calendarViewAtom, selectDateTimeFromAtom} from "../../store/atoms";
import {monthesLabel, monthesLabels, weekDays} from "../../store/consts";
import {Sheet} from "@mui/joy";


export default function ControllPanel() {

    const dateFrom = useRecoilValue(selectDateTimeFromAtom);
    const showMode = useRecoilValue(calendarViewAtom);

    let day = dateFrom.date();
    let weekDay = dateFrom.day();
    let month = dateFrom.month();
    let year = dateFrom.year();
    React.useEffect(() => {
         day = dateFrom.date();
         weekDay = dateFrom.day();
         month = dateFrom.month();
         year = dateFrom.year();
    }, [dateFrom]);
    return <Box className={styles.root}>
        <div>
            <Sheet><h1>{showMode === "day" ? day : null} {showMode === "day" ? monthesLabels[month] : monthesLabel[month]} {showMode === "month" ? year : null} {showMode === "day" ? weekDays[weekDay].label : null}</h1></Sheet>
        </div>
        <ViewControll/>
    </Box>
};