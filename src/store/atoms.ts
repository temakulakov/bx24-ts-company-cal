import { atom } from 'recoil';
import dayjs from "dayjs";

export const calendarViewAtom = atom<'day' | 'week' | 'month' >({
    key: 'calendarViewAtom',
    default: 'day'
});

export const selectDateTimeFromAtom = atom({
    key: 'selectDateTimeFromAtom',
    default: dayjs(dayjs()),

});

export const selectDateTimeToAtom = atom({
    key: 'selectDateTimeToAtom',
    default: dayjs(dayjs()),
})