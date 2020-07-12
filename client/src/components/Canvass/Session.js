import React, {useState, Fragment} from 'react';
import '../../App.css';
import Single from "./QuestionType/Single";
import Text from "./QuestionType/Text";
import Multy from "./QuestionType/Multy";
import {Button} from '@material-ui/core'

export default function Session({initialData, id}) {
    const [getAnswers, setAnswers] = useState([]);
    console.log(getAnswers);
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
            >
                Potvrdi
            </Button>
        </>
    )
}

