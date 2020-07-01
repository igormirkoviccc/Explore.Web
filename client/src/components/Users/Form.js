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



export default function New({initialData, showMode}) {
    const [getRedirect, setRedirect] = useState();
    const [getUser, setUser] = useState(
        initialData ?
            {...initialData}
            :
            {
            }
    )

    const classes = useStyles();
    const postUser = () => {
        const user = {
            user: getUser
        }
        fetch('http://161.35.19.105:8000/adduser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(res => toast.success("Uspešno sačuvano."))
            .then(() => setRedirect('/korisnici'))
    }

    const updateUser = () =>{
        const user = {
            user: getUser
        }

        fetch('http://161.35.19.105:8000/edituser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => toast.success("Uspešno sačuvano."))
            .then(() => setRedirect('/korisnici'))
    }

    const roleOptions = [
        {value: 'ADMIN', label: 'ADMIN'},
        {value: 'MODERATOR', label: 'MODERATOR'},
        {value: 'CLAN', label: 'CLAN'}
    ]


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    return (
        <Fragment>
                <Paper className={classes.actionContainer}>
                <Button className={classes.actionButtons}
                    variant="contained"
                    color="secondary"
                    onClick={() => setRedirect('/korisnici')}
                >Nazad
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    onClick={initialData ? updateUser : postUser}
                >Sačuvaj</Button>
                </Paper>
            <Grid container spacing={3}>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <TextField
                        label={"Ime i prezime"}
                        onChange={(e) => setUser({...getUser, name: e.target.value})}
                        value={getUser.name}
                    />
                </Grid>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <TextField
                        label={"Email"}
                        onChange={(e) => setUser({...getUser, email: e.target.value})}
                        value={getUser.email}
                    />
                </Grid>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <TextField
                        type={"password"}
                        label={"Lozinka"}
                        onChange={(e) => setUser({...getUser, password: e.target.value})}
                        value={getUser.password}
                    />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xl={12} md={12} sm={12} lg={12}>
                        <KeyboardDatePicker
                            disabled={!!showMode}
                            fullWidth
                            label="Datum rođenja"
                            allowKeyboardControl={true}
                            format="dd/MM/yyyy"
                            value={getUser.birthday}
                            onChange={input => {
                                setUser({...getUser, birthday: input.toISOString()})
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xl={12} md={12} sm={12} lg={12}>
                    <InputLabel>Pristup</InputLabel>
                    <Select
                        components={animatedComponents}
                        options={roleOptions}
                        value={roleOptions.find((role) => role.value == getUser.role)}
                        onChange={input =>{
                            setUser({...getUser, role: input.value})
                        }}
                    />
                </Grid>
                </Grid>
        </Fragment>

    )
}

