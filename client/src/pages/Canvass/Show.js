import React, {useState,useEffect} from 'react';
import '../../App.css';

import Form from "../../components/Canvass/Form";



export default function CanvasShow({match}) {

    const [getQuestions, setQuestions] = useState();

    const fetchExplorationById = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/exploration/`+ match.params.id)
            .then(res => res.json())
            .then(res => {
                if(res.questions){
                    setQuestions(res.questions)
                }
            })
    }

    useEffect(() =>{
        fetchExplorationById();
    },[])

    if(!getQuestions){
        return null;
    }
    return (
        <Form id={match.params.id} initialData={getQuestions}/>
    )
}

