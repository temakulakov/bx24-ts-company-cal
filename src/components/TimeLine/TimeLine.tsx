import React from 'react';
import { useRecoilValue } from 'recoil';
import {calendarViewAtom, selectDateTimeFromAtom} from "../../store/atoms";
import styles from './TimeLine.module.scss';
import {Sheet} from "@mui/joy";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {weekDays, weekShortsDays} from "../../store/consts";

dayjs.extend(customParseFormat);

interface TimelineProps {
    // Дополнительные пропсы, если необходимо
}

const Timeline: React.FC<TimelineProps> = ({ /* Дополнительные пропсы */ }) => {
    const getNearestMonday = (yourDate: string) => {
        // Преобразование строки в объект dayjs
        const dateObject = dayjs(yourDate, { format: 'YYYY-MM-DD' });

        // Получение текущего дня недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
        const currentDayOfWeek = dateObject.day();

        // Вычисление разницы между текущим днем и понедельником (1 - разница между понедельником и воскресеньем)
        const differenceToMonday = (currentDayOfWeek + 6) % 7 + 1;

        // Получение ближайшего понедельника
        const nearestMonday = dateObject.subtract(differenceToMonday, 'day');

        return nearestMonday.format('DD.MM.YYYY HH:mm:ss');
    };

    // Получаем текущий тип отображения календаря из атома Recoil
    const calendarView = useRecoilValue(calendarViewAtom);
    const timeFrom = useRecoilValue(selectDateTimeFromAtom);

    const dayArray = Array.from({ length: 24 }, (_, index) => index);
    const weekArray = Array.from({ length: 24 }, (_, index) => index);
    const monthArray = Array.from({ length: timeFrom.daysInMonth() }, (_, index) => index + 1);

    // Логика для отображения временной шкалы в зависимости от типа отображения
    const renderTimeline = () => {
        switch (calendarView) {
            case 'day':
                // Логика для отображения временной шкалы дня
                    return <>{dayArray.map((item, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div/>
                            <div className={styles.timelineLabel}><Sheet style={{fontSize: 12}}>{item}:00</Sheet></div>
                            <div className={styles.timelineLine}></div>
                        </div>
                    ))}</>;
            case 'week':
                // Логика для отображения временной шкалы недели
                return <>{weekShortsDays.map((item, index) => (
                    <div key={index} className={styles.timelineItem} style={{width: "165px"}}>
                        <div/>
                        <div className={styles.timelineLabel}><Sheet style={{fontSize: 12}}><>{item.label}</></Sheet></div>
                        <div className={styles.timelineLine}></div>
                    </div>
                ))}</>;
            case 'month':
                // Логика для отображения временной шкалы месяца
                return <>{monthArray .map((item, index) => (
                    <div key={index} className={styles.timelineItem}>
                        <div/>
                        <div className={styles.timelineLabel}><Sheet style={{fontSize: 12}}>{item}</Sheet></div>
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