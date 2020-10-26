import React, { useState } from 'react';
import {Container} from './../components';
import _ from 'lodash';
import { Typography, Button, Divider, FormControl, TextField, Select, MenuItem, IconButton, InputLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {timingsMapping, daytimes} from './../constants';

function createData(address, city, chargestation, enable, timing) {
    return {address, city, chargestation, enable, timing};
}

const CustomDialogTitle = (props) => {
    const {data, edit, handleBack} = props;
    if(edit){
        return (
            <DialogTitle disableTypography  style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "16px 0"}}>
                <IconButton onClick={handleBack}>
                    <ArrowLeftIcon />
                </IconButton>
                <Typography variant="h6">
                    Edit {data.address} Timings
                </Typography>
            </DialogTitle>
        )
    }else{
        return (
            <DialogTitle>
                {data.address} Timings
            </DialogTitle>
        )
    }
}

const CustomDialogContent = (props) => {
    const {edit, data, addTiming, removeTiming} = props;
    const [timings, setTimings] = useState(data.timing);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDay, setSelectedDay] = useState("0")

    if(edit){

        return (
            <DialogContent dividers>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Button onClick={() => setSelectedDay("0")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "0" ? "secondary" : "default"}> Su </Button>
                    <Button onClick={() => setSelectedDay("1")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "1" ? "secondary" : "default"}> Mo </Button>
                    <Button onClick={() => setSelectedDay("2")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "2" ? "secondary" : "default"}> Tu </Button>
                    <Button onClick={() => setSelectedDay("3")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "3" ? "secondary" : "default"}> We </Button>
                    <Button onClick={() => setSelectedDay("4")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "4" ? "secondary" : "default"}> Th </Button>
                    <Button onClick={() => setSelectedDay("5")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "5" ? "secondary" : "default"}> Fr </Button>
                    <Button onClick={() => setSelectedDay("6")} style={{flex: 1, borderRadius: "50%", padding: 16, margin: 8}} variant="contained" color={selectedDay === "6" ? "secondary" : "default"}> Sa </Button>
                </div>
                <div>
                    {data.timing[selectedDay].map((eachTime, index) => {
                        return(
                            <div key={eachTime.open} style={{display: "flex", flexDirection: "row", padding: "16px 0", alignItems: "center"}}>
                                <FormControl style={{flex: 2}} disabled>
                                <InputLabel>Start Time</InputLabel>
                                    <Select
                                        value={eachTime.open}
                                        onChange={(e) => {
                                            setStartTime(e.target.value);
                                            setEndTime("");
                                        }}
                                    >
                                        {Object.keys(timingsMapping).map(eachTiming => (
                                            <MenuItem value={eachTiming}>{eachTiming}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Typography style={{padding: "16px 16px 0 16px"}}>to</Typography>
                                <FormControl style={{flex: 2}} disabled>
                                    <InputLabel>End Time</InputLabel>
                                    <Select
                                        value={eachTime.close}
                                    >
                                        {Object.keys(timingsMapping).map(eachTiming => (
                                            <MenuItem value={eachTiming}>{eachTiming}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <span style={{flex: 1}}></span>
                                <div style={{display: 'flex', justifyContent: "center"}}>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        removeTiming(index, selectedDay);
                                    }}> 
                                        Remove
                                    </Button>
                                </div>
                            </div>
                    )})}
                </div>
                <div style={{display: "flex", flexDirection: "row", padding: "16px 0", alignItems: "center"}}>
                    <FormControl style={{flex: 2}}>
                        <InputLabel>Start Time</InputLabel>
                        <Select
                            value={startTime}
                            onChange={(e) => {
                                setStartTime(e.target.value);
                                setEndTime("");
                            }}
                        >
                            {Object.keys(timingsMapping).filter(eachTiming => timingsMapping[eachTiming] < Math.min(...timings[selectedDay].map(eachDayTime => timingsMapping[eachDayTime.open]))).map(eachTiming => (
                                <MenuItem value={eachTiming}>{eachTiming}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography style={{padding: "16px 16px 0 16px"}}>to</Typography>
                    <FormControl style={{flex: 2}} disabled={startTime == ""}>
                        <InputLabel>End Time</InputLabel>
                        <Select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        >
                            {Object.keys(timingsMapping).filter(eachTiming => timingsMapping[startTime] < timingsMapping[eachTiming]).map(eachTiming => (
                                <MenuItem value={eachTiming}>{eachTiming}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <span style={{flex: 1}}></span>
                    <div style={{display: 'flex', justifyContent: "center"}}>
                        <Button disabled={ startTime == "" || endTime == ""} variant="contained" color="primary" onClick={() => {
                            addTiming({ "open": startTime,"close": endTime}, selectedDay);
                            setStartTime("");
                            setEndTime("");
                        }}> 
                            Add
                        </Button>
                    </div>
                </div>
            </DialogContent>
        )
    }else{
        return (
            <DialogContent dividers>
                {Object.keys(timings).map((eachKey, index) => (
                    <>
                        <div key={index} style={{display: 'flex', flexDirection: "row", alignItems: "center", padding:8, margin: 8}}>
                            <Typography>{getDay(eachKey)}</Typography>
                            <div style={{display: 'flex', flexDirection: "column", flex: 1, alignItems: 'flex-end'}}>
                                {timings[eachKey].map(eachTiming => (
                                    <Typography>{eachTiming.open} to {eachTiming.close}</Typography>
                                ))}
                            </div>
                        </div>
                        {index == Object.keys(timings).length - 1 ? null : <Divider />}
                    </>
                ))}
            </DialogContent>
        )
    }
}

function getDay(day){
    switch (day){
        case '0':
            return 'Sunday';
        case '1':
            return 'Monday';
        case '2':
            return 'Tuesday';
        case '3':
            return 'Wednesday';
        case '4':
            return 'Thursday';
        case '5':
            return 'Friday';
        case '6':
            return 'Saturday';
    }
}

export default function Home() {

    const [showEntries, setShowEntries] = useState(10);
    const [open, setOpen] = React.useState(false);
    const [dialogData, setDialogData] = useState({});
    const [index, setIndex] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [data, setData] = useState([
        createData('Address 1', "City 1", 6, true, _.cloneDeep(daytimes)),
        createData('Address 2', "City 2", 6, true, _.cloneDeep(daytimes)),
        createData('Address 3', "City 3", 6, true, _.cloneDeep(daytimes)),
        createData('Address 4', "City 4", 6, true, _.cloneDeep(daytimes)),
        createData('Address 5', "City 5", 6, true, _.cloneDeep(daytimes)),
    ]);

    const removeTiming = (i, day) => {
        let d = _.cloneDeep(data);
        d[index].timing[day] =  [...d[index].timing[day].slice(0, i), ...d[index].timing[day].slice(i+1)] ;
        setData(d);
        setDialogData(d[index]);
    }

    const addTiming = (newTime, day) => {
        let d = _.cloneDeep(data);
        d[index].timing[day].push(newTime);
        setData(d);
        setDialogData(d[index]);
    }

    const handleOpen = (data, index) => {
        setDialogData(data);
        setIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setShowEdit(false);
        setOpen(false);
    };

    const handleBack = () => {
        setShowEdit(false);
    };

    return (
        <Container>
            <div style={{display: 'flex', flex: 1, margin: 16, backgroundColor: 'white', flexDirection: "column" }}>
                <div style={{display: 'flex', flexDirection: 'row', padding: "16px 24px"}}>
                    <div style={{flex: 1, alignItems: "center"}}>
                        <Typography variant="h5">Locations</Typography>
                    </div>
                    <Button variant="contained" color="primary">
                        Add
                    </Button>
                </div>
                <Divider />
                <div style={{display: 'flex', flexDirection: 'row', padding: "16px 24px"}}>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                        <Typography>Show</Typography>
                        <FormControl variant="outlined" style={{padding: "0 8px"}}>
                            <Select
                                value={showEntries}
                                onChange={(e) => setShowEntries(e.target.value)}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography>entries</Typography>
                    </div>
                    <span style={{flex: 1}}></span>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                        <Typography>Search:</Typography>
                        <TextField style={{padding: "0 8px"}} label="Standard" variant="outlined" />
                    </div>
                </div>
                <TableContainer component={Paper} style={{flex: 1, maring: 24, padding: 24, width: "auto"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> 
                                    <Typography variant="h6">Address</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">City</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Chargestations</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Enabled?</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">Actions</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow hover key={index} onClick={() => handleOpen(row, index)}>
                                    <TableCell component="th" scope="row">
                                        {row.address}
                                    </TableCell>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>{row.chargestation}</TableCell>
                                    <TableCell>{row.enable}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary">Show Timings</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
                <CustomDialogTitle edit={showEdit} data={dialogData} handleBack={handleBack} />
                <CustomDialogContent edit={showEdit} data={dialogData} addTiming={addTiming} removeTiming={removeTiming} handleBack={handleBack} />
                <DialogActions>
                    {!showEdit ? ( <Button autoFocus onClick={() => setShowEdit(true)} variant="contained" color="primary">
                            Edit Timings
                        </Button>
                    ): null
                    }
                    <Button autoFocus onClick={handleClose} variant="contained" color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}