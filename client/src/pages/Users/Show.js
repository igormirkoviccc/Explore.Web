import React, {useState, useEffect} from 'react';

import '../../App.css';
import Form from "../../components/Users/Form";



export default function EditExploration({match}) {
    const [getUser, setUser] = useState();
    const fetchUserById = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/user/`+ match.params.id)
            .then(res => res.json())
            .then(res => setUser(res))
    }

    useEffect(() =>{
        fetchUserById();
    },[])

    if(!getUser){
        return null;
    }
    return (
        <Form key={match.params.id + "_"} initialData={getUser}/>
    )
}

