import React, {useEffect, useState} from 'react';
import '../../App.css';
import Session from "../../components/Canvass/Session";



export default function CanvasNew({match}) {
    const [getExploration, setExploration] = useState();

    const fetchExplorationById = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/exploration/`+ match.params.id)
            .then(res => res.json())
            .then(res => setExploration(res))
    }

    useEffect(() =>{
        fetchExplorationById();
    },[])

    if(!getExploration){
        return null;
    }

    return (
        <Session initialData={getExploration.questions}/>
    )
}

