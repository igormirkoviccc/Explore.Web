import React, {useEffect, useState, Fragment} from 'react';
import {Grid, TextField, InputLabel, Button, Paper, makeStyles} from "@material-ui/core";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Redirect} from "react-router-dom"

import '../../App.css';
import toast from "../../utils/toast"


import ActionContainer from "../../components/ActionContainerIS";

const animatedComponents = makeAnimated();
const useStyles = makeStyles(theme => ({
    actionContainer: {
        height: 70,
        marginBottom: 30,
        alignItems: 'center',
        display: 'flex',
        padding: 10
    },
    actionButtons: {
        marginLeft: 10
    }
}))

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);


export default function New({initialData, showMode}) {
    const [getUsers, setUsers] = useState();
    const [getBeginDateControl, setBeginDateControl] = useState(new Date());
    const [getEndDateControl, setEndDateControl] = useState(new Date());
    const [getRedirect, setRedirect] = useState();

    const classes = useStyles();

    const [getExploration, setExploration] = useState(
        initialData ?
            {
                ...initialData,
                coordinator: initialData.coordinator._id,
                participants: initialData.participants.map((participant) => participant._id),
                beginDate: new Date(initialData.beginDate),
                endDate: new Date(initialData.endDate)
            }
            :
            {
                beginDate: new Date(),
                endDate: new Date(),
                participants: []
            }
    )

    const makeOptionsForUsers = getUsers ? getUsers.map((user) => {
                return {
                    value: user._id,
                    label: user.name
                }
            }) : []


    const onCoordinatorChange = (value) => {
        const coordinator = getUsers.find((user) => {
            return user._id == value.value
        });
        setExploration({...getExploration, coordinator: coordinator._id})
    }

    const onParticipantsChange = (values) => {
        const participants = values ? values.map(({value}) => value) : [];
        setExploration({...getExploration, participants});
    }

    const fetchUsers = () => {
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/users`)
            .then((res) => res.json())
            .then(res => setUsers(res))
    }

    const postExploration = () => {
        const exploration = {
            exploration: getExploration
        }
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/addexploration`, {
            method: 'POST',
            body: JSON.stringify(exploration),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if(res && res.message){
                    toast.error("Datumi nisu odgovarajući");
                }else{
                    toast.success("Uspešno sačuvano.");
                    setRedirect('/istrazivanja')
                }
            })}

    const updateExploration = () =>{
        const exploration = {
            exploration: getExploration
        }
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/editexploration`, {
            method: 'POST',
            body: JSON.stringify(exploration),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => toast.success("Uspešno sačuvano."))
            .then(() => setRedirect('/istrazivanja'))
    }

    useEffect(() => {
        fetchUsers();
    }, [])


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }


    return (
        <Fragment>
                <Paper className={classes.actionContainer}>
                <Button className={classes.actionButtons}
                    variant="contained"
                    color="secondary"
                    onClick={() => setRedirect('/istrazivanja')}
                >Nazad
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    onClick={initialData ? updateExploration : postExploration}
                >Sačuvaj</Button>
                </Paper>
            <Grid container spacing={3}>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <TextField
                        label={"Naziv"}
                        onChange={(e) => setExploration({...getExploration, name: e.target.value})}
                        value={getExploration.name}
                    />
                </Grid>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <InputLabel>Kordinator</InputLabel>
                    <Select
                        formatGroupLabel={formatGroupLabel}
                        components={animatedComponents}
                        options={makeOptionsForUsers}
                        onChange={onCoordinatorChange}
                        value={makeOptionsForUsers.find(user => getExploration.coordinator == user.value)}
                    />
                </Grid>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <InputLabel>Učesnici</InputLabel>
                    <Select
                        formatGroupLabel={formatGroupLabel}
                        components={animatedComponents}
                        options={makeOptionsForUsers}
                        onChange={onParticipantsChange}
                        value={getExploration.participants.map(participant =>
                            makeOptionsForUsers.find(option => option.value === participant))}
                        isMulti
                    />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xl={12} md={12} sm={12} lg={12}>
                        <KeyboardDatePicker
                            disabled={!!showMode}
                            fullWidth
                            label="Begin date"
                            allowKeyboardControl={true}
                            format="dd/MM/yyyy"
                            value={getExploration.beginDate}
                            onChange={input => {
                                setExploration({...getExploration, beginDate: input.toISOString()})
                            }}
                        />
                    </Grid>
                    <Grid item xl={12} md={12} sm={12} lg={12}>
                        <KeyboardDatePicker
                            disabled={!!showMode}
                            fullWidth
                            label="End date"
                            allowKeyboardControl={true}
                            format="dd/MM/yyyy"
                            value={getExploration.endDate}
                            onChange={input => {
                                setExploration({...getExploration, endDate: input.toISOString()})
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Button
                    style={{marginLeft: 10, marginTop: 10}}
                    variant="contained"
                    color="primary"
                >
                    Kreiraj anketu
                </Button>
            </Grid>
        </Fragment>

    )
}

