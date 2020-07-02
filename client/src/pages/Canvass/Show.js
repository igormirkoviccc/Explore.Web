import React, {useState, Fragment} from 'react';
import {Button} from "@material-ui/core"
import '../../App.css';
import AddQuestionIS from "../../components/Questions/AddQuestionIS";
import toast from "../../utils/toast"
import {useLocation} from 'react-router-dom'



export default function CanvasEdit({match}) {
    const [getQuestions, setQuestions] = useState([]);

    const saveQuestion = (question) =>{
        let array = [...getQuestions];
        array[array.length - 1] = question;
        setQuestions(array);
    };

    const addQuestion = () =>{
        let array = [...getQuestions];
        array.push({
            type: 'TEXT',
            possibleAnswers: [{
                text: '',
                checked: 0
            }]
        });
        setQuestions(array);
    };

    const renderQuestions = () =>{
        return getQuestions.map((question, index) =>{
            return <AddQuestionIS
                index={index}
                key={"_" + index}
                onSaveQuestion={saveQuestion}
                initialData={question}/>
        })
    };

    const saveCanvas = () =>{
        const canvas = {
            questions: getQuestions
        };

        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/add_canvas/` +match.params.id,{
            method: 'POST',
            body: JSON.stringify(canvas),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => toast.success("Uspešno dodata pitanja"))

    };

    return (
        <Fragment>
            {renderQuestions()}
            <Button
                onClick={addQuestion}
                variant="contained"
                color="primary"
                style={{display: 'block', marginTop: 50}}>Dodaj pitanje</Button>
            <Button
                onClick={saveCanvas}
                variant="contained"
                color="primary"
                style={{display: 'block', marginTop: 50}}>Sačuvaj anektu</Button>

        </Fragment>
    )
}
