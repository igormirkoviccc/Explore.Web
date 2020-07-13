import React, {useState, Fragment} from 'react';
import '../../App.css';
import Single from "./QuestionType/Single";
import Text from "./QuestionType/Text";
import Multy from "./QuestionType/Multy";
import {Button} from '@material-ui/core'
import toast from "../../utils/toast";
import {Redirect} from 'react-router-dom';

export default function Session({initialData, id}) {
    const [getAnswers, setAnswers] = useState([]);
    const [getRedirect, setRedirect] = useState();


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    const sendData = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/question_answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('auth_token')
            },
            body: JSON.stringify(getAnswers)
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    toast.success(res.message)
                    setRedirect(`/istrazivanja`);
                }
            })
    }


    const renderQuestion = () =>{
        if(!initialData || !initialData.length){
            return <div>Test</div>
        }else{
            return initialData.map((question, index) =>{
                switch (question.type) {
                    case 'SINGLE':
                        return <Single
                            getAnswers={getAnswers}
                            setAnswers={setAnswers}
                            key={"_" + index}
                            index={index + 1}
                            initialData={question}/>
                    case 'TEXT':
                        return <Text
                            getAnswers={getAnswers}
                            setAnswers={setAnswers}
                            key={"_" + index}
                            index={index + 1}
                            initialData={question}/>
                    case 'MULTY':
                        return <Multy
                            getAnswers={getAnswers}
                            setAnswers={setAnswers}
                            key={"_" + index}
                            index={index + 1}
                            initialData={question}/>
                }
            })
        }
    }

    return (
        <>
            {renderQuestion()}
            <Button
                variant="contained"
                color="primary"
                onClick={() =>{
                    sendData()
                }}
            >
                Potvrdi
            </Button>
        </>
    )
}

