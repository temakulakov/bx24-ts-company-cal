import styles from './ControllPanel.module.scss';
import React from 'react';
import {Box} from "@mui/material";
import ViewControll from "../ViewControll/ViewControll";
import IncControll from "../IncControll/IncControll";

export default function ControllPanel() {
    return <Box className={styles.root}>
        <div/>
        <ViewControll/>
    </Box>
};