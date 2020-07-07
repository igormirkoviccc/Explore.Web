import React, {useState, useEffect} from 'react';

import '../../App.css';
import Form from "../../components/Users/Form";
import toast from "../../utils/toast";



export default function EditExploration({match}) {
    const [getUser, setUser] = useState();
    const fetchUserById = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/user/`+ match.params.id, {
            headers: {
                'x-access-token': localStorage.getItem('auth_token')
            }
        })
            .then(async (res) => {
                if(res.status != 200){
                    res = await res.json();
                    toast.error(res.message)
                }else{
                    res = await res.json();
                    setUser(res);
                }
            })
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

