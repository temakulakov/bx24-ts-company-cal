import React from 'react';
import { useRecoilValue } from 'recoil';
import {calendarViewAtom} from "../../store/atoms";
import styles from './TimeLine.module.scss';

interface TimelineProps {
    // Дополнительные пропсы, если необходимо
}

const Timeline: React.FC<TimelineProps> = ({ /* Дополнительные пропсы */ }) => {
    // Получаем текущий тип отображения календаря из атома Recoil
    const calendarView = useRecoilValue(calendarViewAtom);

    // Логика для отображения временной шкалы в зависимости от типа отображения
    const renderTimeline = () => {
        switch (calendarView) {
            case 'day':
                // Логика для отображения временной шкалы дня
                return <div>Timeline for Day View</div>;
            case 'week':
                // Логика для отображения временной шкалы недели
                return <div>Timeline for Week View</div>;
            case 'month':
                // Логика для отображения временной шкалы месяца
                return <div>Timeline for Month View</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Timeline Component</h2>
            {renderTimeline()}
        </div>
    );
};

export default Timeline;