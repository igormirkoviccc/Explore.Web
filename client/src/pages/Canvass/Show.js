import React, {useState, Fragment} from 'react';
import {Button} from "@material-ui/core"
import '../../App.css';
import AddQuestionIS from "../../components/Questions/AddQuestionIS";



export default function CanvasEdit({match}) {
    const [getQuestions, setQuestions] = useState([]);

    const saveQuestion = (question) =>{
        let array = [...getQuestions];
        array[array.length - 1] = question;
        setQuestions(array);
    }
    console.log(getQuestions);

    const addQuestion = () =>{
        let array = [...getQuestions];
        array.push({
            type: 'TEXT',
            possibleAnswers: [{
                text: '',
                stat: {
                    checked: 0
                }
            }]
        });
        setQuestions(array);
    }

    const renderQuestions = () =>{
        return getQuestions.map((question, index) =>{
            return <AddQuestionIS
                index={index}
                key={"_" + index}
                onSaveQuestion={saveQuestion}
                initialData={question}/>
        })
    }

    return (
        <Fragment>
            {renderQuestions()}
            <Button
                onClick={addQuestion}
                variant="contained"
                color="primary"
                style={{display: 'block', marginTop: 50}}>Dodaj pitanje</Button>
        </Fragment>
    )
}

