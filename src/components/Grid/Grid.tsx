import styles from './Grid.module.scss';
import React from 'react';
import {Box} from "@mui/joy";
import TimeLine from "../TimeLine/TimeLine";

export default function Grid() {
    return <Box className={styles.root}>
        <Box>
            <TimeLine/>
        </Box>
        <Box>
            <Box>Header</Box>
            <Box>Body</Box>
        </Box>

    </Box>
}