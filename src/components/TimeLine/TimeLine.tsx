import React from 'react';
import { useRecoilValue } from 'recoil';
import {calendarViewAtom, selectDateTimeFromAtom} from "../../store/atoms";
import styles from './TimeLine.module.scss';
import {Sheet} from "@mui/joy";

interface TimelineProps {
    // Дополнительные пропсы, если необходимо
}

const Timeline: React.FC<TimelineProps> = ({ /* Дополнительные пропсы */ }) => {
    // Получаем текущий тип отображения календаря из атома Recoil
    const calendarView = useRecoilValue(calendarViewAtom);
    const timeFrom = useRecoilValue(selectDateTimeFromAtom);

    const dayArray = Array.from({ length: 24 }, (_, index) => index);
    const weekArray = Array.from({ length: 24 }, (_, index) => index);
    const monthArray = Array.from({ length: timeFrom.daysInMonth() }, (_, index) => index + 1);
    console.log(dayArray);

    // Логика для отображения временной шкалы в зависимости от типа отображения
    const renderTimeline = () => {
        switch (calendarView) {
            case 'day':
                // Логика для отображения временной шкалы дня
                    return <>{dayArray.map((item, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div/>
                            <div className={styles.timelineLabel}><Sheet>{item}:00</Sheet></div>
                            <div className={styles.timelineLine}></div>
                        </div>
                    ))}</>;
            case 'week':
                // Логика для отображения временной шкалы недели
                return <div>Timeline for Week View</div>;
            case 'month':
                // Логика для отображения временной шкалы месяца
                return <>{monthArray .map((item, index) => (
                    <div key={index} className={styles.timelineItem}>
                        <div/>
                        <div className={styles.timelineLabel}><Sheet>{item}</Sheet></div>
                        <div className={styles.timelineLine}></div>
                    </div>
                ))}</>;
            default:
                return null;
        }
    };

    return (
        <div className={styles.verticalTimeline}>
            {renderTimeline()}
        </div>
    );
};

export default Timeline;