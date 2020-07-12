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
import * as fs from 'fs';


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
    const [getRedirect, setRedirect] = useState();
    const [getVideos, setVideos] = useState([]);
    const [getAPIInput, setAPIInput] = useState();
    const [getAuth, setAuth] = useState(localStorage.getItem('role') === 'CLAN');
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
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/users`, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    setUsers(res);
                }
            })
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
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    toast.success("Uspešno sačuvano.");
                    setRedirect('/istrazivanja')
                }
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const renderVideosAdding = () =>{
        return getVideos.map((video, index) =>{
            return <div style={{display: "block"}}>
                <TextField
                label={"Zakači video"}
                value={video}
                onChange={(e) =>{
                    let videos = [...getVideos];
                    videos[index] = e.target.value;
                    setVideos(videos);
                }
                }
            />
            </div>
        })
    }

    const addVideos = () =>{
        let valid = true;

        for(let i = 0; i < getVideos.length; i++){
            if(!getVideos[i] || !getVideos[i].includes('embed')){
                valid = false;
            }
        }

        if(valid){
            const videos = {
                videos: getVideos
            }

            fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/editexploration_videos/` + initialData._id, {
                method: 'POST',
                body: JSON.stringify(videos),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => toast.success("Uspešno sačuvano."))
                .then(() => setRedirect('/istrazivanja'))
        }else{
            toast.error("Nešto nije u redu sa linkom.")
        }
    }

    const renderVideos = () =>{
        if(getExploration && getExploration.videos){
            return getExploration.videos.map((video) =>{
                return <iframe width="420" height="315"
                               src={video}>
                </iframe>
            })
        }
    }

    const saveAPIData = () =>{
        fetch(`${getAPIInput}`, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(res => exportAsJSON(res))
            .catch((err) => toast.error(err))
    }

    const exportAsJSON = (json) =>{
        console.log(json)
        let data = {
            json
        }
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/exploration_file`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }})
                .then((res) => res.json())
                .then((res) => {
                    downloadData(res);
                })
    }

    const downloadData = (data) => {
        let linkDom = document.createElement("a");
        document.body.appendChild(linkDom);
        linkDom.style = "display: none";
        let json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
            linkDom.href = url;
            linkDom.download = 'data.json';
            linkDom.click();
            window.URL.revokeObjectURL(url);
        }



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
                    disabled={getAuth}
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    onClick={initialData ? updateExploration : postExploration}
                >Sačuvaj</Button>
                    <Button
                        disabled={getAuth}
                        className={classes.actionButtons}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if(getExploration.questions && getExploration.questions.length){
                                setRedirect(`/istrazivanja/${getExploration._id}/anketa/show`)
                            }else{
                                setRedirect(`/istrazivanja/${getExploration._id}/anketa/new`)
                            }
                        }}
                    >
                        {getExploration.questions && getExploration.questions.length ? "Uredi anketu" : "Kreiraj anketu"}
                    </Button>
                    <Button
                        disabled={!getAuth}
                        className={classes.actionButtons}
                        variant="contained"
                        color="primary"
                        onClick={() =>{
                            setRedirect(`/istrazivanja/${getExploration._id}/anketa/session`)
                        }}
                    >
                      Popuni anketu
                    </Button>
                </Paper>
            <Grid container spacing={3}>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <TextField
                        disabled={getAuth}
                        label={"Naziv"}
                        onChange={(e) => setExploration({...getExploration, name: e.target.value})}
                        value={getExploration.name}
                    />
                </Grid>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <InputLabel>Kordinator</InputLabel>
                    <Select
                        isDisabled={getAuth}
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
                        isDisabled={getAuth}
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
                            disabled={getAuth}
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
                            disabled={getAuth}
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
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>
                            {renderVideos()}
                        </div>
                        {renderVideosAdding()}
                        <Button
                            style={{marginTop: 20}}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                let videos = [...getVideos];
                                videos.push('');
                                setVideos(videos);
                            }}
                        >Dodaj video</Button>
                        <Button
                            style={{marginTop: 20}}
                            variant="contained"
                            color="primary"
                            onClick={addVideos}
                        >Sačuvaj video zapise</Button>
                    </div>
                </MuiPickersUtilsProvider>
            </Grid>
            <div style={{marginBottom: 100}}>
                <TextField
                    label={"API"}
                    value={getAPIInput}
                    onChange={(e) =>{
                        setAPIInput(e.target.value)
                    }}
                />
                <Button
                    style={{marginTop: 50, marginLeft: 50}}
                    onClick={saveAPIData}
                    variant="contained"
                    color="primary"
                >Sačuvaj podatke</Button>
            </div>
        </Fragment>

    )
}

