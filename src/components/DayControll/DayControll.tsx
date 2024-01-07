import styles from "./DayControll.module.scss";
import React from "react";
import {useRecoilState} from "recoil";
import {calendarViewAtom, selectDateTimeFromAtom, selectDateTimeToAtom} from "../../store/atoms";
import {Box} from "@mui/material";
import {useRecoilValue} from "recoil";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {StaticDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

export default function DayControll() {
    const [dayFrom, setDayFrom] = useRecoilState(selectDateTimeFromAtom);
    const [dayTo, setDayTo] = useRecoilState(selectDateTimeToAtom);
    const showMode = useRecoilValue(calendarViewAtom);

    React.useEffect(() => {
        console.log(dayFrom);
    }, [dayFrom]);

    const handleDayChange = (date: Dayjs | null) => {
        setDayFrom(date || dayjs());
        setDayTo(date || dayjs());
    }

    return  <Box style={{display: !(showMode === "day") ? "none" : "block"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <DemoContainer
                components={[
                    'DatePicker',
                    'MobileDatePicker',
                    'DesktopDatePicker',
                    'StaticDatePicker',
                ]}
            >
                <DemoItem label="">
                    <StaticDatePicker
                        defaultValue={dayjs('2022-04-17')}
                        sx={{
                            width: 320,
                            marginLeft: "15px",
                            padding: 0,

                        }}
                        value={dayFrom}
                        onChange={date => handleDayChange(date)}
                    />
                </DemoItem>
                {/*<BasicDateTimePicker/>*/}
            </DemoContainer>
        </LocalizationProvider>
    </Box>
}