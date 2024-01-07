import styles from './IncControll.module.scss';
import React from 'react';
import {Box, Button, ButtonGroup} from "@mui/joy";
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarViewAtom, selectDateTimeFromAtom} from "../../store/atoms";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export default function IncControll() {
    const showMode = useRecoilValue(calendarViewAtom);
    const dateFrom = useRecoilValue(selectDateTimeFromAtom);
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
        <Button key="day" onClick={() => handleClick("day")}><KeyboardArrowLeftRoundedIcon/></Button>,
        <Button key="week" sx={{transition: ".5s all easy"}} onClick={() => handleClick("week")}>{getButtonText()}</Button>,
        <Button key="month" onClick={() => handleClick("month")}><KeyboardArrowRightRoundedIcon/></Button>,
    ];
    const handleClick = (view: 'day' | 'week' | 'month') => {

    }
    return <Box>
        <ButtonGroup size="sm" >
            {buttons}
        </ButtonGroup>
    </Box>
}