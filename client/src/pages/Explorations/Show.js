import React, {useState, useEffect} from 'react';

import '../../App.css';
import Form from "../../components/Explorations/Form";



export default function EditExploration({match}) {
    const [getExploration, setExploration] = useState();

    const fetchExplorationById = () =>{
        fetch('http://161.35.19.105:8000/exploration/'+ match.params.id)
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
        <Form initialData={getExploration}/>
    )
}

