import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/joy/Autocomplete";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalAtom, sectionsAtom } from "../../store/atoms";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {Box, Button, FormControl, FormLabel, IconButton, Menu, MenuItem, Textarea} from "@mui/joy";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker, DateTimePicker, DesktopTimePicker} from "@mui/x-date-pickers";

import styles from "./Modal.module.scss";
import {Check, FormatBold, FormatItalic} from "@mui/icons-material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
dayjs.locale('ru');

export default function ModalC() {
    const [modal, setModal] = useRecoilState(modalAtom);
    const sections = useRecoilValue(sectionsAtom);

    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        console.log(modal);
    }, [modal]);


    const deleteEvent = () => {}
    const updateEvent = () => {}

    const addEvent = () => {}


    return (
        <>
            <Modal
                open={modal.action === "new" || modal.action === "open"}
                onClose={() => setModal({ ...modal, action: "null" })}
            >
                <ModalDialog>
                    <ModalClose />
                    <DialogTitle>
                        <TextField
                            id="standard-multiline-flexible"
                            label={modal.action === "open" ? "Название события" : "Новое событие"}
                            multiline
                            value={modal.name}
                            onChange={(e) => setModal({ ...modal, name: e.target.value })}
                            maxRows={4}
                            variant="standard"
                            fullWidth={true}
                            style={{ marginBottom: "20px" }}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <Autocomplete
                            placeholder="Outlined variant (default)"
                            options={sections}
                            value={sections[(typeof modal.filial === "number") ? modal.filial : 0]}
                            onChange={(event, newValue) => setModal({...modal, filial: newValue})}
                            getOptionLabel={(option) => option.NAME}
                            sx={{width: 300}}
                            startDecorator={
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "red",
                                    }}
                                />
                            }
                            renderOption={(props, option) => (
                                <AutocompleteOption {...props}>
                                    <ListItemDecorator>
                                        <div
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                backgroundColor: option.COLOR,
                                            }}
                                        />
                                    </ListItemDecorator>
                                    <ListItemContent sx={{fontSize: "sm"}}>
                                        {option.NAME}
                                    </ListItemContent>
                                </AutocompleteOption>
                            )}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DateTimePicker
                                    ampm={false}
                                    value={dayjs(modal.dateFrom)}
                                    onChange={(value, context) => setModal({...modal, dateFrom: value})}
                                />
                                —
                                <DateTimePicker
                                    ampm={false}
                                    value={dayjs(modal.dateTo)}
                                    onChange={(value, context) => setModal({...modal, dateFrom: value})}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <FormControl>
                            <FormLabel>Your comment</FormLabel>
                            <Textarea
                                placeholder="Type something here…"
                                minRows={3}
                                endDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 'var(--Textarea-paddingBlock)',
                                            pt: 'var(--Textarea-paddingBlock)',
                                            borderTop: '1px solid',
                                            borderColor: 'divider',
                                            flex: 'auto',
                                        }}
                                    >
                                        <IconButton
                                            variant="plain"
                                            color="neutral"
                                            onClick={(event) => setAnchorEl(event.currentTarget)}
                                        >
                                            <FormatBold/>
                                            <KeyboardArrowDown/>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={() => setAnchorEl(null)}
                                            size="sm"
                                            placement="bottom-start"
                                            sx={{'--ListItemDecorator-size': '24px'}}
                                        >
                                            {['200', 'normal', 'bold'].map((weight) => (
                                                <MenuItem
                                                    key={weight}
                                                    selected={fontWeight === weight}
                                                    onClick={() => {
                                                        setFontWeight(weight);
                                                        setAnchorEl(null);
                                                    }}
                                                    sx={{fontWeight: weight}}
                                                >
                                                    <ListItemDecorator>
                                                        {fontWeight === weight && <Check/>}
                                                    </ListItemDecorator>
                                                    {weight === '200' ? 'lighter' : weight}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                        <IconButton
                                            variant={italic ? 'soft' : 'plain'}
                                            color={italic ? 'primary' : 'neutral'}
                                            aria-pressed={italic}
                                            onClick={() => setItalic((bool) => !bool)}
                                        >
                                            <FormatItalic/>
                                        </IconButton>
                                    </Box>
                                }
                                sx={{
                                    minWidth: 300,
                                    fontWeight,
                                    fontStyle: italic ? 'italic' : 'initial',
                                }}
                            />
                        </FormControl>
                        <div className={styles.buttonsGroup}>
                            <Button variant="outlined" onClick={() => setModal({ ...modal, action: "null" })}>Отменить</Button>

                            {modal.action === "open" ? <Button  onClick={updateEvent} >
                                Сохранить
                            </Button> : <Button  onClick={addEvent} >
                                Создать
                            </Button>}

                            {modal.action === "open"  ? <Button  onClick={deleteEvent}
                                             style={{width: "115px"}}>
                                Удалить
                            </Button> : <div style={{width: "115px"}}/>}
                        </div>
                    </DialogContent>
                </ModalDialog>
            </Modal>
            <Modal
                open={modal.action === "report"}
                onClose={() => setModal({
                    action: "null",
                    name: "",
                    filial: null,
                    dateFrom: dayjs(dayjs().subtract(1, "hour")),
                    dateTo: dayjs(dayjs().add(1, "hour")),
                    description: null,
                })}
            >
                <ModalDialog>
                    <ModalClose/>
                    <DialogTitle>Modal Dialog</DialogTitle>
                    <DialogContent>This is a modal dialog.</DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
}