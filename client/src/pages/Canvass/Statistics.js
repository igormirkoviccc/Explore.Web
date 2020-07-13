import React, {useState,useEffect} from 'react';
import '../../App.css';
import {Bar} from 'react-chartjs-2';




export default function CanvasShow({match}) {
    const [getQuestions, setQuestions] = useState();

    const fetchExplorationById = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/exploration/`+ match.params.id)
            .then(res => res.json())
            .then(res => setQuestions(res.questions))
    }

    useEffect(() =>{
        fetchExplorationById();
    },[])

    if(!getQuestions){
        return null;
    }

    const renderQuestions = () => {
        return getQuestions.map((question, index) => {
            if(question.type != 'TEXT'){
                return <Bar
                    data={{
                        labels: question.possibleAnswers.map((answer) => answer.text),
                        datasets: [
                            {
                                label: `${index + 1}. ${question.text}`,
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: question.possibleAnswers.map((answer) => answer.checked)
                            }
                        ]
                    }}
                    width={200}
                    height={50}
                    options={{ maintainAspectRatio: false }}
                />
            }
        })
    }




    return (
        <div style={{width: 400, height: 400, margin: '0 auto', padding: 20}}>
            {renderQuestions()}
            </div>
    )

}

