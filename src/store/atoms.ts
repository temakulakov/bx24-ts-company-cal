import { atom } from 'recoil';
import dayjs from "dayjs";
import {IEventObject, IModal, ISectionObject} from "./types";

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
});

export const sectionsAtom = atom<Array<ISectionObject>>({
    key: 'sectionsAtom',
    default: [],
});

export const eventsAtom = atom<Array<IEventObject>>({
    key: 'eventsAtom',
    default: [],
});

export const modalAtom = atom<IModal>({
    key: 'modalAtom',
    default: {
        action: "null",
        name: "",
        filial: null,
        dateFrom: dayjs(dayjs().subtract(1, 'hour')),
        dateTo: dayjs(dayjs().add(1, 'hour')),
        description: null,
    }
})