import styles from './Grid.module.scss';
import React from 'react';
import {Box} from "@mui/joy";
import TimeLine from "../TimeLine/TimeLine";
import GridHeader from "../GridHeader/GridHeader";
import GridBody from "../GridBody/GridBody";
import {useRecoilValue} from "recoil";
import {calendarViewAtom} from "../../store/atoms";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';



export interface IHeight {
    height: string;
}



export default function Grid() {
    const view = useRecoilValue(calendarViewAtom);
    const [hight, setHight] = React.useState<IHeight>({height: "3120px"});

    const [scroll, setScroll] = React.useState<number>(0);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timer | null>(null);

    const headerWrapperElement = React.useRef(null);

    const handleMouseEnter = () => {
        let el = scroll;
        const id = setInterval(() => {
            // Ваш код, который выполняется каждый интервал
            setScroll(el);
            el -= 20;
        }, 10); // Здесь 1000 миллисекунд (1 секунда) - просто пример, замените на ваш интервал
        setIntervalId(id);
    };

    const handleMouseLeave = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleMouseEnter1 = () => {
        let el = scroll;
        const id = setInterval(() => {
            // Ваш код, который выполняется каждый интервал
            setScroll(el);
            el += 20;
        }, 10); // Здесь 1000 миллисекунд (1 секунда) - просто пример, замените на ваш интервал
        setIntervalId(id);
    };

    React.useEffect(() => {
        if (headerWrapperElement.current) {
            // if (headerWrapperElement.current.scrollLeft) {
            //     headerWrapperElement.current.scrollLeft = scroll;
            // }
        }
    }, [scroll])// Добавлен зависимость date, чтобы useEffect срабатывал при изменении даты

    const handleMouseLeave1 = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

    };


    React.useEffect(() => {
        switch (view) {
            case 'day':
                setHight({height: "3120px"});
                break;
            case 'week':
                setHight({height: "910px"});
                break;
            case 'month':
               setHight({height: "4030px"});
                break;
            default:
                break;
        }
    }, [view])

    return <Box className={styles.root}>
        <Box>
            <TimeLine/>
        </Box>
        <Box style={hight}>
                <Box className={styles.headerr}><GridHeader/></Box>
            <Box className={styles.body} height={"100%"} ref={headerWrapperElement}>
                <div className={styles.leftPetal}
                     onMouseLeave={handleMouseLeave}
                     onMouseEnter={handleMouseEnter}>{<ArrowBackRoundedIcon/>}</div>
                <div className={styles.rightPetal}
                     style={view === 'day'? {right: "380px"} : {right: "40px"}}
                     onMouseLeave={handleMouseLeave1}
                     onMouseEnter={handleMouseEnter1}>{<ArrowBackRoundedIcon style={{transform: "rotate(180deg)"}}/>}
                </div>
                <Box className={styles.header} ><GridBody hight={hight}/></Box>
            </Box>
        </Box>

    </Box>
}