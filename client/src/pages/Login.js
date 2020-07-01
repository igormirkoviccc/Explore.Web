import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Context }  from '../context/Auth';
import { Redirect } from "react-router-dom";
import toast from '../utils/toast'


function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [getRedirect, setRedirect] = useState();
    const { isAuth, setAuth } = Context();


    const LogInRequest = () =>{
        fetch(`http://${process.env.REACT_APP_SERVER_HOST}:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(res => {
                if(res.token){
                    setRedirect(`/istrazivanja/`);
                    setAuth(res.token, res.id);
                }else{
                    if(res.error){
                        toast.error(res.error);
                    }
                }
            })
    }

    if (getRedirect) {
        return <Redirect push to={getRedirect} />;
    }

    return (
        <div className="is_login">
            <TextField
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
            />
            <TextField
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
            />
            <Button
                onClick={() => LogInRequest()}
                variant="contained"
                color="primary"
            >Log in</Button>
        </div>
    );
}

export default LogIn;
