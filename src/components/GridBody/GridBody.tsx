import styles from './GridBody.module.scss';
import React from 'react';
import {useRecoilValue} from "recoil";
import {eventsAtom, sectionsAtom} from "../../store/atoms";
import {Sheet} from "@mui/joy";

export default function GridBody() {
    const events = useRecoilValue(eventsAtom);
    const sections = useRecoilValue(sectionsAtom);

    return <>
        {sections.map((section, index) => {
            return <div className={styles.root}>
                {events.map((event_, index) => {
                    if (section.ID === event_.SECTION_ID) {
                        return <Sheet>{event_.NAME}</Sheet>
                    }
                })}
            </div>

        }
        )}

    </>
};