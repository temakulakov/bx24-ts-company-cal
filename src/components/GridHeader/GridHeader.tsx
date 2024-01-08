import styles from "./GridHeader.module.scss";
import React from "react";
import {useRecoilValue} from "recoil";
import {sectionsAtom} from "../../store/atoms";
import {Sheet} from "@mui/joy";




export default function GridHeader() {
    const sections = useRecoilValue(sectionsAtom);
    return <>
        {sections.map((section, index) => <Sheet className={styles.root}>{section.NAME}</Sheet>)}
    </>
}