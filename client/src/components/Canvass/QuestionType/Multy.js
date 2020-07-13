import React, {useState} from 'react';
import {Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles, Checkbox} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    actionContainer: {
        marginBottom: 30,
        alignItems: 'center',
        display: 'flex',
        padding: 10
    }}));


export default function Multy({initialData, index, getAnswers, setAnswers}) {
    const [value, setValue] = useState([]);
    const styles = useStyles();


    const renderPossibleAnswers = () =>{
        return initialData.possibleAnswers.map((answer) =>{
            return <FormControlLabel
                control={
                    <Checkbox
                        onChange={(e) =>{
                            let array = [...value];
                            if(value.indexOf(e.target.value) > -1){
                                value.splice(array.indexOf(e.target.value))
                            }else{
                                value.push(e.target.value);
                            }
                            let answerArray = [...getAnswers];
                            const foundObj = answerArray.find((answer) => answer.question_id == initialData._id);
                            if(foundObj) {
                                answerArray.splice(answerArray.indexOf(foundObj), 1);
                            }
                            answerArray.push({
                                question_id: initialData._id,
                                answer_id: value
                            })
                            setAnswers(answerArray);
                        }
                        }
                        checked={value.find((answerObj => answerObj == answer._id))}
                        value={answer._id}
                    />
                }
                label={answer.text}
            />
        })
    }

    return <>
        <Paper className={styles.actionContainer}>
            <FormControl component="fieldset">
                <FormLabel component="legend">{index + ". " +initialData.text}</FormLabel>
                <RadioGroup value={value} onChange={(e) => {

                    setValue(e.target.value)
                }}>
                    {renderPossibleAnswers()}
                </RadioGroup>
            </FormControl>
        </Paper>
    </>

}

