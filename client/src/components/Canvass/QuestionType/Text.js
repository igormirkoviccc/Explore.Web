import React, {useState} from 'react';
import {Paper, FormControl, FormLabel, TextField, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    actionContainer: {
        marginBottom: 30,
        alignItems: 'center',
        display: 'flex',
        padding: 10
    }}));


export default function Text({initialData, index}) {
    const [value, setValue] = useState();
    const styles = useStyles();
    return <>
        <Paper className={styles.actionContainer}>
            <FormControl component="fieldset">
                <FormLabel component="legend">{index + ". " +initialData.text}</FormLabel>
                <TextField
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </FormControl>
        </Paper>
    </>

}

