import styles from './GridBody.module.scss';
import React from 'react';
import {useRecoilValue} from "recoil";
import {calendarViewAtom, eventsAtom, sectionsAtom, selectDateTimeFromAtom} from "../../store/atoms";
import {Sheet} from "@mui/joy";
import {IHeight} from "../Grid/Grid";
import dayjs from "dayjs";
interface IProps {
    hight: IHeight;
}
export default function GridBody(props: IProps) {
    const events = useRecoilValue(eventsAtom);
    const sections = useRecoilValue(sectionsAtom);
    const viewMode = useRecoilValue(calendarViewAtom);
    const dateFrom = useRecoilValue(selectDateTimeFromAtom);
    const [incElement, setIncElement] = React.useState<number>(2.16666);

    React.useEffect(() => {
        switch (viewMode) {
            case 'day':
                setIncElement(3120 / 24 / 60);
                break;
            case 'week':
                setIncElement(910 / 7);
                break;
            case 'month':
                setIncElement(2.16666);
                break;
        }
    }, [viewMode]);

    return <>
        {sections.map((section, index) => {
            return <div className={styles.root} style={props.hight}>
                {events.map((event_, index) => {
                    if (section.ID === event_.SECTION_ID) {
                        const currentDateFrom: dayjs.Dayjs = dayjs(event_.DATE_FROM);
                        const currentDateTo: dayjs.Dayjs = dayjs(event_.DATE_TO);
                        const startOfDay: dayjs.Dayjs = currentDateFrom.startOf('day');
                        const minutesSinceStartOfDayFrom: number = currentDateFrom.diff(startOfDay, 'minute');
                        const minutesSinceStartOfDayTo: number = currentDateTo.diff(startOfDay, 'minute');
                        const height: number = (minutesSinceStartOfDayTo - minutesSinceStartOfDayFrom) * incElement;
                        const top: number = (minutesSinceStartOfDayFrom) * incElement;

                        return <Sheet style={{background: section.COLOR, top: `${top}px`, height: `${height}px`}}  className={styles.eventWrapper}>{event_.NAME}<br/>{event_.DATE_FROM}<br/>{event_.DATE_TO}</Sheet>
                    }
                })}
            </div>

        }
        )}

    </>
};