import React, {useState,Fragment} from 'react';
import {InputLabel, TextField, Button} from "@material-ui/core"
import Select from 'react-select';
import '../../App.css';


const QuestionType = [
    'TEXT',
    'SINGLE',
    'MULTY'
]

export default function AddQuestionIS() {
    const [getQuestion, setQuestion] = useState({
        type: 'TEXT',
        possibleAnswers: [{
            text: '',
            stat: {
                checked: 0
            }
        }]
    });

    const renderTypeOptions = QuestionType.map((type) =>{
        return {
            label: type,
            value: type
        }
    })

    const renderSolution = () =>{
        if(getQuestion.type){
            if(getQuestion.type == 'TEXT'){
                return (
                <TextField
                    label="Odgovor"
                    onChange={(e) => {
                        let obj = {...getQuestion};
                        obj.possibleAnswers[0].text = e.target.value;
                        setQuestion(obj);
                    }}
                />
                )
            }else{
                return renderAnswers();
            }
        }else{
            return null
        }

    }

    const renderAnswers = () =>{
        return(
        <Fragment>
            {getQuestion.possibleAnswers.map((answer, index) =>{
                return (<div style={{display: 'block'}}>
                    <span>{`${index + 1}.`}</span>
                    <TextField style={{marginLeft: 20}} />
                </div>)
            })}
            <Button
                variant="contained"
                color="secondary"
                style={{display: 'block', marginTop: 20}}
                onClick={() => {
                let obj = {...getQuestion};
                obj.possibleAnswers.push({
                    text: '', stat: {
                        checked: 0
                    }
                })
                setQuestion(obj);
            }}>Dodaj odgovor</Button>
        </Fragment>
        )
    }

    return (
        <Fragment>
            <TextField
                style={{marginBottom: 20}}
                label={"Tekst pitanja"}
                onChange={(e) => setQuestion({...getQuestion, text: e.target.value})}
            />
            <InputLabel>Tip pitanja</InputLabel>
                <Select
                    options={renderTypeOptions}
                    value={renderTypeOptions.find((type) => getQuestion.type == type.value)}
                    onChange={(input) => setQuestion({...getQuestion, type: input.value})}
                    style={{marginBottom: 20}}
                />
            {renderSolution()}

        </Fragment>
    )
}

