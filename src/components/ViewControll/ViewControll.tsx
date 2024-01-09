import styles from './ViewControll.module.scss';
import React from "react";
import {Box, Button, Select, Option} from "@mui/joy";
import {useRecoilState} from "recoil";
import {calendarViewAtom, modalAtom} from "../../store/atoms";
import IncControll from "../IncControll/IncControll";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

export default function ViewControll() {
    const [show, setShow] = useRecoilState(calendarViewAtom);
    const [modal, setModal] = useRecoilState(modalAtom);


    const Buttons = [
        <Option value="day" >День</Option>,
        <Option value="week" >Неделя</Option>,
        <Option value="month" >Месяц</Option>,
    ];

    React.useEffect(() => {
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

    return <Box className={styles.root}>
        <Button onClick={() => setModal({...modal, action: "report"})} endDecorator={<AssessmentOutlinedIcon />} style={{marginRight: "10px"}} size="sm" variant="outlined"
                color="neutral">
            Отчеты
        </Button>
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