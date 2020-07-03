import React, {useState,Fragment} from 'react';
import {InputLabel, TextField, Button, Paper} from "@material-ui/core"
import Select from 'react-select';
import '../../App.css';


const QuestionType = [
    'TEXT',
    'SINGLE',
    'MULTY'
];

export default function AddQuestionIS(props) {
    const [getQuestion, setQuestion] = useState(props.initialData);

    const renderTypeOptions = QuestionType.map((type) =>{
        return {
            label: type,
            value: type
        }
    });

    const renderSolution = () =>{
        if(!getQuestion.type || getQuestion.type === 'TEXT'){
            return null
        }else{
            return renderAnswers();
        }
    };

    const renderAnswers = () =>{
        return(
        <Fragment>
            {getQuestion.possibleAnswers.map((answer, index) =>{
                return (
                    <div style={{display: 'block', marginTop: 20}}>
                    <span>{`${index + 1}.`}</span>
                    <TextField
                        index={index}
                        style={{marginLeft: 20}}
                        value={getQuestion.possibleAnswers[index].text}
                        onChange={(e) =>{
                            let obj = {...getQuestion};
                            obj.possibleAnswers[index].text = e.target.value;
                            setQuestion(obj);
                            props.onSaveQuestion(obj);
                        }}

                    />
                </div>)
            })}
            <Button
                variant="contained"
                color="secondary"
                style={{display: 'block', marginTop: 20}}
                onClick={() => {
                let obj = {...getQuestion};
                obj.possibleAnswers.push({
                    text: '', checked: 0
                });
                setQuestion(obj);
            }}>
                Dodaj odgovor
            </Button>
        </Fragment>
        )
    };

    return (
        <Paper style={{padding: 20, marginTop: 10}}>
            <div style={{position: 'relative', color: '#3F51B5'}}>{props.index + 1}.</div>
        <Fragment>
            <div style={{position: 'absolute', top: '10px', left: '10px'}}>{props.index + 1}.</div>
            <TextField
                style={{marginBottom: 20}}
                label={"Tekst pitanja"}
                onChange={(e) => setQuestion({...getQuestion, text: e.target.value})}
            />
            <InputLabel>Tip pitanja</InputLabel>
                <Select
                    options={renderTypeOptions}
                    value={renderTypeOptions.find((type) => getQuestion.type == type.value)}
                    onChange={(input) => {
                        setQuestion({...getQuestion, type: input.value})
                    }}
                    style={{marginBottom: 20}}
                />
            {renderSolution()}
        </Fragment>
        </Paper>

    )
}

