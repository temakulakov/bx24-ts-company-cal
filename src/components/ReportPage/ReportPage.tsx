import React from 'react';
import styles from './ReportPage.module.scss';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Chip from '@mui/joy/Chip';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import {Box, Button, Select} from "@mui/joy";
import Option from '@mui/joy/Option';
import {useRecoilValue} from "recoil";
import {sectionsAtom} from "../../store/atoms";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';


export default function ReportPage() {
    const [step, setStep] = React.useState<number>(0);
    const [selectedSections, setSelectedSections] = React.useState<Array<string> | null>(null);
    // const sections = useRecoilValue(sectionsAtom);
    const sections = [
        {NAME:"Основные события", COLOR: "#1a642b"},
        {NAME:"Главное здание Театрального музея им. А.А. Бахрушина", COLOR: "#4b293b"},
        {NAME:"Музей-квартира М.М. Плисецкой", COLOR: "#ff00ea"},
        {NAME:"Дом-музей М.Н. Ермоловой/Театральный салон на Тверском бульваре", COLOR: "#5c0de5"},
        {NAME:"Дом-музей М.С. Щепкина", COLOR: "#d3b417"},
        {NAME:"Театральный музей в Зарайске", COLOR: "#f86d23"},
        {NAME:"Мемориальный музей «Творческая мастерская театрального художника Д.Л. Боровского»", COLOR: "#000000"},
        {NAME:"Музей-квартира Г.С. Улановой", COLOR: "#20e0c3"},
        {NAME:"Музей-квартира актёрской семьи М.В., А.А. Мироновых — А.С. Менакера", COLOR: "#9bcc67"},
        {NAME:"Дом-музей А.Н. Островского/Театральная галерея на Малой Ордынке", COLOR: "#ff0000"},
        {NAME:"Музей-квартира Вс.Э. Мейерхольда", COLOR: "#cc677a"},
        {NAME:"Музей-квартира В.Н. Плучека", COLOR: "#677fcc"},
        {NAME:"Музей-студия Радиотеатра", COLOR: "#a4cc67"},
        {NAME:"Праздники", COLOR: "#677fcc"}
    ];

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: Array<string> | null,
    ) => {
        console.log(`You have choosen "${newValue}"`);
    };


    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

    const xLabels = [
        'Основные события',
        'Главное здание',
        'М/Кв М.М. Плисецкой',
        'Д/М М.Н. Ермоловой',
        'Д/М А.Н. Островского',
        'М/Кв Вс.Э. Мейерхольда',
        'M/Кв В.Н. Плучека',
    ];


    const chartSetting = {
        yAxis: [
            {
                label: 'Количество часов',
            },
        ],
        width: 1500,
        height: 700,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };
    const dataset = [
        {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: 'Янв',
        },
        {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: 'Фев',
        },
        {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: 'Март',
        },
        {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: 'Апр',
        },
        {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: 'Май',
        },
        {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: 'Июн',
        },
        {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: 'Июл',
        },
        {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: 'Авг',
        },
        {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: 'Сент',
        },
        {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: 'Окт',
        },
        {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: 'Ноя',
        },
        {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: 'Дек',
        },
    ];

    const valueFormatter = (value: number) => `${value}часов`;

    return <div className={styles.root}>
        <div className={styles.leftSide}>
            <Stepper orientation="vertical">
                <Step
                    indicator={
                        <StepIndicator variant="solid" color="primary">
                            1
                        </StepIndicator>
                    }
                    active={true}
                    completed={step > 0}
                >
                    <Typography>Выберите филиалы</Typography>

                    <Stack spacing={1}>
                        <Typography level="body-sm">
                            {
                                selectedSections?.map((section, index) => {
                                    return <div></div>
                                })
                            }
                        </Typography>
                        <ButtonGroup variant="plain" spacing={1}>
                            <Chip
                                color="primary"
                                variant="solid"
                                onClick={() => {
                                    // do something...
                                }}
                            >
                                Далее
                            </Chip>
                            <Chip
                                color="neutral"
                                variant="outlined"
                                onClick={() => {
                                    // do something...
                                }}
                            >
                                Вернуться
                            </Chip>
                        </ButtonGroup>
                    </Stack>
                </Step>
                <Step
                    indicator={<StepIndicator>2</StepIndicator>}
                    active={step > 0}
                    completed={step > 1}
                >
                    <div>
                        <Typography level="title-sm">Выберите период</Typography>
                        <Typography level="body-xs">Ожидание</Typography>
                    </div>
                </Step>
                <Step
                    indicator={<StepIndicator>3</StepIndicator>}
                    active={step > 1}
                    completed={step > 2}
                >
                    <div>
                        <Typography style={{width: '170px'}} level="title-sm">Выберите отображение</Typography>
                        <Typography level="body-xs">Ожидание</Typography>
                    </div>
                </Step>
            </Stepper>
        </div>
        <div className={styles.rightSide}>
            {/*<Select*/}
            {/*    multiple*/}
            {/*    renderValue={(selected) => (*/}
            {/*        <Box sx={{ display: 'flex', gap: '0.25rem', flexWrap:'nowrap' }}>*/}
            {/*            {selected.map((selectedOption, index) => (*/}
            {/*                <Chip variant="soft" color="primary" key={index}>*/}
            {/*                    {selectedOption.label}*/}
            {/*                </Chip>*/}
            {/*            ))}*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*    sx={{*/}
            {/*        width: '15rem',*/}
            {/*        marginBottom: '0.5rem',*/}
            {/*    }}*/}
            {/*    slotProps={{*/}
            {/*        listbox: {*/}
            {/*            sx: {*/}
            {/*                width: '100%',*/}
            {/*            },*/}
            {/*        },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {sections.map((section, index) => {*/}
            {/*        return <Option key={index} value={section.NAME}><div style={{width: "10px", height: "10px", borderRadius: "50%", backgroundColor: section.COLOR}}/>{section.NAME}</Option>;*/}
            {/*    })}*/}

            {/*</Select>*/}

            <BarChart
                width={1300}
                height={500}
                series={[
                    {
                        data: pData,
                        label: 'Количество часов',
                        id: 'pvId',

                        yAxisKey: 'leftAxisId',
                    },

                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                rightAxis="rightAxisId"
            />

            <BarChart

                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[
                    { dataKey: 'london', label: 'Основные события', valueFormatter },
                    { dataKey: 'paris', label: 'Главное здание', valueFormatter },
                    { dataKey: 'newYork', label: 'М/Кв М.М. Плисецкой', valueFormatter },
                    { dataKey: 'seoul', label: 'Д/М М.Н. Ермоловой', valueFormatter },
                ]}
                {...chartSetting}
            />

            <div className={styles.buttonPanel}>
                {step > 0 ? <Button variant="outlined" style={{marginRight: "8px"}} onClick={() => setStep(0)}>Начать</Button> : null}
                <Button  onClick={() => setStep(0)}>Далее</Button>
            </div>
        </div>
    </div>
};