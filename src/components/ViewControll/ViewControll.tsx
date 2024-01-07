import styles from './ViewControll.module.scss';
import React from "react";
import {Box, Button, Select, Option} from "@mui/joy";
import {ButtonGroup} from "@mui/joy";
import {useRecoilState} from "recoil";
import {calendarViewAtom} from "../../store/atoms";
import IncControll from "../IncControll/IncControll";

export default function ViewControll() {
    const [show, setShow] = useRecoilState(calendarViewAtom);



    const Buttons = [
        <Option value="day" >День</Option>,
        <Option value="week" >Неделя</Option>,
        <Option value="month" >Месяц</Option>,
    ];

    React.useEffect(() => {
        console.log(show);
    }, [show]);

        const handleClick = (view: 'day' | 'week' | 'month') => {
        setShow(view);
    }

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: 'day' | 'week' | 'month' | null,
    ) => {
        setShow(newValue!);
    };

    return <Box  className={styles.root}>
        <Select
            color="neutral"
            disabled={false}
            placeholder="День"
            size="sm"
            variant="outlined"
            value={show}
            onChange={handleChange}
            sx={{marginRight: "10px"}}
        >
            {Buttons}
        </Select>
        <IncControll/>
    </Box>
};