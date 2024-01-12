import styles from './GridBody.module.scss';
import React from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarViewAtom, eventsAtom, modalAtom, sectionsAtom, selectDateTimeFromAtom} from "../../store/atoms";
import {Sheet} from "@mui/joy";
import {IHeight} from "../Grid/Grid";
import dayjs from "dayjs";
import axios from "axios";
import {ISectionObject} from "../../store/types";
interface IProps {
    hight: IHeight;
}
export default function GridBody(props: IProps) {
    const events = useRecoilValue(eventsAtom);
    const sections = useRecoilValue(sectionsAtom);
    const viewMode = useRecoilValue(calendarViewAtom);
    const dateFrom = useRecoilValue(selectDateTimeFromAtom);
    const [modal, setModal] = useRecoilState(modalAtom);
    const [incElement, setIncElement] = React.useState<number>(2.16666);

    React.useEffect(() => {
        switch (viewMode) {
            case 'day':
                setIncElement(3120 / 24 / 60);
                break;
            case 'week':
                setIncElement(910 / 7 / 1000);
                break;
            case 'month':
                setIncElement((dateFrom.daysInMonth() * 130) / 10000);
                break;
        }
    }, [viewMode]);

    const fetchCurrentEvent = (eventId: number, name: string, filial: ISectionObject | undefined, dateFrom: dayjs.Dayjs, dateTo: dayjs.Dayjs) => {
        const fetchData = async () => {
            try {
                const sectionsResponse = await axios.post(
                    'https://intranet.gctm.ru/rest/1552/jx5itnlnk81dxcol/calendar.event.getbyid',
                    {
                        id: eventId
                    }
                );
                console.log(sectionsResponse.data.result);
                setModal({
                    action: "open",
                    name: name,
                    filial: filial,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    description: sectionsResponse.data.result.DESCRIPTION,
                });
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            } finally {

            }
        };
        fetchData();
    }

    return <>
        {sections.map((section, index) => {
            return <div
                className={styles.root}
                style={props.hight}
                // onClick={() => {setModal({
                //     action: "new",
                //     name: "",
                //     filial: section,
                //     dateFrom: dayjs(dayjs().subtract(1, "hour")),
                //     dateTo: dayjs(dayjs().add(1, "hour")),
                //     description: null,
                // })}}
            >
                {events.map((event_, index) => {
                    if (section.ID === event_.SECTION_ID) {
                        const currentDateFrom: dayjs.Dayjs = dayjs(event_.DATE_FROM);
                        const currentDateTo: dayjs.Dayjs = dayjs(event_.DATE_TO);
                        const startOfDay: dayjs.Dayjs = currentDateFrom.startOf('day');
                        const minutesSinceStartOfDayFrom: number = currentDateFrom.diff(startOfDay, 'minute');
                        const minutesSinceStartOfDayTo: number = currentDateTo.diff(startOfDay, 'minute');
                        const height: number = (minutesSinceStartOfDayTo - minutesSinceStartOfDayFrom) * incElement;
                        const top: number = (minutesSinceStartOfDayFrom) * incElement;

                        return <Sheet
                            style={{background: section.COLOR, top: `${top}px`, maxHeight: viewMode === 'day' ? `${height}px` : `30px`}}
                            className={styles.eventWrapper}
                            onClick={() => {
                                fetchCurrentEvent(Number(event_.ID), event_.NAME, sections.find(city => city.ID === event_.SECTION_ID), dayjs(dayjs(event_.DATE_FROM)), dayjs(dayjs(event_.DATE_TO)));

                            }

                        }
                        >
                            {event_.NAME}
                            {viewMode === 'day' ? <><br/>
                                {event_.DATE_FROM}
                                <br/>
                                {event_.DATE_TO}</> : null}
                        </Sheet>
                    }
                })}
            </div>

        }
        )}

    </>
};