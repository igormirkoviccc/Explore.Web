import React, {useState} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';
import {Button} from "@material-ui/core"

export default function ActionContainer() {
    const [getRedirect, setRedirect] = useState();


    if(getRedirect){
        return <Redirect push to={getRedirect}/>
    }

    return (
        <div className="action_container_is">
            <Button
                variant="contained"
                color="secondary"
            >Back
            </Button>
            <Button
                variant="contained"
                color="secondary"
            >Save</Button>
        </div>

    )
}

