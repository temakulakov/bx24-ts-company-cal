import styles from './IncControll.module.scss';
import React from 'react';
import {Box, Button, ButtonGroup} from "@mui/joy";
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarViewAtom, selectDateTimeFromAtom, selectDateTimeToAtom} from "../../store/atoms";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export default function IncControll() {
    const showMode = useRecoilValue(calendarViewAtom);
    const [dateFrom, setDateFrom] = useRecoilState(selectDateTimeFromAtom);
    const [dateTo, setDateTo] = useRecoilState(selectDateTimeToAtom);
    dayjs.locale('ru'); // Установите локаль 'ru'

    const getButtonText = () => {
        switch (showMode) {
            case 'day':
                return 'Сегодня';
            case 'week':
                return 'Эта неделя';
            case 'month':
                return dateFrom.format('MMMM');
            default:
                return '';
        }
    };

    const buttons = [
        <Button key="day" onClick={() => handleClick("-")}><KeyboardArrowLeftRoundedIcon/></Button>,
        <Button key="week" sx={{transition: ".5s all easy"}}
                onClick={() => handleClick("=")}>{getButtonText()}</Button>,
        <Button key="month" onClick={() => handleClick("+")}><KeyboardArrowRightRoundedIcon/></Button>,
    ];
    const handleClick = (action: '-' | '+' | '=') => {
        switch (action) {
            case '-':
                setDateFrom(dateFrom.subtract(1, 'days'));
                break;
            case '+':
                setDateFrom(dateFrom.add(1, 'days'));
                break;
            case '=':
                setDateFrom(dayjs(dayjs()));
                break;
            default:
                break;
        }
    }
    return <Box>
        <ButtonGroup size="sm">
            {buttons}
        </ButtonGroup>
    </Box>
}