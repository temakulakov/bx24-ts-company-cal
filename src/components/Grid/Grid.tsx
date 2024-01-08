import styles from './Grid.module.scss';
import React from 'react';
import {Box} from "@mui/joy";
import TimeLine from "../TimeLine/TimeLine";
import GridHeader from "../GridHeader/GridHeader";
import GridBody from "../GridBody/GridBody";
import {useRecoilValue} from "recoil";
import {calendarViewAtom} from "../../store/atoms";


export interface IHeight {
    height: string;
}



export default function Grid() {
    const view = useRecoilValue(calendarViewAtom);
    const [hight, setHight] = React.useState<IHeight>({height: "3120px"});


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
            <Box className={styles.body} height={"100%"}>

                <Box className={styles.header} ><GridBody hight={hight}/></Box>
            </Box>
        </Box>

    </Box>
}