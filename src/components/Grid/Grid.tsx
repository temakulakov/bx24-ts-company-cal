import styles from './Grid.module.scss';
import React from 'react';
import {Box} from "@mui/joy";
import TimeLine from "../TimeLine/TimeLine";
import GridHeader from "../GridHeader/GridHeader";
import GridBody from "../GridBody/GridBody";

export default function Grid() {
    return <Box className={styles.root}>
        <Box>
            <TimeLine/>
        </Box>
        <Box className={styles.body} height={"100%"}>
            <Box className={styles.header}><GridHeader/></Box>
            <Box className={styles.header}><GridBody/></Box>
        </Box>

    </Box>
}