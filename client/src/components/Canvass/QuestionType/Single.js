import React, {useState} from 'react';
import {Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    actionContainer: {
        marginBottom: 30,
        alignItems: 'center',
        display: 'flex',
        padding: 10
    }}));


export default function Single({initialData, index, getAnswers, setAnswers}) {
    const [value, setValue] = useState();
    const styles = useStyles();
    const renderPossibleAnswers = () =>{
        return initialData.possibleAnswers.map((answer) =>{
            return <FormControlLabel value={answer._id} control={<Radio />} label={answer.text} />
        })
            }

    const onValueChange = (e) =>{
        setValue(e.target.value)
        let answerArray = [...getAnswers];
        const foundObj = answerArray.find((answer) => answer.question_id == initialData._id);
        if(foundObj) {
            answerArray.splice(answerArray.indexOf(foundObj), 1);
        }
        answerArray.push({
            question_id: initialData._id,
            answer_id: e.target.value
        })
        setAnswers(answerArray);

    }

    return <>
        <Paper className={styles.actionContainer}>
            <FormControl component="fieldset">
                <FormLabel component="legend">{index + ". " +initialData.text}</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => {
                    onValueChange(e);
                }}>
                    {renderPossibleAnswers()}
                </RadioGroup>
            </FormControl>
        </Paper>
    </>

}

